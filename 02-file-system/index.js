const fs = require('fs');
const path = require('path');

const writeMsg = "Nice to meet you shawrty";
const appendMsg = "I am a software engineer";


// This is an asynchronous function
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});

console.log("Reading file...");

// This is an asynchronous function
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), writeMsg, (err) => {
    if (err) throw err;
    console.log("Output file written successfully!");

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), appendMsg, (err) => {
        if (err) throw err;
        console.log("Output file appended successfully!");


        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'touche.txt'), (err) => {
            if (err) throw err;
            console.log("Output file renamed successfully!");
        });

    });
});

// Exit on uncaught errors
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});  