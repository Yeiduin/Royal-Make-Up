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
        });

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

        //busco todas las ordenes de compra del usuario
        const order = await Order.findAll({
            where: {
                userID: userId
            }
        });

        //busco el producto
        const product = await Product.findByPk(productId);

        //busco el usuario
        const user = await User.findByPk(userId);

        //acá guardo los ids de los productos que el usario ya compró
        let products = [];

        //filtro, dentro de las ordenes de compra, las que ya fueron aprovadas
        const approvedOrders = order.filter(o => o.dataValues.status === 'approved');
        //dentro de las ordenes aprobadas, me quedo solo con los carritos
        const orderCart = approvedOrders.map(o => o.dataValues.cart);
        //pusheo al arreglo de products todos los ids de los productos que el usuario compró
        orderCart.map(c => c[0].Products.map(p => products.push(p.id)));

        //si no existe el usuario, tiro un error
        if(!user) {
            throw new Error(`User with the id: ${userId} does not exist!`);
        }

        //si no existe el producto, tiro un error
        if(!product) {
            throw new Error(`Product with the id: ${productId} does not exist!`);
        }

        //si el usuario está baneado, tiro un error
        if(user.dataValues.type === 'Banned') {
            throw new Error("You are banned!");
        }

        //si el usuario no compró el producto al que le quiere hacer un comentario, tiro un error
        if(!products.includes(productId)) {
            throw new Error(`You haven't bought the product yet!`);
        }

        //creo el comentario
        const comment = await Comment.create({text: text, ProductId: productId, UserId: userId});
        
        //hago las relaciones entre comentario y producto y comentario y usuario
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
