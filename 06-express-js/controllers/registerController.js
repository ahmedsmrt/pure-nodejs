const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs/promises');
const path = require('path');




module.exports = {
    usersDB
}