const { json } = require("express");
const products = require("../productData");
const router = require("express").Router();

router.get("/products", (req, res) => {
    res.render("products", {
        title: "My Product page",
    });
});
router.get("/api/products", (req, res) => {
    res.json(products);
});
module.exports = router;