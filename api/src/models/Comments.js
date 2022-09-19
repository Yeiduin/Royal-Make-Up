const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Comment',
		{		
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
