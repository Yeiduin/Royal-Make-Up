const { Comment, Product, User, Order } = require("../db");


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
        const order = await Order.findAll({
            where: {
                userID: userId
            }
        });

        const product = await Product.findByPk(productId);

        const user = await User.findByPk(userId);

        let products = [];

        const approvedOrders = order.filter(o => o.dataValues.status === 'approved');
        const orderCart = approvedOrders.map(o => o.dataValues.cart);
        orderCart.map(c => c[0].Products.map(p => products.push(p.id)));

        if(!user) {
            throw new Error(`User with the id: ${userId} does not exist!`);
        }

        if(!product) {
            throw new Error(`User with the id: ${productId} does not exist!`);
        }

        if(user.dataValues.type === 'Banned') {
            throw new Error("You are banned!");
        }

        if(!products.includes(productId)) {
            throw new Error(`You haven't bought the product yet!`);
        }

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
