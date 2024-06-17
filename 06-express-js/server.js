const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
app.use(express.json()); // This middleware is essential

const routeOne = '/';
const altRouteOne = '/index';
const regEx = (route, altRoute) => {
    return `^${route}$|${altRoute}(.html)?`;
};

const one = (req, res, next) => {
    console.log('Attempted to load html for one');
    next();
};

const two = (req, res, next) => {
    console.log('Attempted to load html for two');
    next();
};

const three = (req, res) => {
    console.log('Attempted to load html for three');
    res.send('Hello World');
};

app.get('/chain(.html)?', [one, two, three]); // This is a route chain that will execute the middleware functions in order. The last function in the chain should be the route handler.


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

// adding a post request
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received email:', email);
        console.log('Received password:', password);

        // Example registration logic
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const user = await User.create({ email, password: hashedPassword });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Server Error occurred');
    }
});


// Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load html');
    next();
}, (req, res) => {
    res.send('Hello World');
});



app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(PORT, () => {
    console.log(`This Server jawn is running on port ${PORT}`);
});