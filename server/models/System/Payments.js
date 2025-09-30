import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Payments = sequelize.define("Payments", {
    payment_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    payment_method: {
        type: DataTypes.ENUM('card', 'upi', 'wallet', 'cod'),
        defaultValue: "cod",
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    transaction_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
      defaultValue: "pending",
    },
}, {timestamps: true});

export default Payments;