import { DataTypes } from 'sequelize';
import sequelize from '../../database/database.js';

const OTP = sequelize.define('otp', {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 5 * 60 * 1000),
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default OTP;