const express = require("express")
const router = express.Router()

const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' }
];

// GET : LIRE tous les utilisateurs
router.get("/users/", (req, res) => {
    res.json(users)
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