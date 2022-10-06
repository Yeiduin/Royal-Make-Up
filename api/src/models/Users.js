const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },

      img: {
        type: DataTypes.TEXT,
        defaultValue: "https://cdn.onlinewebfonts.com/svg/img_299586.png",
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },

      type: {
        type: DataTypes.ENUM(["Admin", "User","Blocked", "Banned"]),
        defaultValue: "User",
        validate: {
          notEmpty: true,
          isIn: [["Admin", "User","Blocked", "Banned"]],
        },
      },

      favorites: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      creditCard: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: true,
        validate: {
          customValidator(value) {
            if(value && String(value).length !== 16) {
              throw new Error("Credit card numbers must have 16 digits");
            }
          },
        },
      },
    },
    { timestamps: false }
  );
};
