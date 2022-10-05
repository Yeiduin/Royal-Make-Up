const axios = require('axios');
const { Op } = require('sequelize');
const { Product, Comment, Order, User } = require("../db");
const json = require("../../db.json");
const { getOrderDetails } = require('./ordersService');

/**
 * setea de db.json los productos en db
 */
 async function setProducts(){
    
    try {
   
        const products = json.products.map((product) => {
            return {
                
                name: product.name,
                price: product.price,
                finalPrice: product.finalPrice,
                rank: product.rating,
                stock: product.stock,
                description: product.description,
                image: product.image,
                tags: product.tags,
                brand: product.brand,
                category: product.category,
                createdAt: product.updatedAt,
                discount: product.discount,
                subcategory: product.subcategory,
                colors: product.colors
            };
        });
        
        Product.bulkCreate(products);
        

        
    } catch (error) {
        throw error;
    }

}

/**
 * 
 * @returns todos los prductos
 * 
 * esta funcion no se exporta
 */
async function getProducts(){

    try {
        const products = await Product.findAll({
            include: {
                model: Comment
            }
        });

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

    if(products.length == 0){

        await setProducts();

        products =  await getProducts();
    }


    if(name)
    {
        try {
            const filtered = Product.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${name}%`
                    } 
                },
                include: {
                    model: Comment
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
    else {
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
        
        const product = await Product.findOne({
            where: {id: id},
            include: {
                model: Comment
            }
        });
        
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

        if(product.discount !== 0) {
            let finalPrice = product.price - ((product.price * product.discount) / 100);
            let finalProduct = {...product, finalPrice };
            
             await Product.create(finalProduct);
             
        } else {
            const finalPrice = product.price;
            const finalProduct = {...product, finalPrice};
            await Product.create(finalProduct);
        }


        
      } catch (error) {

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
        
        if((newProduct.discount || newProduct.discount == 0) && newProduct.price != undefined) {
            if(newProduct.discount > 0) {
                let finalPrice = newProduct.price - ((newProduct.price * newProduct.discount) / 100);
                let finalProduct = {...newProduct, finalPrice};
    
                await myProduct.update(finalProduct);
            } else {
                const finalPrice = newProduct.price;
                const finalProduct = {...newProduct, finalPrice};
                await myProduct.update(finalProduct);
            }
        } else if (newProduct.discount || newProduct.discount == 0) {
            if(newProduct.discount > 0) {
                let finalPrice = myProduct.price - ((myProduct.price * newProduct.discount) / 100);
                let finalProduct = {...newProduct, finalPrice};
    
                await myProduct.update(finalProduct);
            } else {
                const finalPrice = myProduct.price;
                const finalProduct = {...newProduct, finalPrice};
                await myProduct.update(finalProduct);
            }
        } else if(newProduct.price) {
            if(myProduct.discount > 0) {
                let finalPrice = newProduct.price - ((newProduct.price * myProduct.discount) / 100)
                let finalProduct = {...newProduct, finalPrice};
    
                await myProduct.update(finalProduct); 
            } else {
                const finalPrice = newProduct.price;
                const finalProduct = {...newProduct, finalPrice};
                await myProduct.update(finalProduct);
            }
        } else {
            await myProduct.update(newProduct);
        }

    }
    else{
      throw new Error("Product not found");
    }
  
}


/**
 * 
 * @param {*} productId 
 * @param {*} userId 
 * @param {*} rating 
 * 
 * agrega el rating dado por un usuario al producto y actualiza el rank total del producto
 */
async function addRating(productId, userId, rating) {

    try {

        //------------------------------------------------VALIDO QUE EL USUARIO NO ESTÉ BANEADO---------------------------------------------------

        const user = await User.findByPk(userId);

        if(user.dataValues.type === 'Banned') {
            throw new Error(`You are banned!`)
        }

        //------------------------------------------------VALIDO QUE HAYA COMPRADO EL PRODUCTO-----------------------------------------------------

        //busco todas las ordenes de compra del usuario
        const order = await Order.findAll({
            where: {
                userID: userId
            }
        });

        //busco el producto
        const product = await Product.findByPk(productId);

        //acá guardo los ids de los productos que el usario ya compró
        const boughtProducts = [];

        //busco, dentro de las ordenes de compra del usuario, los productos comprados
        const carts = order.map(a => a.dataValues.cart);
        carts.map(c => c[0].Products.map(p => boughtProducts.push(p.id)));

        if(!boughtProducts.includes(productId)) {
            throw new Error(`You haven't bought the product yet!`);
        }

        //--------------------------------------------------------ACTUALIZO EL RATING--------------------------------------------------------------

        if(!product.dataValues.votes.map(p => p.userId).includes(userId)) {
            //si el usuario todavía no votó, le agrego al producto, a la propiedad de votes, el id del usuario y su rating
            await product.update({votes: [...product.dataValues.votes, {userId: userId, rating: rating}]});

        } else {
            //si el usuario ya había votado, actualizo el rating que le había dado
            await product.update({votes: product.dataValues.votes.filter(vote => vote.userId !== userId)});
            await product.update({votes: [...product.dataValues.votes, {userId: userId, rating: rating}]});
        }

        //teniendo todos los votos de los usuarios en el arreglo de votes, saco el promedio del rank total del producto
        const productVotes = product.dataValues.votes.map(p => p.rating);
        const suma = productVotes.reduce((a, b) => a + b);
        const finalRating = suma / productVotes.length;

        //actualizo el rank total del producto
        await product.update({rank: finalRating.toFixed(2)});

    } catch (error) {
        
        throw error;

    }

}


module.exports = {
    addProduct,
    deleteProduct,
    modifyProduct,
    getProductByName,
    getProductById,
    addRating
}
