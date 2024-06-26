const express = require('express');
const router = express.Router();
const path = require('path');



// Define first route - it's also good to note that express accepts regular expressions which can be used to match routes. This is an amazing way to set up regex helper functions and then use them for different use cases in your routes.
router.get(`^/$|/index(.html)?`, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get(`/test(.html)?`, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});


module.exports = router;