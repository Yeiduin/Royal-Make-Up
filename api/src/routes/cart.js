const { Router } = require('express');
const axios = require('axios');
const {
    addProductCart,
    deleteProductCart,
    clearAllCart,
    addBulkCart,
    getUserCart
} = require("../services/cartService");

const router = Router();


/**
 * retorna el carrito de un usuario por id
 */
 router.get("/cart/:userID", async function(req, res) {
    const {userID} = req.params;

    try {
        res.status(200).json(await getUserCart(userID));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})


/**
 * agrega UN SOLO producto al carrito
 */
router.post("/cart", async function (req, res){

    const {productID, cartID} = req.body;

    try {
        res.status(200).json(await addProductCart(productID, cartID));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
      
});


/**
 * elimina UN SOLO producto del carrito
 */
router.delete("/cart", async function (req, res){

    const {productID, cartID} = req.body;

    try {
        res.status(200).json(await deleteProductCart(productID, cartID));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
      
});


/**
 * IMPORTANTE!!! la data tiene que ser:
 * @param {*} allProducts //ARRAY con id de los productos minimamente
 * @param {*} userID // id del usuario 
 * agregamos todos los productos que llegan de LOCALSTORAGE al carrito cuando el usuario se loguea
 */
router.post("/cart/bulk", async function (req, res){

    const {allProducts, userID} = req.body;

    try {
        res.status(200).json(await addBulkCart(allProducts, userID));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
      
});


/**
 * vaciamos el carrito con el id del usuario
 */
router.delete("/cart/:userID", async function (req, res){

    const {userID} = req.params;

    try {
        res.status(200).json(await clearAllCart(userID));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
      
});










module.exports = router;