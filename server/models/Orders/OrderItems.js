import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const OrderItem = sequelize.define("OrderItem", {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_variant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }

});

export default OrderItem;