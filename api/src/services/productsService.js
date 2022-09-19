const axios = require('axios');
const { Op } = require('sequelize');
const { Product } = require("../db");

/**
 * 
 * @returns todos los prductos
 * 
 * esta funcion no se exporta
 */
async function getProducts(){

    try {
        const products = await Product.findAll();

        return products;
    } catch (error) {
        
        throw error;
    }
}

/**
 * 
 * @param {*} name 
 * @returns si hay name por nombre, si no todos los productos
 */
async function getProductByName(name){

    let products = await getProducts();

    if(name)
    {
        try {
            const filtered = Product.findAll({
                where:{
                    name:{
                        [Op.iLike]: `${name}%`
                    }    
                }
            })

            
            if (!filtered) {
                throw new Error("Product not found");
            }

            return filtered;
        
        } catch (error) {
            throw error;
        }
    }
    else{
        return products;
    }
}


/**
 * 
 * @param {*} id 
 * @returns retorna un objeto por id
 */
async function getProductById(id){

    try {
        
        const product = await Product.findByPk(id);
        return product;
    
    } catch (error) {
        throw error;
    }
    
}



/**
 * 
 * @param {*} product 
 * 
 * agrego producto recibido
 */
async function addProduct(product){

    try {

        const newProduct = await Product.create(product);
        
      } catch (error) {

        console.log(error);
        throw error;

    }

}

/**
 * 
 * @param {*} id 
 * 
 * borro producto por id
 */
async function deleteProduct(id){
  
    const myProduct = await Product.findOne({
      where:{id: id}
    });
  
    if(myProduct){
      await myProduct.destroy();
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} newProduct 
 * 
 * modificamos el producto por id pusheando uno nuevo
 */
async function modifyProduct(id, newProduct){

    const myProduct = await Product.findOne({
      where:{id: id}
    })
  
    if(myProduct){
      await myProduct.update(newProduct);
    }
    else{
      throw new Error("Product not found");
    }
  
}



module.exports = {
    addProduct,
    deleteProduct,
    modifyProduct,
    getProductByName,
    getProductById
}