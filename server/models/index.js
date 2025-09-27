import sequelize from "../database/database.js";
import Product from "./Products/Products.js";
import ProductImage from "./Products/ProductImages.js";
import Vendor from "./Roles/Vendors.js";
import User from "./Roles/Users.js";
import Address from "./Auth/Address.js";
import Cart from "./Cart/Cart.js";
import CartItem from "./Cart/CartItem.js";
import Order from "./Orders/Orders.js";
import OrderItem from "./Orders/OrderItems.js";
import DeliveryAgent from "./Roles/DeliveryAgents.js";
import OTP from "./Auth/OTP.js";
import Admin from "./Roles/Admins.js";


// Product <-> Vendor
Vendor.hasMany(Product, { foreignKey: "vendorId", as: "products" });
Product.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

// Product <-> ProductImage
Product.hasMany(ProductImage, { foreignKey: "productId", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "productId", as: "product" });

// User <-> Address
User.hasMany(Address, { foreignKey: "userId", as: "addresses" });
Address.belongsTo(User, { foreignkey: "userId", as: "user" });

// User <-> cart
User.hasOne(Cart, { foreignKey: "userId", as: "cart" });
Cart.belongsTo(User, { foreignkey: "userId", as: "user" });

// Cart <-> CartItem
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });

// CartItem <-> Product
Product.hasMany(CartItem, { foreignKey: "prductId", as: "cartItems" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// User <-> Order
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Order <-> OrderItem
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Vendor <-> OrderItems
Vendor.hasMany(OrderItem, { foreignKey: "vendorId", as: "orderItems" });
OrderItem.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

// Product <-> OrderItems
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// DeliveryAgent <-> Order
DeliveryAgent.hasMany(Order, { foreignKey: "deliveryAgentId", as: "assignedOrders" });
Order.belongsTo(DeliveryAgent, { foreignKey: "deliveryAgentId", as: "deliveryAgent" });

export {
    sequelize,
    Product,
    ProductImage,
    Vendor,
    Cart,
    CartItem,
    User,
    Address,
    Order,
    OrderItem,
    DeliveryAgent,
    OTP,
    Admin
};