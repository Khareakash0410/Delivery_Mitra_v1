import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    guest_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    }
});

export default Cart;