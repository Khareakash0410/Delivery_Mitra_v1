import { DeliveryAgent, Order, OrderItem, Product, User } from "../models/index.js";

export default class DeliveryAgentService {

    static async login(email, password) {
      try {
        const agent = await DeliveryAgent.findOne({
            where: {email},
            attributes: ["id", "name", "phone", "profilePic", "status", "email", "password"],
        });
        if(!agent) {
            return {status: 0, message: "Incalid credentials"}
        }

        const isPasswordMatch = await agent.matchPassword(password);
        if(!isPasswordMatch) {
            return {status: 0, message: "Invalid credentials"}
        }

        const token = await agent.generateToken();
        const agentdata = agent.get({plain: true});
        delete agentdata.password;

        return {status: 1, message: "Login successful", data: {
                token, 
                agentdata
        }};
      } catch (error) {
        return {status: 0, message: "Failed to login"}
      }
    }

    static async getProfile (id) {
        try {
            const agent = await DeliveryAgent.findByPk(id, {
                attributes: {
                    exclude: ["password"]
                }
            });

            if(!agent) {
                return {status: 0, message: "Unable to access"}
            }
            return {status: 1, data: agent.get({plain: true})}
        } catch (error) {
            return {status: 0, message: "failed to load profile"} 
        }
    }

    static async updateProfile (id, updateData) {
         try {
          const agent = await DeliveryAgent.findByPk(id);
          if (!agent) {
            return {status: 0, message: "Delivery Agent not found"}
          }       
          
          const allowedUpdates = ["name", "phone", "vehicleNumber", "profilePic", "account_number", "bank_name", "ifsc_code", "qrCode"];
          Object.keys(updateData).forEach(key => {
            if(allowedUpdates.includes(key)) {
                agent[key] = updateData[key];
            }
          });

          await agent.save();
          return {status: 1, data: agent.get({plain: true})}
        } catch (error) {
          return {status: 0, message: "Failed to update"}
        }
    }

    static async updatePassword(id, currentPassword, newPassword) {
         try {
            const agent = await DeliveryAgent.findByPk(id);
            if(!agent) {
                return {status: 0, message: "Agent not found"}
            }

            const isPasswordMatch = await DeliveryAgent.matchPassword(currentPassword);
            if(!isPasswordMatch) {
                return {status: 0, message: "Current password incorrect"}
            } 

            const salt  = await bcrypt.genSalt(10);
            agent.password = await bcrypt.hash(newPassword, salt);

            await agent.save();

            return {status: 1, message: "Password upadated successful"}
        } catch (error) {
            return {status: 0, message: "Password update failed"}
        }
    }

    static async updateStatus (id, statusValue) {
         try {
           const agent = await DeliveryAgent.findByPk(id);
           if(!agent) {
            return {status: 0, message: "Agent not found"}
           }
           agent.status = statusValue;
           await agent.save();
           return {status: 1, message: "Status Updated", data: agent.get({plain: true})}
        } catch (error) {
           return {status: 0, message: "Failed to update status"}
        }
    }



    static async getActiveOrders (page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        try {
            const {count, rows:orders} = await Order.findAndCountAll({
                where: {
                    deliveryAgentId: null,
                    status: ["Accepted", "Partially Accepted"],
                },
                attributes: ["id", "addressLine1", "city", "pincode", ],
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });

            if (count === 0 || !orders) {
                return {status: 0, message: "No active orders found"}
            }

            return {
                status: 1,
                count, 
                orders: orders.map(order => order.get({plain: true}))
            };
        } catch (error) {
            return {status: 0, message: "Failed to fetch orders"}
        }
    }

    static async getSingleOrder (id, agentId) {
        try {
            const order = await Order.findByPk(id, {
                attributes: [
                    "id",
                    "createdAt",
                    "status",
                    "paymentMethod",
                    "paymentStatus",
                    "totalAmount",
                    "deliveryFees",
                    "addressLine1",
                    "city",
                    "pincode"
                ],
                include: [
                    {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "phone"],
                    },
                    {
                    model: OrderItem,
                    as: "items",
                    where: { status: "Accepted" },
                    required: false,                
                    attributes: [
                        "id",
                        "quantity",
                        "itemOption",
                    ],
                    include: [
                        {
                        model: Product,
                        as: "product",
                        attributes: ["name", "category"],
                        },
                        {
                        model: Vendor,
                        as: "vendor",
                        attributes: ["name", "phone", "email"],
                        },
                    ],
                    },
                ]
            });

            if(!order) {
                return {status: 0, message: "Order is expired"}
            }

            order.deliveryAgentId = agentId;

            await order.save();

            return {status: 1, message: "Order accepted", data: order.get({plain: true})};
        } catch (error) {
            return {status: 0, message: "Failed to fetch order"}
        }
    }
};