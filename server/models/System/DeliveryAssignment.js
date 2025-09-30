import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const DeliveryAssignment = sequelize.define("DeliveryAssignment", {
    assignment_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('assigned', 'in_transit', 'delivered', 'failed'),
        defaultValue: "assigned",
    },
    assigned_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    delivered_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {timestamps: true});

export default DeliveryAssignment;