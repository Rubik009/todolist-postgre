const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRound = 10;

class UserController {
    async register(body) {
        const { username, password, role } = body;
        const user = await db.query('SELECT * FROM person where username = $1', [username]);
        if (user) {
            return `User with username - ${username} already exist`;
        }
        const hashPassword = await bcrypt.hash(password, saltRound);
        const newPerson = await db.query('INSERT INTO person (username, password, role) values ($1, $2, $3) RETURNING *', [username, hashPassword, role]);
        return `User added ${newPerson.rows[0]}`;
    }
    async login(body) {
        const { username, password } = body;
        const user = await db.query('SELECT * FROM person where username = $1', [username]);
        if (user.rowCount === 0) {
            return `User with username - ${username} doesn't exist`;
        }
        const validPassword = await bcrypt.compare(password, user.rows.map(item => item.password).join(""));
        //console.log(validPassword);
        if (!validPassword) {
            return `password - ${password} is not right`;
        }
        const token = jwt.sign({
            id : user.rows.map(item => item.id).join(""),
            user : user.rows.map(item => item.username).join("")
        }, process.env.ACCESS_TOKEN_SECRET);
        return `${token}`;
    }
    async getUsers() {
        const users = await db.query('SELECT * FROM person');
        return users.rows;
    }
    async getOneUser(id) {
        const user = await db.query('SELECT * FROM person where id = $1', [id]);
        return user.rows[0];
    }
    async updateUser(id, body) {
        const updateUser = await db.query('UPDATE person SET username = $1 WHERE id = $2 RETURNING *', [body, id]);
        return updateUser.rows[0];
    }
    async deleteUser(id) {
        const user = await db.query('DELETE FROM person where id = $1', [id]);
        return user.rows[0];
    }
}

module.exports = new UserController();