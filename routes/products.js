const { json } = require("express");
let products = require("../productData");
const router = require("express").Router();

router.get("/products", (req, res) => {
    res.render("products", {
        title: "My Product page",
    });
});
router.get("/api/products", (req, res) => {
    res.json(products);
});
router.post("/api/products", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(422).json({ error: "ALL FIELDS ARE REQUIRED." });
    }

    const product = {
        name: name,
        price: price,
        id: new Date().getTime().toString(),
    };
    products.push(product);
    // console.log(req.body);
    res.json(product);
});
router.delete("/api/products/:productId", (req, res) => {
    products = products.filter((product) => req.params.productId !== product.id);
    res.json({ status: "OK" });
});
module.exports = router;