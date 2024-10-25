const express = require("express")
const router = express.Router()
const db = require("../database")

// GET : LIRE tous les utilisateurs
router.get("/users/", (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
    });
})

router.get("/users/:id", (req, res) => {
    console.log(req.body);
    const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
    if(userIndex < 0) return res.status(404).json({ msg: "utilisateur non trouvé" });   
    res.json(users[userIndex]);
})

router.put("/users/:id", (req, res)=> {
    const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);
    if(userIndex < 0) return res.status(404).json({ msg: "utilisateur non trouvé" });
    const { firstName, lastName } = req.body
	if (firstName) users[userIndex].firstName = firstName
	if (lastName) users[userIndex].lastName = lastName
    res.json({
		msg: "utilisateur mis à jour",
		user: users[userIndex],
	})
})


router.post("/users/", (req, res) => {
    console.log(req.body);
    const { firstName, lastName, role } = req.body;
    const lastUserId = users[users.length-1].id;
    const newUser = {
        id : lastUserId + 1,
		firstName,
		lastName,
		role,
	}
    
    users.push(newUser);
    res.status(201).json(newUser)
})

router.delete("/users/:id", (req, res) => {
    console.log(req.body);
    const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
    if(userIndex < 0) return res.status(404).json({ msg: "utilisateur non trouvé" });
    users.splice(userIndex, 1);
    res.json({
		msg: "utilisateur supprimé",
	})
})

module.exports = router