import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const ProductImage = sequelize.define("ProductImage", {
    image_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    variant_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "ProductVariant",
            key: "variant_id",
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default ProductImage;