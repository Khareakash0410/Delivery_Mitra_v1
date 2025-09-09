import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const CartItem = sequelize.define("CartItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    optionValue: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
});

export default CartItem;