import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Notification = sequelize.define("Notification", {
    notification_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {timestamps: true});

export default Notification;