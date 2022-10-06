const { json } = require("express");
const ErrorHandler = require("../errors/ErrorHandler");
const apiKeyMiddleWare = require("../middlewares/apiKey");
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
router.post("/api/products", apiKeyMiddleWare, (req, res, next) => {
    // try {
    //     console.log(city);
    // } catch (err) {
    //     next(ErrorHandler.serverError(err.message));
    // }
    const { name, price } = req.body;
    if (!name || !price) {
        next(ErrorHandler.validationError());
        // throw new Error("ALL FIELDS ARE REQUIRED.");
        // return res.status(422).json({ error: "ALL FIELDS ARE REQUIRED." });
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