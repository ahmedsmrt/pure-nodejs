const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

// custom middleware logger

app.use(logger); // This middleware will log the url of every request made to the server
// Stands for cross origin resource sharing
app.use(cors(corsOptions)); // This middleware will allow requests from all origins

// Built in middleware to handle urlencoded data,
// in other words form data
//  content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// This middleware is essential for handling json data
app.use(express.json());

// Middleware to handle cookies
app.use(cookieParser());

// This middleware serves static files such as images, css, js, etc. from the public directory
app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

// Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load html');
    next();
}, (req, res) => {
    res.send('Hello World');
});



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not found' });
    } else {
        res.type('txt').send('404 Not found');
    }
});


app.use(errorHandler);




app.listen(PORT, () => {
    console.log(`This Server jawn is running on port ${PORT}`);
});