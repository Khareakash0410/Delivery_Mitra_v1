import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const OrderItems = sequelize.define("OrderItem", {
    order_item_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Orders",
            key: "order_id",
        }
    },
    variant_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "ProductVariants",
            key: "variant_id",
        }
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

export default OrderItems;