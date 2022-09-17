const { User, Product } = require("../db");


/**
 * 
 * @param {*} userId
 * 
 * si se pasa un id, retorna ese usuario, sino retorna todos
 */
async function getAllUsers(userId) {

    try {
        
        if(userId) {
            const user = await User.findByPk(userId);
            return user;
        }

        const users = await User.findAll();
        return users;

    } catch (error) {

        throw error;

    }
}

/**
 * 
 * @param {*} user objeto con la información del usuario
 * 
 * agrega un usuario
 */
async function addUser(user) {

    try {
        
        const newUser = await User.create(user);

        if(newUser)
        {
            await createUserCart(newUser.id);
        }

    } catch (error) {
        
        throw error;
        
    }
}


/**
 * 
 * @param {*} userId
 * 
 * elimina un usuario por id
 */
async function deleteUser(userId) {

    try {
        
        await User.destroy({where: {id: userId}});

    } catch (error) {

        throw error;
    }

}


/**
 * 
 * @param {*} userId
 * @param {*} newUser
 * 
 * modifica propiedades de un usuario por id
 */
async function modifyUser(userId, newUser) {

    try {

        const user = await User.findByPk(userId);

        const updatedUser = await user.update(newUser);

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} userId
 * @param {*} type
 * 
 * cambia el tipo de un usuario por id
 */
async function changeType(userId, type) {

    try {
        const user = await User.findByPk(userId);

        await user.update({type: type})

    } catch (error) {

        throw error;

    }

}


/**
 * 
 * @param {*} userId
 * @param {*} password
 * 
 * cambia la contraseña de un usuario por id
 */
async function changePassword(userId, password) {

    try {
        const user = await User.findByPk(userId);

        await user.update({password: password});

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} userId
 * 
 * retorna todos los productos de la lista de favoritos del usuario por id
 */
 async function getUserFavorites(userId) {

    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        return user.favorites;

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} userId
 * @param {*} productId
 * 
 * agrega productos a la lista de favoritos del usuario por id
 */
async function addFavorites(userId, productId) {

    try {
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if(!product) throw new Error("Product not found");
        if(!user.dataValues.favorites.includes(productId)) await user.update({favorites: [...user.dataValues.favorites, productId]});
        else throw new Error("Product already added to favorites");

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} userId
 * @param {*} productId
 * 
 * elimina productos de la lista de favoritos del usuario por id
 */
async function deleteFavorite(userId, productId) {

    try {
        const user = await User.findByPk(userId);

        await user.update({favorites: user.dataValues.favorites.filter(fav => fav !== productId)});

    } catch (error) {

        throw error;

    }
}


module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    modifyUser,
    changeType,
    changePassword,
    addFavorites,
    deleteFavorite,
    getUserFavorites
}
