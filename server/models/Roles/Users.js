import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const Users = sequelize.define("Users", {
    user_id: {
        type: DataTypes.BIGINT,
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
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM("customer", "seller", "delivery_agent", "admin"),
        defaultValue: "customer",
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024122217"
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    indexes: [
       {
            unique: true,
            fields: ['user_id'],
            name: 'user_id_unique'
        },
        {
            unique: true,
            fields: ['phone'],
            name: 'user_phone_unique'
        }
    ],
    hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
   }
   }
);


// Compare Password
Users.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate JWT Token
Users.prototype.generateToken = function() {
  return jwt.sign(
    { id: this.user_id, phone: this.phone, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};


export default Users;