const { Order, Cart, Product } = require("../db");
const { Op } = require("sequelize");


/**
 * 
 * @param {*} status
 * 
 * si se pasa un status, retorna las ordenes de compra con ese estado, sino retorna todas las ordenes de compra
 */
async function getAllOrders(status) {

    try {

        if(status) {

            let orders = await Order.findAll({
                where: {
                    status: status
                }
            });

            return orders;
        }

        let orders = await Order.findAll();

        return orders;

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} orderID
 * 
 * retorna una orden de compra por id
 */
async function getOrderDetails(orderID) {

    try {

        let order = await Order.findOne({
            where: {
                id: orderID
            }
        });

        if(!order) {

            throw new Error(`Order ${orderID} does not exist`);
        
        }

        return order;

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} userID
 * 
 * retorna las ordenes de compra de un usuario por id
 */
async function getUserOrders(userID) {

    try {

        let orders = await Order.findAll({
            where: {
                userID: userID
            }
        })

        return orders;

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} cartID 
 * @param {*} userID 
 * @param {*} status puede ser 'open', 'created', 'processing', 'approved' o 'cancelled'
 * 
 * crea una orden de compra
 */
async function addOrder(userID, status) {

    try {

        let cart = await Cart.findOne({
            where: {
                UserId: userID
            },
            include: [{
                model: Product,
                attributes: ['id', 'price', 'name']
            }]
        });

        await Order.create({cart: [cart], userID, status});

    } catch (error) {

        console.log(error);
        throw error;

    }
}


/**
 * 
 * @param {*} orderID 
 * @param {*} status puede ser 'open', 'created', 'processing', 'approved' o 'cancelled'
 * 
 * modifica el estado de una orden por id
 */
async function changeOrderStatus(orderID, status) {

    try {

        let order = await Order.findByPk(orderID);

        await order.update({status: status});

    } catch (error) {

        throw error;

    }
}


module.exports = {
    getAllOrders,
    addOrder,
    getOrderDetails,
    changeOrderStatus,
    getUserOrders
}
