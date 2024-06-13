const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')); // 2021-09-01  15:00:00

console.log(uuid())


/*
  "dependencies": {
    "date-fns": "^3.6.0",
    // When it comes to the carot (^) symbol, it means that the package manager will install the latest minor version of the package.
    "uuid": "^10.0.0"
    // When it comes to the tilde (~) symbol, it means that the package manager will install the latest patch version of the package.
    "uuid": "~10.0.0"
    // When installing a specific version of a package you can use the @symbol followed by the version number.
    // Also running npm update will update the package to the latest patch
  },
*/