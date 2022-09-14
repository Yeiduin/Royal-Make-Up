const { Router } = require('express');
const axios = require('axios');
const json = require("../../db.json");

const router = Router();


router.get("/products", async function (req, res){
      

    res.status(200).json(json);//la isla donde nada puede malir sal
      
});

router.get("/products/:id", async function (req, res){

    const {id} = req.params;

    json.products.forEach(prod => {
        
        if(prod.id == id){
            res.status(200).json(prod);
        }
    });


})

module.exports = router;