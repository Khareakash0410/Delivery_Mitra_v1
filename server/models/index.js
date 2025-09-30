import sequelize from "../database/database.js";
import Product from "./Products/Products.js";
import ProductImage from "./Products/ProductImages.js";
import User from "./Roles/Users.js";
import Address from "./Auth/Address.js";
import Cart from "./Cart/Cart.js";
import CartItem from "./Cart/CartItem.js";
import Order from "./Orders/Orders.js";
import OrderItem from "./Orders/OrderItems.js";
import DeliveryAgent from "./Roles/DeliveryAgentInfo.js";
import OTP from "./Auth/OTP.js";
import Vendor from "./Roles/VendorInfo.js";
import Categories from "./Products/Categories.js";






// Users <-> Seller 
User.hasOne(Vendor, { foreignKey: "user_id", as: "vendor" });
Vendor.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User <-> Delivery Agent
User.hasOne(DeliveryAgent, { foreignKey: "user_id", as: "deliveryAgent" });
DeliveryAgent.belongsTo(User, { foreignKey: "user_id", as: "user" });




// Product <-> Vendor
Vendor.hasMany(Product, { foreignKey: "seller_id", as: "products" });
Product.belongsTo(Vendor, { foreignKey: "seller_id", as: "seller" });

// Product <-> Categories
Categories.hasMany(Categories, { foreignKey: "parent_id", as: "subcategories" });
Categories.belongsTo(Categories, { foreignKey: "parent_id", as: "parent" });


//  Product <-> Category 
Categories.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Categories, { foreignKey: "category_id", as: "category" });


//  Product <-> Variants 
Product.hasMany(ProductVariant, { foreignKey: "product_id", as: "variants" });
ProductVariant.belongsTo(Product, { foreignKey: "product_id", as: "product" });


//  Variant <-> Images 
ProductVariant.hasMany(ProductImage, { foreignKey: "variant_id", as: "images" });
ProductImage.belongsTo(ProductVariant, { foreignKey: "variant_id", as: "variant" });




//  User <-> Order 
User.hasMany(Order, { foreignKey: "customer_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "customer_id", as: "customer" });

//  Vendor <-> Order 
Vendor.hasMany(Order, { foreignKey: "seller_id", as: "orders" });
Order.belongsTo(Vendor, { foreignKey: "seller_id", as: "seller" });

//  Order <-> OrderItem 
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

//  OrderItem <-> ProductVariant 
ProductVariant.hasMany(OrderItem, { foreignKey: "variant_id", as: "orderItems" });
OrderItem.belongsTo(ProductVariant, { foreignKey: "variant_id", as: "variant" });




// User <-> cart
User.hasOne(Cart, { foreignKey: "userId", as: "cart" });
Cart.belongsTo(User, { foreignkey: "userId", as: "user" });

// Cart <-> CartItem
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });

// CartItem <-> Product
Product.hasMany(CartItem, { foreignKey: "prductId", as: "cartItems" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });



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
    OTP
};