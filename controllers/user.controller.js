const db = require('../config/database');
const modules = require('../modules/modules');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRound = 10;

class UserController {
    async register(body) {
        const { username, password, role } = body;
        const user = await modules.User.findOne({ where: { username } });
        if (user) {
            return `User with username - ${username} already exist`;
        }
        const hashPassword = await bcrypt.hash(password, saltRound);
        const newPerson = await modules.User.create({
            username,
            password: hashPassword,
            role,
        });
        return `User ${newPerson.username} added `;
    }
    async login(body) {
        const { username, password } = body;
        const user = await modules.User.findOne({
            where: { username: username }
        })
        if (!user) {
            return `User with username - ${username} doesn't exist`;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        //console.log(validPassword);
        if (!validPassword) {
            return `password - ${password} is not right`;
        }
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            password: user.password,
            role: user.role,
        }, process.env.ACCESS_TOKEN_SECRET);
        return `Bearer ${token}`;
    }
    async getUsers() {
        const users = await modules.User.findAll();
        return users;
    }
    async getOneUser(id) {
        const user = await modules.User.findOne({
            where: { id: id }
        });
        return user;
    }
    async updateUser(id, body) {
        const updateUser = await modules.User.update({ username: body }, {
            where: { id: id }
        })
        return `code of update ${updateUser} : User with id - ${id} is changed username to ${body}`;
    }
    async deleteUser(id) {
        const user = await modules.User.destroy({
            where: { id: id }
        })
        return `code of delete ${user}`;
    }
}

module.exports = new UserController();