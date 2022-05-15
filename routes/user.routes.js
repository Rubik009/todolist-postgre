const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
const roleAuthenticatToken = require('../middleware/role.auth');


/**
 * @swagger
 *  /api/user/register:
 *    post:
 *      description: 
 *          Register.
 *      tags:
 *          - Users
 *      parameters:
 *        - name: user 
 *          in: body
 *          description: user object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        200:
 *          description: User registration
 *          schema:
 *              title: Return String
 *              type: string
 *              example: "User added!"
 * definitions:
 *   User:
 *     description: User object
 *     properties:
 *       username:
 *         type: string
 *         example: alesha
 *         description: username
 *       password:
 *         type: string
 *         example: alesha
 *         description: user password
 *       role:
 *         type: string
 *         example: user
 *         description: user role
 *     required:
 *      - username
 *      - password
 *      - role
 */
router.post("/register", async (req, res) => {
    try {
        const user = await UserController.register(req.body);
        res.status(200).json({ message: user });

    } catch (err) {
        console.log({ message: err });
    }
});


/**
 * @swagger
 *  /api/user/login:
 *    post:
 *      description: 
 *          Login.
 *      tags:
 *          - Users
 *      parameters:
 *        - name: user 
 *          in: body
 *          description: user object
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        200:
 *          description: Successful response
 *          schema:
 *              title: Return String
 *              type: string
 *              example: "succesfully"
 * definitions:
 *   User:
 *     description: User object
 *     properties:
 *       username:
 *         type: string
 *         example: roman
 *         description: user login
 *       password:
 *         type: string
 *         example: roman
 *         description: user password 
 *     required:
 *      - username
 *      - password
 */
router.post("/login", async (req, res) => {
    try {
        const user = await UserController.login(req.body);
        res.status(200).json({ user });

    } catch (err) {
        console.log({ message: err });
    }
});


/**
 * @swagger
 * /api/user:
 *  get:
 *      description: Use a request to get users only for admins
 *      tags:
 *        - Users
 *      parameters:
 *      - name : authorization
 *        in : header
 *        type : string
 *        required : true 
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.get("/", roleAuthenticatToken('admin'), async (req, res) => {
    try {
        const users = await UserController.getUsers();
        res.status(200).json({ message: "List of users", users });
    } catch (err) {
        console.log({ message: err });
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      description: See user by id for admins
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true
 *        - in : path
 *          name : id
 *          type : string
 *          required : true 
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.get("/:id",roleAuthenticatToken('admin'), async (req, res) => {
    try {
        const user = await UserController.getOneUser(req.params.id);
        res.status(200).json({ message: "User", user });

    } catch (err) {
        console.log({ message: err });
    }
});


/**
 * @swagger
 * /api/user/update/{id}:
 *  patch:
 *      description: Edit user in the list for admins
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true
 *        - in : path
 *          name : id
 *          type : string
 *          required : true 
 *        - in: body
 *          name: Users
 *          required: true
 *          description: write user id need to change username
 *          schema:
 *              $ref: '#/definitions/Users'
 *      responses:
 *          '200':
 *              description: A succesful response
 * definitions:
 *  Edit_User:
 *      type: object
 *      required:
 *          - username
 *      properties:
 *          username: 
 *              type: string
 */
router.patch("/update/:id",roleAuthenticatToken('admin'), async (req, res) => {
    try {
        const user = await UserController.updateUser(req.params.id, req.body.username);
        res.status(200).json({ message: user });

    } catch (err) {
        console.log({ message: err });
    }
});


/**
 * @swagger
 * /api/user/delete/{id}:
 *  delete:
 *      description: Delete user for admins
 *      tags:
 *        - Users
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true 
 *        - in : path
 *          type : string
 *          name : id
 *          required : true 
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.delete("/delete/:id",roleAuthenticatToken('admin'), async (req, res) => {
    try {
        const user = await UserController.deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted!", user });

    } catch (err) {
        console.log({ message: err });
    }
});


module.exports = router;