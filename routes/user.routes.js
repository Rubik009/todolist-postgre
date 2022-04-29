const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", async (req,res) => {
    try{
        const user = await UserController.register(req.body);
        res.status(200).json({message : "User added!", user});

    }catch(err){
        console.log({message : err});
    }
});

router.post("/login", async (req,res) => {
    try{
        const user = await UserController.login(req.body);
        res.status(200).json({message : "User added!", user});

    }catch(err){
        console.log({message : err});
    }
});

router.get("/", async (req,res) => {
    try{
        const users = await UserController.getUsers();
        res.status(200).json({message : "List of users", users});

    }catch(err){
        console.log({message : err});
    }
});


router.get("/:id", async (req,res) => {
    try{
        const user = await UserController.getOneUser(req.params.id);
        res.status(200).json({message : "User", user});

    }catch(err){
        console.log({message : err});
    }
});

router.patch("/update/:id", async (req,res) => {
    try{
        const user = await UserController.updateUser(req.params.id, req.body.username);
        res.status(200).json({message : "User updated!", user});

    }catch(err){
        console.log({message : err});
    }
});

router.delete("/delete/:id", async (req,res) => {
    try{
        const user = await UserController.deleteUser(req.params.id);
        res.status(200).json({message : "User deleted!", user});

    }catch(err){
        console.log({message : err});
    }
});


module.exports = router;