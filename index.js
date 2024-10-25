const express = require('express');
const usersRouter = require("./routes/users.js")

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/", usersRouter);

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});