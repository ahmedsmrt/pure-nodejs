const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object
const myEmitter = new Emitter();

myEmitter.on('log', (message, fileName) => logEvents(message, fileName));


const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf-8' : ''
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes("404.html") ? 404 : 200,
            { 'Content-Type': contentType }

        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        myEmitter.emit('log', `${error.name}: ${error.message} - Status Code:${response.statusCode}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}


const server = http.createServer((req, res) => {
    console.log(req.url, req.method, res.statusCode);

    myEmitter.emit('log', `${req.url}\t${req.method}\t${res.statusCode}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    let filePath =
        // Every line that starts with contentType is a conditional statement that checks the content type of the request and then sets the filePath variable to the appropriate path.
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // Makes the .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // Serve the file
        serveFile(filePath, contentType, res);
    } else {
        // Serve a 404 page
        // or 301 redirect to a different page
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
                break;
        }
        // The path.parse() method returns an object whose properties represent significant elements of the path.
    }
});

server.listen(PORT, () => {
    console.log(`This Server jawn is running on port ${PORT}`);
});