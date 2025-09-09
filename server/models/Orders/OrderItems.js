import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    itemPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    itemOption: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Accepted", "Rejected", "Dispatched"),
        defaultValue: "Pending",
    }

}, {timestamps: true});

export default OrderItem;