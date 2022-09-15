const { Router } = require('express');
const axios = require('axios');
const {
    addProduct,
    deleteProduct,
    modifyProduct,
    getProductByName
} = require("../services/productsService");

const router = Router();



/**
 * retorno total de productos
 */
router.get("/products", async function (req, res){

    const name = req.body.name;

    try {
        res.status(200).json(await getProductByName(name));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
      
});

/**
 * retorno producto por id
 */
router.get("/products/:id", async function (req, res){

    const {id} = req.params;

    json.products.forEach(prod => {
        
        if(prod.id == id){
            res.status(200).json(prod);
        }
    });


})


/**
 * agrego producto recibido por body
 */
router.post("/products",async function (req, res){
    
    const product = req.body;

    try {
        res.status(200).json(await addProduct(product));
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    

})

/**
 * borramos producto recibo por query
 */
router.delete("/products",async function (req, res){

    const {id} = req.query;

    try {
        res.status(200).json(await deleteProduct(id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

/**
 * modifico el producto recibido, golpeando por id
 */
router.put("/products", async function (req, res){

    const {id, newProduct} = req.body;
    
    try {
        res.status(200).json(await modifyProduct(id,newProduct));
    } catch (error) {
        res.status(404).json({error: error.message});
    }

})




module.exports = router;