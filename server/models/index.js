import sequelize from "../database/database.js";

import Users from "./Roles/Users.js";
import Vendors from "./Roles/Vendors.js";
import DeliveryAgents from "./Roles/DeliveryAgents.js";

import Categories from "./Products/Categories.js";
import Products from "./Products/Products.js";
import ProductImages from "./Products/ProductImages.js";
import ProductVariants from "./Products/ProductVariants.js";

import Orders from "./Orders/Orders.js";
import OrderItems from "./Orders/OrderItems.js";

import Carts from "./Cart/Carts.js";
import CartItems from "./Cart/CartItems.js";

import OTPs from "./Auth/OTPs.js";

import DeliveryAssignments from "./System/DeliveryAssignments.js";
import Payments from "./System/Payments.js";
import Notifications from "./System/Notifications.js";






// Users <-> Seller 
Users.hasOne(Vendors, { foreignKey: "user_id", as: "vendor" });
Vendors.belongsTo(Users, { foreignKey: "user_id", as: "user" });

// User <-> Delivery Agent
Users.hasOne(DeliveryAgents, { foreignKey: "user_id", as: "deliveryAgent" });
DeliveryAgents.belongsTo(Users, { foreignKey: "user_id", as: "user" });

// Delivery Agent <-> Delivery Assignment
DeliveryAgents.hasMany(DeliveryAssignments, { foreignKey: "delivery_agent_id", as: "deliveryAssignments" });
DeliveryAssignments.belongsTo(DeliveryAgents, { foreignKey: "delivery_agent_id", as: "deliveryAgent" });

// User <-> Notification
Users.hasMany(Notifications, { foreignKey: "user_id", as: "notifications" });
Notifications.belongsTo(Users, { foreignKey: "user_id", as: "user" });





// Product <-> Vendor
Vendors.hasMany(Products, { foreignKey: "seller_id", as: "products" });
Products.belongsTo(Vendors, { foreignKey: "seller_id", as: "seller" });

// Product <-> Categories
Categories.hasMany(Categories, { foreignKey: "parent_id", as: "subcategories" });
Categories.belongsTo(Categories, { foreignKey: "parent_id", as: "parent" });

//  Product <-> Category 
Categories.hasMany(Products, { foreignKey: "category_id", as: "products" });
Products.belongsTo(Categories, { foreignKey: "category_id", as: "category" });

//  Product <-> Variants 
Products.hasMany(ProductVariants, { foreignKey: "product_id", as: "variants" });
ProductVariants.belongsTo(Products, { foreignKey: "product_id", as: "product" });

//  Variant <-> Images 
ProductVariants.hasMany(ProductImages, { foreignKey: "variant_id", as: "images" });
ProductImages.belongsTo(ProductVariants, { foreignKey: "variant_id", as: "variant" });




//  User <-> Order 
Users.hasMany(Orders, { foreignKey: "customer_id", as: "orders" });
Orders.belongsTo(Users, { foreignKey: "customer_id", as: "customer" });

//  Vendor <-> Order 
Vendors.hasMany(Orders, { foreignKey: "seller_id", as: "orders" });
Orders.belongsTo(Vendors, { foreignKey: "seller_id", as: "seller" });

//  Order <-> OrderItem 
Orders.hasMany(OrderItems, { foreignKey: "order_id", as: "items" });
OrderItems.belongsTo(Orders, { foreignKey: "order_id", as: "order" });

//  OrderItem <-> ProductVariant 
ProductVariants.hasMany(OrderItems, { foreignKey: "variant_id", as: "orderItems" });
OrderItems.belongsTo(ProductVariants, { foreignKey: "variant_id", as: "variant" });

// Order <-> Delivery Assignment
Orders.hasMany(DeliveryAssignments, { foreignKey: "order_id", as: "deliveryAssignments" });
DeliveryAssignments.belongsTo(Orders, { foreignKey: "order_id", as: "order" });

// Order <-> Payments
Orders.hasOne(Payments, { foreignKey: "order_id", as: "payment" });
Payments.belongsTo(Orders, { foreignKey: "order_id", as: "order" });








// User <-> cart
Users.hasOne(Carts, { foreignKey: "userId", as: "cart" });
Carts.belongsTo(Users, { foreignkey: "userId", as: "user" });

// Cart <-> CartItem
Carts.hasMany(CartItems, { foreignKey: "cartId", as: "items" });
CartItems.belongsTo(Carts, { foreignKey: "cartId", as: "cart" });

// CartItem <-> Product
Products.hasMany(CartItems, { foreignKey: "prductId", as: "cartItems" });
CartItems.belongsTo(Products, { foreignKey: "productId", as: "product" });



  


export {
 sequelize,
 Products,
 ProductImages,
 Users,
 Carts,
 CartItems,
 Orders,
 OrderItems,
 DeliveryAgents,
 OTPs,
 Vendors,
 Categories,
 DeliveryAssignments,
 Payments,
 Notifications,
};