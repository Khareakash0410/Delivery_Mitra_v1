import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

const DeliveryAgents = sequelize.define("DeliveryAgents", {
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
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
        isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(50),
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
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024122217"
    },

    //Bank
    account_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    bank_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ifsc_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    qrCode: {
        type: DataTypes.STRING,
        defaultValue: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024122217"
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
            name: 'deliveryAgent_id_unique'
        },
        {
            unique: true,
            fields: ['phone'],
            name: 'deliveryAgent_phone_unique'
        }
    ]
   }
);


// Compare password
DeliveryAgents.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate JWT Token
DeliveryAgents.prototype.generateToken = function() {
  return jwt.sign(
    { id: this.id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_MAX_EXPIRE,
    }
  );
};

export default DeliveryAgents;