const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })
    // Check for duplicate usernames in the DB
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409);//Conflict HTTP status code
    try {
        // encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store new user
        const newUser = { "username": user, "password": hashedPwd };

        // You're adding a new user and then using the spread operator on the already existing users in the users data model.
        usersDB.setUsers([...usersDB.users, newUser])

        await fsPromises.writeFile(
            path.join(__dirname, "..", 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` })

    } catch (error) {
        res.status(500).json({ 'message': error.message }) //server error
    }
}

module.exports = {
    handleNewUser
}