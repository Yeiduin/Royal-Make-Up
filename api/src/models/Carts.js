const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Cart',
		{
			id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
				validate: {
					isUUID: 4
				}
            },
			status:{
                type: DataTypes.ENUM(["Active", "Disabled"]),
                defaultValue: "Active",
				validate: {
					notEmpty: true,
					isIn: [['Active', 'Disabled']]
				}
            },
			totalPrice:{
				type: DataTypes.FLOAT,
				defaultValue: 0,
				validate: {
					isFloat: true
				}
			}
		},
		{ timestamps: false }
	);
};