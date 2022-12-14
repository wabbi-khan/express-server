const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routes/index");
const productRouter = require("./routes/products");
const ErrorHandler = require("./errors/ErrorHandler");

// * ejs engine
app.set("view engine", "ejs");
console.log(app.get("views"));

// ? creating server with the help of listen
const PORT = process.env.PORT || 4000;

// ? creating routes
app.use(express.static("public"));
app.use(express.json());
app.use(productRouter);
app.use(mainRouter);

// ? Error Handling
app.use((req, res, next) => {
    return res.json({ message: "pahe not found" });
});

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status,
            },
        });
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status,
            },
        });
    }
    next();
    // console.log("Error", err.message);
});

// * with ejs engine
// app.get("/", (req, res) => {
//     res.render("index", {
//         title: "My home page",
//     });
// });
// app.get("/about", (req, res) => {
//     res.render("about", {
//         title: "My about page",
//     });
// });

// * without ejs engine

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname) + "/index.html");
// });
// app.get("/about", (req, res) => {
//     res.sendFile(path.resolve(__dirname) + "/about.html");
// });
// app.get("/download", (req, res) => {
//     res.download(path.resolve(__dirname) + "/about.html");
// });

app.listen(4000, () => {
    console.log(`Listening on Port ${PORT}`);
});