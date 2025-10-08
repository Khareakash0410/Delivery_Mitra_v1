import { Orders, OrderItems, Products, ProductImages, Vendors, Users, Categories } from "../models/index.js";
import bcrypt from "bcrypt";

export default class VendorService {

    static async login (email, password) {
        try {
            const vendor = await Users.findOne({
                where: {email, role: "seller"}
            });

            if (!vendor) {
                return {status: 0, message: "Invalid Credentials"}
            }

            const passMatch = await vendor.matchPassword(password);

            if (!passMatch) {
                return {status: 0, message: "Invalid Credentials"}
            }

            const vendorData = vendor.get({plain: true});
            delete vendorData.password;

            return {status: 1, message: "Login successfully", vendor};

        } catch (error) {
            return {status: 0, message: "Failed to login"}
        }
    }

    static async getVendorProfile (id) {
        try {
            const vendor = await Users.findByPk(id, {
            attributes: {
                exclude: ["password"]
            },
            include: [
                {
                model: Vendors,
                as: "vendor"
                }
            ]
            });

            if(!vendor) {
                return {status: 0, message: "Unable to access"}
            }

            return {status: 1, data: vendor.get({plain: true})}
        } catch (error) {
            return {status: 0, message: "failed to load profile"}
        }
    }

    static async updateVendorProfile (vendorId, updateData) {
        try {
          const vendor = await Users.findByPk(vendorId, {
            include: [{ model: Vendors, as: "vendor" }]
          });
          if (!vendor) {
            return {status: 0, message: "Vendor not found"}
          }      
          
          const allowedUpdates = ["shop_name", "gst_number", "shop_address", "account_number", "bank_name", "ifsc_code", "qrCode"];
          Object.keys(updateData).forEach(key => {
            if(allowedUpdates.includes(key)) {
                vendor.vendor[key] = updateData[key];
            }
          });

          if (updateData.profilePic) {
            vendor.profilePic = updateData.profilePic;
          }

          await vendor.save();
          await vendor.vendor.save();
          return {status: 1, data: vendor.get({plain: true})}
        } catch (error) {
          return {status: 0, message: "Failed to update"}
        }
    }

    static async updateVendorPassword(vendorId, currentPassword, newPassword) {
        try {
            const vendor = await Users.findByPk(vendorId);
            if(!vendor) {
                return {status: 0, message: "Vendor not found"}
            }

            const isPasswordMatch = await vendor.matchPassword(currentPassword);
            if(!isPasswordMatch) {
                return {status: 0, message: "Current password incorrect"}
            } 
            vendor.password = newPassword;
            await vendor.save();
            return {status: 1, message: "Password updated successful"}
        } catch (error) {
            return {status: 0, message: "Password update failed"}
        }
    }

    static async updateStoreStatus(vendorId, status) {
        try {
           const vendor = await Users.findByPk(vendorId, 
            {
            include: [{ model: Vendors, as: "vendor" }]
            }
           );
           if(!vendor) {
            return {status: 0, message: "Vendor not found"}
           }
           if (vendor.vendor.is_active === true) {
              vendor.vendor.is_active = false;
           } else {
            vendor.vendor.is_active = true;
           }
           await vendor.vendor.save();
           return {status: 1, message: "Store Status Updated", data: vendor.get({plain: true})}
        } catch (error) {
           return {status: 0, message: "Failed to update status"}
        }
    }

    static async getAllCategory () {
        try {
            const categories = await Categories.findAll({
            where: { parent_id: null }, 
            include: [
                {
                model: Categories,
                as: "subcategories",
                }
            ],
            order: [
                ["name", "ASC"],
                [{ model: Categories, as: "subcategories" }, "name", "ASC"]
            ]
            });

            return {status: 1, message: "All Categories", data: categories}
        } catch (error) {
            return {status: 0, message: "Failed to fetch category"}
        }
    }

    static async addProduct(vendorId, name, category, description, price, platformFeesPerUnit, stocks, variant, images) {
        try {
            const exisitngProduct = await Product.findOne({
                where: {name, variant, vendorId}
            });

            if(exisitngProduct) {
                return {status: 0, message: "You have already added this product"}
            }
        
            const product = await Product.create({
                name, category, description, variant, price, platformFeesPerUnit, stocks, vendorId
            });

            if (images && images.length > 0) {
                await ProductImage.bulkCreate(images.map(img => ({
                    imageUrl: img,
                    productId: product.id
                })));
            }

            if(!product) {
                return {status: 0, message: "Failed to add product"}
            }

            return {status: 1, message: "Product added successfully", data: product.get({plain: true})}

        } catch (error) {
            return {status: 0, message: "Failed to add product"}
        }
    }

