const { Comment, Product, User } = require("../db");


/**
 * 
 * @param {*} userId
 * @param {*} productId
 * 
 * si se pasa un userId, retorna todos los comentarios de ese usuario
 * si se pasa un productId, retorna todos los comentarios de ese producto
 * si no se pasa ningun id, tira un error
 */
async function getAllComments(userId, productId) {

    let commentData;

    if(userId) {
        commentData = getAllUserComments(userId);
        return commentData;
    } 
    
    else if(productId) {
        commentData = getAllProductComments(productId);
        return commentData;
    }

    else {

        throw new Error("Data undefined");

    }

}


/**
 * 
 * @param {*} userId
 * 
 * trae todos los comentarios de un usuario por id
 */
async function getAllUserComments(userId) {
    
    try {
        const comments = await Comment.findAll({
            where: {
                UserId: userId
            }
        });

        return comments;

    } catch (error) {
        
        throw error;

    }
}


/**
 * 
 * @param {*} productId
 * 
 * trae todos los comentarios de un producto por id
 */
async function getAllProductComments(productId) {

    try {
        const comments = await Comment.findAll({
            where: {
                ProductId: productId
            }
        })

        return comments;

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} userId
 * @param {*} productId
 * @param {*} text
 * 
 * agrega un comentario al producto por id
 */
async function addComment(userId, productId, text) {
    
    try {
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        const comment = await Comment.create({text: text, ProductId: productId, UserId: userId});
        
        await product.addComment(comment);
        await user.addComment(comment);

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} commentId
 * 
 * elimina un comentario por id
 */
async function deleteComment(commentId) {

    try {
        const comment = await Comment.findByPk(commentId);

        await comment.destroy();

    } catch (error) {
        
        throw error;

    }
}


module.exports = {
    getAllComments,
    addComment,
    deleteComment
}
