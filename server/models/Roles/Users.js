import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import jwt from "jsonwebtoken";

const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: 'phone_unique_constraint',
        validate: {
            is: {
                args: /^[6-9][0-9]{9}$/,
                msg: 'Phone number is not valid',
            },
        },
    },
    email: {
        type: DataTypes.STRING(40),
        validate: {
        isEmail: true
        }
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024122217"
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    utmCampaign: DataTypes.STRING,
    utmSource: DataTypes.STRING,
    utmMedium: DataTypes.STRING,
}, {
    timestamps: true,
    indexes: [
       {
            unique: true,
            fields: ['id'],
            name: 'user_id_unique'
        },
        {
            unique: true,
            fields: ['phone'],
            name: 'user_phone_unique'
        }
    ]
   }
);

// Generate JWT Token
Users.prototype.generateToken = function() {
  return jwt.sign(
    { id: this.id, phone: this.phone },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};


export default Users;