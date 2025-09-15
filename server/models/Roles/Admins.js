import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import jwt from "jsonwebtoken";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  euid: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024122217"
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'super_admin'),
    allowNull: false,
    defaultValue: 'admin'
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['euid'],
      name: 'admin_euid_unique'
    },
    {
      unique: true,
      fields: ['email'],
      name: 'admin_email_unique'
    }
  ],
  hooks: {
    beforeCreate: async (admin) => {
      if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    },
    beforeUpdate: async (admin) => {
      if (admin.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
      }
    }
  }
});


// Match Password
Admin.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate JWT Token
Admin.prototype.generateToken = function() {
  return jwt.sign(
    { id: this.id, email: this.email, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_MAX_EXPIRE,
    }
  );
};

export default Admin;