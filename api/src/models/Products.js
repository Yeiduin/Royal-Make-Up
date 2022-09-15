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

            images: {
				type: DataTypes.ARRAY(DataTypes.TEXT),
			},

            tags: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
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

			colors: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				defaultValue: [],
			},

		},
		{ timestamps: false }
	);
};