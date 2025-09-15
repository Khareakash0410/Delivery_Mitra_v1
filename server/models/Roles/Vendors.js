import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Vendor = sequelize.define("Vendors", {

    //Auth
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      isEmail: true
    }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            is: {
                args: /^[6-9][0-9]{9}$/,
                msg: 'Phone number is not valid',
            },
        },
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024122217"
    },

    //Shop
    shopname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
    },

    //Bank
    account_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: "account_number_unique_constraint",
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ifsc_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    qrCode: {
        type: DataTypes.STRING,
    },

    //Status
    status: {
        type: DataTypes.ENUM("Online", "Offline"),
        defaultValue: "Offline",
    }

}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['id'],
            name: 'vendor_id_unique'
        },
        {
            unique: true,
            fields: ['email'],
            name: 'vendor_email_unique'
        }
    ],
    hooks: {
    beforeCreate: async (vendor) => {
      if (vendor.password) {
        const salt = await bcrypt.genSalt(10);
        vendor.password = await bcrypt.hash(vendor.password, salt);
      }
    },
    beforeUpdate: async (vendor) => {
      if (vendor.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        vendor.password = await bcrypt.hash(vendor.password, salt);
      }
    }
    }
});

// Compare password
Vendor.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
Vendor.prototype.generateToken = function() {
  return jwt.sign(
    { id: this.id, email: this.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_MAX_EXPIRE,
    }
  );
};


export default Vendor;