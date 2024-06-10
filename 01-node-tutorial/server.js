// Never forget that node runs on a server not the browser
// Global object instead of the window object   
// console.log(global);

// Has common core modules like fs, http, os, path, etc

const os = require('os');
const path = require('path');
const performance = require('perf_hooks').performance;
const { add } = require('./math');

const start = performance.now();
// OS module
// console.log(os.userInfo());
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);
// console.log("---------------------");

// // Path module
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// This call returns an object with the properties of the path
// console.log(path.parse(__filename));

console.log(add(1, 2));
const end = performance.now();

console.log(`Time taken: ${end - start}ms`);