const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Comment',
		{		
			userID: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			productID: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW,
			},
		},
		{ timestamps: false }
	);
};
