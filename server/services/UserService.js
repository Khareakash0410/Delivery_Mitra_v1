import { Op } from "sequelize";
import { Address, User, OTP, Order, OrderItem, Product, ProductImage, ProductOptions } from "../models/index.js";
import { sendToken } from "../utils/sendToken.js";

export default class UserService {

    static async getUserByPhone (phone) {
        return await User.findOne({
            where: { phone },
            include: [
                {
                model: Address,
                as: "addresses",  
                attributes: ["id", "addressLine1", "city","pincode"],
                }
            ]
        })
    }

    static async getUserById(id) {
        const user = await User.findByPk(id, {
            include: [
                {
                model: Address,
                as: "addresses",  
                attributes: ["id", "addressLine1", "city","pincode"],
                }
            ]
        });

        if (!user) {
            return null
        }

        return user.get({plain: true});
    }

    static async getUserOrders (id) {
        const userOrders = await User.findByPk(id, {
          include: [
            {
            model: Order,
            as: "orders",
            attributes: [
                "id",
                "addressLine1",
                "city",
                "pincode",
                "totalAmount",
                "status",
                "paidAt",
                "deliveredAt",
            ],
            include: [
                {
                model: OrderItem,
                as: "items",
                attributes: [
                    "id",
                    "quantity",
                    "itemPrice",
                    "itemOption",
                    "status",
                ],
                include: [
                    {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name", "price"],
                    include: [
                        {
                        model: ProductImage,
                        as: "images",
                        attributes: ["id", "url"],
                        },
                        {
                        model: ProductOptions,
                        as: "options",
                        attributes: ["id", "name", "value"],
                        },
                    ],
                    },
                ],
                },
              ],
            }
          ],
        });

        if (!userOrders) {
            return null;
        }

        return userOrders.get({plain: true});
    }

    static async regiserUser(phone) {
        try {

            const existingUser = await User.findOne({
                where: { phone },
                include: [
                    {
                    model: Address,
                    as: "addresses",  
                    attributes: ["id", "addressLine1", "city","pincode"],
                    },
                ],
            });

            if (existingUser){
                return { status: 0, message: 'User already exists with this phone number' }
            } 

            // Generate OTP---
            const otp = 987654;
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            await OTP.upsert({
                phone,
                otp,
                expiresAt: otpExpiry
            });

            return { status: 1, message: `OTP sent successfully to ${phone}` }
        } catch (error) {
            return { status: 0, message: error.message };
        }
    }

    static async verifyOtp(name, phone, otp, utm_source, utm_medium, utm_campaign, res) {
        const validOtp = await OTP.findOne({
            where: {
                otp,
                phone,
                name,
                isUsed: false,
                expiresAt: {
                    [Op.gt]: new Date()
                }
            }
        });

        if (!validOtp) {
            return { status: 0, message: "Invalid or Expired OTP" };
        }

        try {
            const user = await User.create({
                name, 
                phone,
                isVerified: true,
                utmSource: utm_source,
                utmMedium: utm_medium,
                utmCampaign: utm_campaign
            });
            
            validOtp.isUsed = true;
            await validOtp.save();

            return { status: 1, message: "OTP verified successfully", data: user.get({plain: true}) }; 
        } catch (error) {
            return { status: 0, message: error.message }; 
        }

    }

    static async loginRequest(phone) {
        try {
            const user = await this.getUserByPhone(phone);
            if (!user) {
              return { status: 0, message: "Account not found"}
            }

            const otp = 987654;
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
            await OTP.create({
                phone,
                otp,
                expiresAt: otpExpiry,
            });

            return { status: 1, message: `OTP sent successfully to ${phone}` };

        } catch (error) {
             return { status: 0, message: error.message };

        }
    }

    static async verifyLoginOtp (phone, otp, utm_source, utm_medium, utm_campaign, res) {
        try {
            const validOtp = await OTP.findOne({
                where: {
                    phone, 
                    otp,
                    isUsed: false,
                    expiresAt: {[Op.gt]: new Date()}
                }
            });

            if (!validOtp) {
                return { status: 0, message: "Invalid or Expired OTP"}
            }

            let user = await this.getUserByPhone(phone);

            if(!user) {
                return {status: 0, message: "Account terminated or not found"}
            }

            validOtp.isUsed = true;
            await validOtp.save();

            await user.update({
                utmSource: utm_source || user.utmSource,
                utmCampaign: utm_campaign || user.utmCampaign,
                utmMedium: utm_medium || user.utmMedium
            });

            return {status: 1, message: "Login successfully", data: user.get({plain: true})};
        } catch (error) {
            return {status: 0, message: error.message};
        }
    }

    static async updateUserProfile(userId, updateData) {
        const allowedFields = ["name", "emailId", "profilePic"];

        const updatePayload = {};

        try {
            for (const field of allowedFields) {
                if (updateData[field] !== undefined) {
                    updatePayload[field] = updateData[field];
                }
            }
            const [updateCount] = await User.update(updatePayload, {
                where: {id: userId}
            });

            if (updateCount === 0) {
                return {status: 0, message: "Failed to update profile"}
            } 

            return await this.getUserById(userId);

        } catch (error) {
               return {status: 0, message: "Failed to update profile"} 
        }

    }

};