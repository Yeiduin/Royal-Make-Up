const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Product',
		{
            id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				validate: {
					isUUID: 4
				}
			},

            name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},

            price: {
				type: DataTypes.FLOAT,
				allowNull: true,
				validate: {
					isFloat: true,
					min: 1
				}
			},

			finalPrice: {
				type: DataTypes.FLOAT,
				allowNull: true,
				validate: {
					isFloat: true
				}
			},

            rank: {
				type: DataTypes.FLOAT,
				allowNull: true,
				defaultValue: null,
				validate: {
					isFloat: true
				}
			},

            stock: {
				type: DataTypes.INTEGER,
				defaultValue: 20,
				validate: {
					isInt: true,
					min: 0
				}
			},

            description: {
				type: DataTypes.TEXT,
				validate: {
					len: [6, 3040],
					notEmpty: true
				}
			},

            image: {
				type: DataTypes.TEXT,
				validate: {
					isUrl: true,
					notEmpty: true
				}
			},

            tags: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},

			brand: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},

			category: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},

			createdAt: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW,
				validate: {
					notEmpty: true,
					isDate: true
				}
			},

			discount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 100
				}
			},

			subcategory: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null
			},

			colors: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				defaultValue: [],
			},

			votes: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				defaultValue: []
			},

			disable: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			}
		},
		{ timestamps: false }
	);
};