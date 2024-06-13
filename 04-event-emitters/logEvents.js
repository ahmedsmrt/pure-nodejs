const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// Common core modules
const fs = require('fs');
const fsPromises = fs.promises; // fsPromises is a built-in module that provides promise-based versions of the fs functions.
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;

    const logItem = `\nDate and time is: ${dateTime}\nID: ${uuid()}\nMessage: ${message}\n`;
    console.log(logItem);

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fs.mkdirSync(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'log.txt'), logItem);
    } catch (error) {
        console.log(error)
    }

}

module.exports = logEvents;