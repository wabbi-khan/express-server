const router = require("express").Router();

// ? Pages routes
router.get("/", (req, res) => {
    res.render("index", {
        title: "My home page",
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        title: "My about page",
    });
});

// ? MiddleWare api route

module.exports = router;