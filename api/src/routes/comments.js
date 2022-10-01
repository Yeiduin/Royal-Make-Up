const { Router } = require('express');
const axios = require('axios'); 
const {
    getAllComments,
    addComment,
    deleteComment
} = require('../services/commentsService')

const router = Router();


/**
 * si se pasa el id de un usuario, retorna todos los comentarios de ese usuario
 * si se pasa el id de un producto, retorna todos los comentarios de ese producto
 */
router.get("/comments", async function(req, res) {

    try {
        const {userId, productId} = req.query;

        res.status(200).json(await getAllComments(userId, productId));

    } catch (error) {

        res.status(404).json({error: error.message});

    }
})


/**
 * agrega comentarios a un producto
 */
router.post("/comments", async function(req, res) {
    try {
        const {productId, userId, text, rating} = req.body;

        res.status(200).json(await addComment(userId, productId, text, rating));

    } catch (error) {

        res.status(404).json({error: error.message});

    }
})


/**
 * elimina comentarios de un producto
 */
router.delete("/comments", async function(req, res) {
    try {
        const {commentId} = req.query;

        res.status(200).json(await deleteComment(commentId));

    } catch (error) {
    
        res.status(404).json({error: error.message});

    }
})


module.exports = router;
