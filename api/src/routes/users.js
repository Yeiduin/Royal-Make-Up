const { Router } = require('express');
const axios = require('axios');
const {
    getAllUsers,
    addUser,
    deleteUser,
    modifyUser,
    changeType,
    changePassword,
    addFavorites,
    deleteFavorite,
    getUserFavorites,
    getUserByEmail
} = require('../services/usersService')


const router = Router();


/**
 * retorna un usuario por id en caso de encontrarlo, sino retorna todos
 */
router.get("/users", async function(req, res) {
    try {
        const { userId } = req.query;

        res.status(200).json(await getAllUsers(userId));

    } catch (error) {
    
        res.status(404).json({error: error.message});

    }
})


/**
 * retorna un usuario por email
 */
 router.get("/users/:email", async function(req, res) {
    try {
        const { email } = req.params;

        res.status(200).json(await getUserByEmail(email));

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
 * elimina el usuario por id
 */
router.delete("/users/:userId", async function(req, res) {
    try {
        const { userId } = req.params;

        res.status(200).json(await deleteUser(userId));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * modifica el usuario por id
 */
router.put("/users", async function(req, res) {
    try {
        const {userId, newUser} = req.body;

        res.status(200).json(await modifyUser(userId, newUser));


    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * modifica el type de un usuario (Admin, Banned, User)
 */
router.patch("/users/type", async function(req, res) {
    try {
        const {userId, type} = req.body;

        res.status(200).json(await changeType(userId, type));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * modifica la password de un usuario
 */
router.patch("/users/password", async function(req, res) {
    try {
        const {userId, password} = req.body; //paso id por body o por params ?

        res.status(200).json(await changePassword(userId, password))
       
    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * retorna los favoritos de un usuario
 */
router.get("/favorites", async function(req, res) {
    try {
        const {userId} = req.query;

        res.status(200).json(await getUserFavorites(userId));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * agrega favoritos al usuario
 */
router.post("/favorites", async function(req, res) {
    try {
        const {userId, productId} = req.body;

        res.status(200).json(await addFavorites(userId, productId));

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


/**
 * elimina favoritos de un usuario
 */
router.delete("/favorites", async function(req, res) {
    try {
        const {userId, productId} = req.body;

        res.status(200).json(await deleteFavorite(userId, productId))

    } catch (error) {
        
        res.status(404).json({error: error.message});

    }
})


module.exports = router;
