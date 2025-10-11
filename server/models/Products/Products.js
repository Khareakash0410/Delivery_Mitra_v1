import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Products = sequelize.define("Product", {

    product_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    seller_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Vendors",
            key: "seller_id",
        }
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Categories",
            key: "category_id",
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

}, {
    timestamps: true,
    indexes: [
       {
            unique: true,
            fields: ['product_id'],
            name: 'product_id_unique'
        },
        {
            unique: true,
            fields: ['name'],
            name: 'name_unique'
        }
    ],
});


export default Products;