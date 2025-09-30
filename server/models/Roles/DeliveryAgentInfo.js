import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const DeliveryAgents = sequelize.define("DeliveryAgents", {
    delivery_agent_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {   
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",   
            key: "user_id",   
        },
        onDelete: "CASCADE", 
    },
    vehicle_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

    account_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
    },
    bank_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ifsc_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    qrCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    timestamps: true
   }
);

export default DeliveryAgents;