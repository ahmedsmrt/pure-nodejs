const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

// initialize object
const myEmitter = new MyEmitter();

// add listener for log event   
myEmitter.on('log', (message) => logEvents(message));

// emit log event - this is the action 
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted');
}, 2000); 