import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const Categories = sequelize.define("Categories", {
    category_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: "Categories",
            key: "category_id", 
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    }
}, {
    timestamps: true
});

export default Categories;