const express = require('express');
const router = express.Router();
const path = require('path');


// Middleware
const routeOne = '/';
const altRouteOne = '/index';
const regEx = (route, altRoute) => {
    return `^${route}$|${altRoute}(.html)?`;
};

// Define first route - it's also good to note that express accepts regular expressions which can be used to match routes. This is an amazing way to set up regex helper functions and then use them for different use cases in your routes.
router.get(`${regEx(routeOne, altRouteOne)}`, (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;