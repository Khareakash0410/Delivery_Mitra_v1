import { DataTypes } from "sequelize"
import sequelize from "../../database/database.js"

const ProductOptions = sequelize.define("ProductOptions", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    optionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    optionPrice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default ProductOptions;