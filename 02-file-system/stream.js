const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('./files/new-lorem.txt');

// More efficient way of piping data from a read stream to a write stream
rs.pipe(ws);

// rs.on('data', (dataChunk) => {
//     console.log('--- New dataChunk ---');
//     console.log(dataChunk);
//     ws.write(dataChunk);
// });