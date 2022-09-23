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
				allowNull: true,
				defaultValue: null,
			},

            stock: {
				type: DataTypes.INTEGER,
				defaultValue: 20,
			},

            description: {
				type: DataTypes.TEXT,
			},

            image: {
				type: DataTypes.TEXT,
			},

            tags: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},

			brand: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			category: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			createdAt: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW,
			},

			discount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},

			subcategory: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			colors: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				defaultValue: [],
			}
		},
		{ timestamps: false }
	);
};