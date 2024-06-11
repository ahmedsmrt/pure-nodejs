const fsPromises = require('fs').promises;
const path = require('path');

// const writeMsg = "Nice to meet you shawrty";
// const appendMsg = "I am a software engineer";


const fileOperation = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data.toString());
        // Delete the file if it exists
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseText.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseText.txt'), "\n\nNice to meet you fam.");
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseText.txt'), path.join(__dirname, 'files', 'promiseCompleted.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseCompleted.txt'), 'utf8');
        console.log(newData.toString());
    } catch (err) {

        console.log(err);
    }
}

fileOperation();


// This is an asynchronous function
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// });



// This is an asynchronous function
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), writeMsg, (err) => {
//     if (err) throw err;
//     console.log("Output file written successfully!");

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), appendMsg, (err) => {
//         if (err) throw err;
//         console.log("Output file appended successfully!");


//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'touche.txt'), (err) => {
//             if (err) throw err;
//             console.log("Output file renamed successfully!");
//         });

//     });
// });

// Exit on uncaught errors
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});  