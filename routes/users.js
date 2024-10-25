const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, createNewUser, updateUser, deleteUser } = require("../controllers/usersControllers");

// GET : LIRE tous les utilisateurs
router.get("/users/", getAllUsers);

router.get("/users/:id", getUser)

router.put("/users/:id", updateUser)

router.post("/users/", createNewUser)

router.delete("/users/:id", deleteUser)

module.exports = router