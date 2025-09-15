import { Address, Admin, User, Vendor } from "../models/index.js";
import bcrypt from "bcrypt";
import { generateUniqueEmpId } from "../utils/employeeId.js";


export default class AdminService {

    static async login(email, password) {
        try {
            const admin = await Admin.findOne({
                where: {email},
                attributes: ["id", "email", "password", "name", "euid", "password", "role", "isActive"],
            });
 
            if(!admin) {
                return {status: 0, message: "Acount not found"}
            }
            const isPasswordMatch = await admin.matchPassword(password);
            if(!isPasswordMatch) {
                return {status: 0, message: "Invalid credentials"}
            }

            const token = admin.generateToken();
            const admindata = admin.get({plain: true});
            delete admindata.password;

            return {status: 1, message: "Login successful", data: {
                token, 
                admindata
            }};

        } catch (error) {
            return {status: 0, message: "Failed to login"}
        }
    }

    static async getProfile(id) {
        try {
            const admin = await Admin.findByPk(id, {
                attributes: {exclude: ["password"]}
            });

            if (!admin) {
               return {status: 0, message: "Admin not found"}  
            }
            return {status: 1, data: admin.get({plain: true})}
        } catch (error) {
            return {status: 0, message: "Failed to get profile"}
        }
    }

    static async updateProfile(id, updateData) {
        try {
            const admin = await Admin.findByPk(id);

            if(!admin) {
                return {status: 0, message: "Admin not found"}
            }

            const updates = ["name", "profilePic"];
            Object.keys(updateData).forEach(key => {
            if(updates.includes(key)) {
                admin[key] = updateData[key];
            }
            });

            await admin.save();

            return {status: 1, message: "Profile updated successful", data: admin};
        } catch (error) {
            return {status: 0, message: "Failed to update profile"}
        }
    }

    static async updatePassword(adminId, currentPassword, newPassword) {
        try {
            const admin = await Admin.findByPk(adminId);
            if(!admin) {
                return {status: 0, message: "Adminz not found"}
            }

            const isPasswordMatch = await vendor.matchPassword(currentPassword);
            if(!isPasswordMatch) {
                return {status: 0, message: "Current password incorrect"}
            } 

            const salt  = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(newPassword, salt);

            await admin.save();

            return {status: 1, message: "Password upadated successful"}
        } catch (error) {
            return {status: 0, message: "Password update failed"}
        }
    }

    static async addAdmin(email, password) {
        try {
            const existing = await Admin.findOne({where: {email}});
            if(existing) {
                return {status: 0, message: "Account already exist"}
            }
            const euid = generateUniqueEmpId();
            const salt  = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);

            const admin = await Admin.create({
              euid,
              email,
              password: newPassword,
            });

            if(!admin) {
                return {status: 0, message: "failed to add admin"}
            }
            return {status: 1, message: "Admin added successful"}
        } catch (error) {
            return {status: 0, message: "Add admin failed"}
        }
    }

    static async getAllAdmin (page = 1, limit = 10){
         const offset = (page - 1) * limit;
         try {
            const {count, rows: admins} = await Admin.findAndCountAll({
                attributes: ["id", "name", "email"],
                limit,
                offset,
                order:  [["createdAt", "DESC"]],
            })

            if(count === 0) {
                return {status: 0, message: "No admins found"}
            }

            return {status: 1, count, data: admins.map(admin => admin.get({plain: true}))};
         } catch (error) {
            return {status: 0, message: "Failed to fetch admins"}
         }
    }

    static async getAllVendor (page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        try {
            const {count, rows: vendors} = await Vendor.findAndCountAll({
                attributes: ["id", "phone", "shopname", "location"],
                limit,
                offset,
                order:  [["createdAt", "DESC"]],
            })

            if(count === 0) {
                return {status: 0, message: "No vendors found"}
            }

            return {status: 1, count, data: vendors.map(vendor => vendor.get({plain: true}))};
         } catch (error) {
            return {status: 0, message: "Failed to fetch vendors"}
         }
    }


    static async addVendor(email, password) {
        try {
        const exisitngVendor = await Vendor.findOne({where: {email}});
        if(exisitngVendor) {
            return {status: 0, message: "Account already exist"}
        }
        const salt  = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        const vendor = await Vendor.create({
            email,
            password: newPassword
        });
        if(!vendor) {
                return {status: 0, message: "failed to add vendor"}
        }
        return {status: 1, message: "Vendor added successful"}  
        } catch (error) {
            return {status: 0, message: "Add admin failed", error}
        }
    }
    
    static async getVendorById(vendorId) {
        try {
            const vendor = await Vendor.findByPk(vendorId, {
                attributes: {
                    exclude: ["password"]
                }
            });

            if(!vendor) {
                return {status: 0, message: "No vendor found"}
            }
            return {status: 1, message: "Vendor found", data: vendor.get({plain: true})};
        } catch (error) {
            return {status: 0, message: "Failed to fetch vendor"}
        }
    }

    static async getAllUser(page = 1, limit = 10) {
      const offset = (page - 1) * limit;
      try {
        const {count, rows:users} = await User.findAndCountAll({
            attributes: ["id", "name", "phone", "email"],
            include: [
                {
                model: Address,
                as: "addresses",
                separate: true,          
                limit: 1,                
                order: [["createdAt", "ASC"]]
                }
            ],
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });

        if(count === 0) {
            return {status: 0, message: "No users found"}
        }

        return {status: 1, count, data: users.map(user => user.get({plain: true}))}
      } catch (error) {
        return {status: 0, message: "Failed to fetch users"}
      }
    }

}