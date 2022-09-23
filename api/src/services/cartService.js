const axios = require('axios');
const { Op } = require('sequelize');
const { Product, Cart, User } = require("../db");


/**
 * @param {*} userID
 * 
 * retorna el carrito de un usuario por id
 */
 async function getUserCart(userID) {
    
    try {
        const user = await User.findOne({
            where: {
                id: userID 
            },
            include: {
                model: Cart
            }
        });
        
        return user.Carts;

    } catch (error) {
        throw error;
    }
}


/**
 * 
 * @param {*} productID 
 * @param {*} cartID 
 * 
 * agrega un producto al carrito y actualiza el precio
 */
async function addProductCart(productID, cartID){

    try {
        
        let cart = await Cart.findByPk(cartID);

        let product = await Product.findByPk(productID);

        await cart.addProduct(product);

        await cart.update({
            totalPrice: (cart.totalPrice + product.price)
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

        let productToRemove = await Product.findByPk(productID);

        await cart.removeProduct(productToRemove);

        await cart.update({
            totalPrice: (cart.totalPrice - productToRemove.price)
        });

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

        //agarro los id de los productos
		let productIDs = allProducts.map((product) => {
			return product.id;
		});

        //con los id traigo todos los modelos
        let modelProductFetch = await Product.findAll({
			where: {
				id: {
					[Op.in]: productIDs,
				},
			},
		});

        //guardo el total del precio de cada producto
        let productsTotalPrice = 0;
        await modelProductFetch.forEach(product => {

            productsTotalPrice = productsTotalPrice + product.price;
            
        });

        //traigo el carrito correspondiente al usuario
		let cart = await Cart.findOne({
			where: {
				UserId: userID,
			}
		});
        //genero el nuevo precio total
        let newPrice = parseFloat(productsTotalPrice) + cart.totalPrice;

        //agrego todos los productos y modifico el precio total con el nuevo
        await cart.addProduct(modelProductFetch);
		await cart.update({
			totalPrice: newPrice,
		});

		
		
	} catch (error) {
		throw error;
	}


}






module.exports = {
    addProductCart,
    deleteProductCart,
    clearAllCart,
    addBulkCart,
    getUserCart
}