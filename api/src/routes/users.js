const { Router } = require('express');
const axios = require('axios');
const {
    getAllUsers,
    addUser,
    deleteUser,
    modifyUser,
    getUserById,
    changeType
} = require('../services/usersService')


const router = Router();

/**
 * retorna todos los usuarios
 */
router.get("/users", async function(req, res) {
    try {
        
        res.status(200).json(await getAllUsers());

    } catch (error) {
    
        res.status(404).json({error: error.message});

    }
})

/**
 * retorno usuario por id
 */
router.get("/users/:id", async function(req, res) {
    try {
        const { id } = req.params;
    
        res.status(200).json(await getUserById(id));
        
    } catch (error) {

        res.status(404).json({error: error.message});

    }
})

/**
 * crea un usuario
 */
router.post("/users", async function(req, res) {
    try {
        const user = req.body;
        
        res.status(200).json(await addUser(user));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * elimino el usuario por id
 */
router.delete("/users/:id", async function(req, res) {
    try {
        const { id } = req.params;

        res.status(200).json(await deleteUser(id));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * modifico el usuario por id
 */
router.put("/users", async function(req, res) {
    try {
        const {id, newUser} = req.body;

        res.status(200).json(await modifyUser(id, newUser));


    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})

/**
 * modifica type de un usuario (Admin, Banned, User)
 */
router.patch("/users", async function(req, res) {
    try {
        const {id, type} = req.body;

        res.status(200).json(await changeType(id, type));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})

module.exports = router;