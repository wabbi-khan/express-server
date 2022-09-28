const express = require("express");
const path = require("path");
const app = express();

// ? creating server with the help of listen
const PORT = process.env.PORT || 4000;

// ? creating routes
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname) + "/index.html");
});
app.get("/about", (req, res) => {
    res.sendFile(path.resolve(__dirname) + "/about.html");
});
app.get("/download", (req, res) => {
    res.download(path.resolve(__dirname) + "/about.html");
});

app.listen(4000, () => {
    console.log(`Listening on Port ${PORT}`);
});