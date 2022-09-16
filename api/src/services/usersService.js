const { User, Cart } = require("../db");


/**
 * 
 * @param {*} id 
 * @returns retorno un usuario si se pasa un id, sino retorno todos
 */
async function getAllUsers(id) {

    try {
        
        if(id) {
            const user = await User.findByPk(id);
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
 * @param {*} user 
 * añade un usuario
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
 * @param {*} id 
 * 
 * elimina un usuario por id
 */
async function deleteUser(id) {

    try {
        
        await User.destroy({where: {id: id}});

    } catch (error) {
        
        throw error;

    }

}


/**
 * 
 * @param {*} id 
 * @param {*} newUser 
 * 
 * modifica un usuario por id
 */
async function modifyUser(id, newUser) {
    
    try {

        const user = await User.findByPk(id);
        
        const updatedUser = await user.update(newUser);
        
    } catch (error) {
        
        throw error;

    }

}


/**
 * 
 * @param {*} id 
 * @param {*} type 
 * 
 * modifica el type de un usuario por id 
 */
async function changeType(id, type) {

    try {
        const user = await User.findByPk(id);

        await user.update({type: type})

    } catch (error) {

        throw error;

    }

}

/**
 * 
 * @param {*} userId 
 * 
 * recibe un id de un usuario y crea un cart para ese usuario
 * function estatica no se exporta
 */
 async function createUserCart(userId){
  
    try {

        let user = await User.findByPk(userId);

        let newCart = await Cart.create();

	    newCart.setUser(user);
        
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    modifyUser,
    changeType
}
