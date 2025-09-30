import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Order = sequelize.define("Order", {
    order_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "user_id",
        }
    },
    seller_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Vendor",
            key: "seller_id",
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'denied', 'paid', 'refunded', 'assigned_to_delivery', 'delivered'),
        defaultValue: "pending",
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "refunded"),
      defaultValue: "pending",
    },
}, {timestamps: true});

export default Order;