    static async getAllVendorProduct (page = 1, limit = 10, vendorId) {
        const offset = (page - 1) * limit;
        try {
            const {count, rows: products} = await Product.findAndCountAll({
                where: {vendorId},
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });

            if (count === 0 || !products) {
                return {status: 0, message: "No product found"}
            }

            return {
                status: 1,
                count, 
                products: products.map(product => product.get({plain: true}))
            };
        } catch (error) {
            return {status: 0, message: "Failed to fetch products"}
        }

    }

    static async getProductById (id) {
        try {
            const product = await Product.findByPk(id, {
               include: [
                 { model: ProductImage, as: "images" },
               ]
            });

            if (!product) {
                return {status: 0, message: "Product not found"}
            }

            return {status: 1, data: product.get({plain : true})};
        } catch (error) {
            return {status: 0, message: "Failed to fetch product"}
        }
    }

    static async updateProductById (id, updateData) {
        try {
            const product = await Product.findByPk(id);

            if(!product) {
                return {status: 0, message: "Product not found"}
            }

            await product.update({description: updateData.description, price: updateData.price, platformFeesPerUnit: updateData.platformFeesPerUnit, stocks: updateData.stocks});

            if(updateData.images) {
              await ProductImage.bulkCreate(images.map(img => ({ imageUrl: img, productId: product.id })));
            }

            return {sttaus: 1, message: "Product update successful", data: product.get({plain : true})};
        } catch (error) {
            return {status: 0, message: "failed to update product"};
        }
    }

    static async deleteProductById (id) {
        try {
           const product = await Product.findByPk(id);
           if(!product) {
            return {sttaus: 0, message: "Product already deleted"}
           } 
           await ProductImage.destroy({ where: { productId: product.id } });
           await product.destroy();
           return {status: 1, message: "Product deleted successful"}

        } catch (error) {
            return {status: 0, message: "Failed to delete product"}
        }
    }

    static async getAllOrders(page = 1, limit = 10, id) {
      const offset = (page - 1) * limit;
      try {
        const {count, rows: orders} = await Order.findAndCountAll({
            attributes: ["id", "createdAt"],
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    attributes: [],
                    where: {vendorId: id},
                }
            ],
            group: ["Order.id"],
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        });

        if (count === 0 || !orders) {
            return {status: 0, message: "No order found"}
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

    static async getOrderById (orderId, vendorId) {
        try {
            const order = await Order.findOne({
                attributes: ["id", "createdAt", "status"],
                where: {id: orderId},
                include: [
                    {
                        model: OrderItem,
                        as: "items",
                        attributes: ["quantity", "itemOption"],
                        where: { vendorId },
                        include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: ["name", "category"],
                        }
                        ]
                    }
                ]
            });

            if(!order) {
                return {status: 0, message: "Order expired"}
            }

            return {status: 1, data: order.get({plain: true})};
        } catch (error) {
            return {status: 0, message: "Failed to fetch order"}
        }
    }

    static async updateOrderItemsStatus (vendorId, orderId, status) {
      try {
        const [updatedCount] = await OrderItem.update(
            { status },
            { where: { orderId, vendorId } }
        );

        if(updatedCount === 0) {
            return {status: 0, message: "No order items found for this seller in this order"}
        }

        if (status === "Accepted") {
        const updatedItems = await OrderItem.findAll({
        where: { orderId, vendorId },
        attributes: ["id", "quantity", "itemOption", "itemPrice"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "category", "platformFeesPerUnit"],
          },
        ],
        });

        return {status: 1, message: "Order accepted successfully", data: updatedItems}
        }

        return {status: 1, message: "Order rejected successfully"};
      } catch (error) {
       return {status: 0, message: "Failed to update status"} 
      }
    }

    static async dispatchOrderItems(orderId, vendorId) {
        try {
        const [updatedCount] = await OrderItem.update(
            { status: "Dispatched" },
            { where: { orderId, vendorId } }
        );

        if(updatedCount === 0) {
            return {status: 0, message: "No order items found for this seller in this order"}
        }   

        return {status: 1, message: "You have dispatched order"};
        } catch (error) {
           return {status: 0, message: "Failed to diapatched order"} 
        }
    }

}