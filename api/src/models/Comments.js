const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Comment',
		{		
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [1, 280]
				}
			},
			date: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW,
				validate: {
					notEmpty: true,
					isDate: true
				}
			},
		},
		{ timestamps: false }
	);
};
