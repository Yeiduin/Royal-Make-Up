const { Router } = require('express');
const axios = require('axios');
const { addOrder } = require('../services/ordersServicies');


const router = Router();

// creación base para probar pusheo de ordenes.

router.post("/orders",async function (req, res){

    try {
        res.status(200).json(await addOrder(req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;