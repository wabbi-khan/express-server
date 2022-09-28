const express = require("express");
const app = express();

// ? creating server with the help of listen
const PORT = process.env.PORT || 4000;

// ? creating routes
app.get("/", (req, res) => {
    res.send("Hello from Express ...");
});

app.listen(4000, () => {
    console.log(`Listening on Port ${PORT}`);
});