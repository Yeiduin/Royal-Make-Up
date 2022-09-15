const axios = require('axios');
const { Op } = require('sequelize');
const { User } = require("../db");


/**
 * retorna todos los usuarios
 */
async function getAllUsers() {

    try {
        
        const users = await User.findAll();
        return users;

    } catch (error) {

        throw error;

    }
}

/**
 * 
 * @param {*} id 
 * @returns un usuario por id
 */
async function getUserById(id) {
    
    try {
    
        const user = await User.findByPk(id);
        return user;   
    
    } catch (error) {

        throw error;
    
    }
}

/**
 * añade un usuario
 */
async function addUser(user) {

    try {
        
        const newUser = await User.create(user);

    } catch (error) {
        
        throw error;
        
    }
}

/**
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

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    modifyUser,
    getUserById,
    changeType
}