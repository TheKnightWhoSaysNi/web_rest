const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' }
];

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


// GET : LIRE tous les utilisateurs
app.get("/", (req, res) => {
    res.json(users)
})


app.post("/", (req, res) => {
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