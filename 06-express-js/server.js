const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

const routeOne = '/';
const altRouteOne = '/index';
const regEx = (route, altRoute) => {
    return `^${route}$|${altRoute}(.html)?`;
};


// Define first route - it's also good to note that express accepts regular expressions which can be used to match routes. This is an amazing way to set up regex helper functions and then use them for different use cases in your routes.
app.get(`${regEx(routeOne, altRouteOne)}`, (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page(.html)?'); //Returns 302 by default
});

app.get('/*', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`This Server jawn is running on port ${PORT}`);
});