const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Products = require("./products");
const Users = require("./users");
const Order = require("./orders");
const Cart = require("./cart");
const Comments = require("./comments");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/" , Products);
router.use("/", Users);
router.use("/", Order);
router.use("/", Cart);
router.use("/", Comments);


module.exports = router;