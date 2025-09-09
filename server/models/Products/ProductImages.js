import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const ProductImage = sequelize.define("ProductImage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default ProductImage;