const axios = require('axios');
const { Op } = require('sequelize');
const { Order } = require("../db");


async function addOrder({cart, userID, status}) {

    try {
        await Order.create({
            cart,
            userID,
            status,
        });
        return "Order create!, is being prosecuted.";

    } catch (error) {
        throw error;
    }
}

module.exports = {
    addOrder
}