import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deliveryAgentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
            is: {
                args: /^[1-9][0-9]{5}$/,
                msg: 'Pincode is not valid',
            }
        }
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    deliveryFees: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Partially Accepted", "Accepted", "Out For Delivery", "Completed", "Cancelled"),
        defaultValue: "Pending",
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {timestamps: true});

export default Order;