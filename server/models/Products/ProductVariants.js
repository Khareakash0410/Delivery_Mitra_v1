import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const ProductVariants = sequelize.define("ProductVariant", {
    variant_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Products",
            key: "product_id",
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    platformFeesPerUnit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1.00
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,   
    }
}, {
    timestamps: true
});

export default ProductVariants;