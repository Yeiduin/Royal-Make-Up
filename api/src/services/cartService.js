const axios = require('axios');
const { Op } = require('sequelize');
const { Product, Cart, ProductCart } = require("../db");


/**
 * @param {*} userID
 * 
 * retorna el carrito de un usuario por id
 */
 async function getUserCart(userID) {
    
    try {
        const cart = await Cart.findOne({
            where: {
                UserId: userID
            },
            include: [{
                model: Product,
                attributes: ['id', 'price', 'name', 'stock', 'image']
            }]
        });

        return cart;

    } catch (error) {
        throw error;
    }
}


/**
 * 
 * @param {*} productID 
 * @param {*} cartID 
 * 
 * agrega un producto al carrito con su cantidad y actualiza el precio
 */
async function addProductCart(productID, cartID, quantity){

    try {
        
        let cart = await Cart.findOne({
            where: {
                id: cartID
            }, 
            include: {
                model: Product
            }
        });

        let product = await Product.findByPk(productID);

        await cart.addProduct(product, { through: { quantity: quantity } });

        await cart.update({
            totalPrice: (cart.totalPrice + (product.price * quantity))
        });

    } catch (error) {
        throw error;
    }

}


/**
 * 
 * @param {*} productID 
 * @param {*} cartID 
 * 
 * Elimina el producto del carrito por ID
 */
async function deleteProductCart(productID, cartID){

    try {
        
        let cart = await Cart.findByPk(cartID);

        let productToRemove = await Product.findOne({
            where: {
                id: productID
            },
            include: {
                model: Cart
            }
        });

        await cart.removeProduct(productToRemove);

        let quantity = productToRemove.dataValues.Carts[0].dataValues.product_cart.dataValues.quantity;

        await cart.update({
            totalPrice: (cart.totalPrice - (productToRemove.price * quantity))
        });

        let updatedCart = await Cart.findOne({
            where: {
                id: cartID
            },
            include: {
                model: Product
            }
        });

        return updatedCart;

    } catch (error) {
        throw error;
    }
    

}


/**
 * 
 * @param {*} userID 
 * 
 * limpia el carrito con el id del usuario
 */
async function clearAllCart(userID){
    
	try {

		let cart = await Cart.findOne({
			where: {
				UserId: userID,
			},
			include: {
				model: Product,
			},
		});

		await cart.update({
			totalPrice: 0,
		});

		await cart.setProducts([]);

        let updatedCart = await Cart.findOne({
            where: {
                UserId: userID
            },
            include: {
                model: Product
            }
        });

        return updatedCart;
		
	} catch (error) {
		throw error;
	}

}


/**
 * 
 * @param {*} allProducts 
 * @param {*} userID 
 * 
 * agrega productos en cantidad con el id de usuario
 */
async function addBulkCart(allProducts, userID){

	try {

        await clearAllCart(userID);

        let cart = await Cart.findOne({
            where: {
                UserId: userID,
            }
        });
        
        let productsTotalPrice = 0;

        allProducts.forEach(async product => {
            
            const dbProduct = await Product.findByPk(product.id); 
            
            await cart.addProduct(dbProduct, { through: { quantity: product.amount } });

            productsTotalPrice = productsTotalPrice + (product.price * product.amount);
            
            await cart.update({
                totalPrice: parseFloat(productsTotalPrice)
            });
        })

	} catch (error) {
		throw error;
	}


}


/**
 * 
 * @param {*} newQuantity 
 * @param {*} productID 
 * @param {*} cartID 
 * 
 * modifica la cantidad de productos agregados a un carrito por id y actualiza el precio total del carrito
 */
async function modifyQuantity(newQuantity, productID, cartID) {

    try {

        let cart = await Cart.findOne({
            where: {
                id: cartID
            },
            include: {
                model: Product
            }
        });

        let product = await Product.findByPk(productID);
        
        let oldQuantity = cart.dataValues.Products.find(p => p.id === productID).dataValues.product_cart.dataValues.quantity;

        let productPrice = product.dataValues.price;

        await cart.addProduct(product, { through: { quantity: newQuantity } });

        await cart.update({ totalPrice: (cart.totalPrice - (oldQuantity * productPrice)) });
        await cart.update({ totalPrice: (cart.totalPrice + (newQuantity * productPrice)) });

        let updatedCart = await Cart.findOne({
            where: {
                id: cartID
            },
            include: {
                model: Product
            }
        });

        return updatedCart;

    } catch (error) {
        
        throw error;

    }
}


module.exports = {
    addProductCart,
    deleteProductCart,
    clearAllCart,
    addBulkCart,
    getUserCart,
    modifyQuantity
}