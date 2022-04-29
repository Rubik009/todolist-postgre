const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRound = 10;

class UserController {
    async register(body) {
        const { username, password, role } = body;
        const hashPassword = await bcrypt.hash(password, saltRound);
        const newPerson = await db.query('INSERT INTO person (username, password, role) values ($1, $2, $3) RETURNING *', [username, hashPassword, role]);
        return newPerson.rows[0];
    }
    async login() {

    }
    async getUsers() {
        const users = await db.query('SELECT * FROM person');
        return users.rows;
    }
    async getOneUser(id) {
        const user = await db.query('SELECT * FROM person where id = $1',[id]);
        return user.rows[0];
    }
    async updateUser(id, body) {
        const updateUser = await db.query('UPDATE person SET username = $1 WHERE id = $2 RETURNING *',[body, id]);
        return updateUser.rows[0];
    }
    async deleteUser(id) {
        const user = await db.query('DELETE FROM person where id = $1',[id]);
        return user.rows[0];
    }
}

module.exports = new UserController();