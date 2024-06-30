const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = process.env.PORT || 3500;

// custom middleware logger

app.use(logger); // This middleware will log the url of every request made to the server
// Stands for cross origin resource sharing
const whitelist = ['http://localhost:3000', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // This middleware will allow requests from all origins

// Built in middleware to handle urlencoded data,
// in other words form data
//  content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// This middleware is essential for handling json data
app.use(express.json());

// This middleware serves static files such as images, css, js, etc. from the public directory
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subDir'));



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