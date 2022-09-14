const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			img: {
				type: DataTypes.TEXT,
			},

			type: {
				type: DataTypes.ENUM(['Admin', 'User', 'Banned']),
				defaultValue: 'User',
			},

			favorites: {
				type: DataTypes.JSON,
				defaultValue: [],
			},

            creditCard: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},

			
		},
		{ timestamps: false }
	);
};
