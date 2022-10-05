const { Order, Cart, Product, User } = require("../db");
const { Op } = require("sequelize");
const { sendRegistrationEmail } = require("../utils/mailsService");


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
 *  crea una orden de compra
 */
async function addOrder(userID, status, address) {

    try {

        let cart = await Cart.findOne({
            where: {
                UserId: userID
            },
            include: [{
                model: Product,
                attributes: ['id', 'price', 'name', 'finalPrice']
            }]
        });

        const order = await Order.create({cart: [cart], userID, status, address});

        const user = await User.findByPk(userID);
        
        let productsBought =  cart.Products.map( product => `<tr>
        <td class="tdProduct">${product.name}</td>
        <td>${product.finalPrice}</td>
        <td>${product.product_cart.quantity}</td>
        </tr>`).join('<br>');

        const subject = 'Order confirmation for your latest purchase!';

        const body = `<html>
                        <head>
                            <link rel="stylesheet" href="cssStyle.css">
                            <script src="jquery-1.3.2.min.js" type="text/javascript"></script>   
                            <style>
                                

                                .formTable{
                                    
                                    text-align: center;
                                    width: 100%;
                                    background-color: rgb(234, 252, 231);
                                    font-family: 'Garamond', serif;
                                    box-shadow: 0.4rem 0.4rem 2.4rem 0.2rem hsla(236, 50%, 50%, 0.3);
                                    
                                    border-radius: 5px;
                                    
                                
                                }
                                
                                .table{
                                    margin-left: 32%;
                                    
                                }

                                .textOrder, .textPrice {
                                    font-size: 16.5px;
                                }
                                
                                .logoRoyal{
                                    margin-top: 1%;
                                    height: 100px;
                                    width: 100px;
                                }
                                
                                .pleaseText{
                                    color: rgb(87, 85, 85);  
                                    font-size: 16px;
                                }
                                
                                .thanks{
                                    color: black;
                                    font-size: 25px;
                                }
                                
                                th, td{
                                    text-align: center;
                                    padding-left:  20px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="formMailing">
                
                            <div class="formTable">
                                <img class="logoRoyal" src="https://www.graphicsprings.com/filestorage/stencils/94c75069b629ef39a95e4ee6f54b8567.png?width=500&height=500"></img>
                                <p class="thanks">Thank's for purchasing, here's your purchase order:</p>
                                <p class="textOrder"><b>Order n°:</b> ${order.id}</p>
                                <p class="textPrice"><b>Price:</b> US$ ${cart.totalPrice}</p>
                                <table class = "table">
                                    <thead class ="theadTable">
                                        <tr>
                                            <th>PRODUCT</th>
                                            <th>PRICE</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${productsBought}
                                    </tbody>
                                </table>
                                <p class ="pleaseText">Please note: This mail was sent by a bot, do not respond! Thank you!</p>
                            </div>
                        </div>
                        </body>
                    </html>`;

        sendRegistrationEmail(user.dataValues.email, subject, body);

    } catch (error) {

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