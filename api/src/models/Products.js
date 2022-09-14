const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Product',
		{
            id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

            name: {
				type: DataTypes.STRING,
				allowNull: false,
			},

            price: {
				type: DataTypes.FLOAT,
				allowNull: true, 
			},

            rank: {
				type: DataTypes.FLOAT,
			},

            stock: {
				type: DataTypes.INTEGER,
				defaultValue: 50,
			},

            description: {
				type: DataTypes.TEXT,
			},

            image: {
				type: DataTypes.TEXT,
			},

            tags: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},

            messures: {
				type: DataTypes.JSON,
				defaultValue: [],
			},

		},
		{ timestamps: false }
	);
};