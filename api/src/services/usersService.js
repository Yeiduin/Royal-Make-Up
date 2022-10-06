const { User, Product, Cart, Comment } = require("../db");
const { sendRegistrationEmail } = require("../utils/mailsService");


/**
 * 
 * @param {*} userId
 * 
 * si se pasa un id, retorna ese usuario, sino retorna todos
 */
async function getAllUsers(userId) {

    try {
        
        if(userId) {
            const user = await User.findOne({
                where: {
                    id: userId
                },

                include: [{
                    model: Cart
                }, {
                    model: Comment
                }]
            });
            
            return user;
        }

        //si no se encuentra un admin, lo crea
        await User.findOrCreate({
            where: {
                email: "holasoydios10@gmail.com",
                username: "soydios10",
                password: "holasoydios10",
                type: "Admin"
            }
        })

        const users = await User.findAll({
            include: [{
                model: Cart
            }, {
                model: Comment
            }]
        });

        return users;

    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} email 
 * @returns retorna un usuario por email
 */
 async function getUserByEmail(email) {

    try {
        
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        return user;

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

        // @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
        
        const subject = "Thank you for registering 👑";
        
        const body = `<html>
                        <head>
                            <link rel="stylesheet" href="cssStyle.css">
                            <script src="jquery-1.3.2.min.js" type="text/javascript"></script>   
                            <style>
                        
                                .formMailing{
                                    text-align: center;
                                    width: 100%;
                                    font-family: 'Garamond', serif;
                                    background-color: rgb(234, 252, 231);
                                    box-shadow: 0.4rem 0.4rem 2.4rem 0.2rem hsla(236, 50%, 50%, 0.3);
                                    min-height: 595px;
                                    border-radius: 5px;

                                
                                }
                                
                                .title{
                                    color: black;
                                    font-size: 30px;
                                    
                                    font-weight: bold;
                                    
                                }
                                
                                .text{
                                    font-size: 20px;
                                }
                                
                                .logoRoyal{
                                    margin-top: 1%;
                                    height: 150px;
                                    width: 150px;
                                }
                                
                                .noteText{
                                    font-size: 25px;
                                    color: black;
                                }
                                
                                .pleaseText{
                                    color: rgb(87, 85, 85);
                                    margin-top: 5%;
                                    font-size: 14px;
                                }
                                
                                .copyText{
                                    margin-top: 5%;
                                    font-weight: bold;
                                    color: rgb(63, 62, 62);
                                }
                                
                                .royalWeb{
                                    text-decoration: none;
                                    color: black;
                                    font-weight: bold;
                                    font-size: 30px;
                                }
                                .royalWeb:hover{
                                    color: rgb(233, 160, 50);
                                }
                            </style>
                        </head>
                        <body>
                            <div class="formMailing">
                                <img class="logoRoyal" src="https://www.graphicsprings.com/filestorage/stencils/94c75069b629ef39a95e4ee6f54b8567.png?width=500&height=500"></img>
                                <p class="title" id="title">Hi ${user.username}!<span></span></p><br> 
                                <div class="text">
                                    <p class="noteText">We are happy to welcome you to the Royal Makeup community!
                                    <br> You can now sign in with the password you chose when signing up.</p>
                                    <a class="royalWeb" href="https://royalmakeup.vercel.app/home">Royal Makeup</a>
                                    <p class="pleaseText">Please note: this message was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.
                                    <br> Please see our Terms of Use and Privacy & Cookies Policy for more information.</p>
                                    <p class="copyText">Royal Makeup and related products are RM and © Niveados Inc. publishing rights.</p>
                                </div>
                            </div>
                        </body>
                    </html>`;

        sendRegistrationEmail(user.email, subject, body);

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
        
        await User.destroy({
            where: {
                id: userId
            }
        });

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

        if(!product) {
            
            throw new Error("Product not found");
        
        }
        
        else if(!user.dataValues.favorites.includes(productId)) {

            await user.update({favorites: [...user.dataValues.favorites, productId]});

        }

        else {

            throw new Error("Product already added to favorites");

        } 

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


/**
 * 
 * @param {*} userId 
 * crea un cart al usuario por id
 */
 async function createUserCart(userId) {

    try {
        const user = await User.findByPk(userId);
        const cart = await Cart.create();

        await user.addCart(cart);

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
    getUserFavorites,
    getUserByEmail
}
