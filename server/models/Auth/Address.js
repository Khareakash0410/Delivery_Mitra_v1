import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import Users from "../Roles/Users.js";

const Address = sequelize.define("Address", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
    addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
            is: {
                args: /^[1-9][0-9]{5}$/,
                msg: 'Pincode is not valid',
            }
        }
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Address;