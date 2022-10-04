const router = require("express").Router();
const apiKeyMiddleWare = require("../middlewares/apiKey");

// ? Applying globally
// router.use(apiKeyMiddleWare);
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
router.get("/api/products", apiKeyMiddleWare, (req, res) => {
    res.json([{
            id: "1",
            name: "Chrome",
        },
        {
            id: "2",
            name: "Apple",
        },
    ]);
});
module.exports = router;