const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'Order',
		{
			cart: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				allowNull: true,
			},
			userID:{
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			status: {
				type: DataTypes.ENUM(
					'open',
					'created',
					'processing',
					'approved',
					'cancelled'
				),
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
