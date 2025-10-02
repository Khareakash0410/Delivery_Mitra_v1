import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const DeliveryAssignment = sequelize.define("DeliveryAssignment", {
    assignment_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Order",
            key: "order_id",
        }
    },
    delivery_agent_id: {
        allowNull: false,
        references: {
            model: "Users",
            key: "user_id",
        }
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