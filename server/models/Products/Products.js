import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Product = sequelize.define("Product", {

    //details
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM("Grocery", "Electronics", "Dairy", "Medicine", "Foods", "Others"),
        default: "Others",
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    variant: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    //pricing
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    platformFeesPerUnit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.00
    },

    //stocks
    stocks: {
        type: DataTypes.ENUM("In Stock", "Out of Stock"),
        defaultValue: "In Stock",
    },

}, {timestamps: true});


export default Product;