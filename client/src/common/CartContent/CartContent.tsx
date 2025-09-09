import React from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
// import { useDispatch } from 'react-redux';
import styles from './CartContent.module.css';

// interface CartProduct {
//   productId: string;
//   name: string;
//   image: string;
//   size: string;
//   color: string;
//   quantity: number;
//   price: number;
// }

// interface Cart {
//   products: CartProduct[];
// }

// interface CartContentProps {
//   cart: Cart;
//   userId?: string;
//   guestId?: string;
// }

const CartContent: React.FC = () => {
//   const dispatch = useDispatch();

  // handle add and remove to cart
//   const handleAddToCart = (productId: string, delta: number, quantity: number, size: string, color: string) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 0) {
//       dispatch(updateCartItemQuantity({
//         productId,
//         quantity: newQuantity,
//         guestId,
//         userId,
//         size,
//         color
//       }));
//     }
//   };

//   const handleRemoveFromCart = (productId: string, size: string, color: string) => {
//     dispatch(removeFromCart({
//       productId,
//       size,
//       color,
//       guestId,
//       userId
//     }));
//   };

  return (
    <div className={styles.container}>
      {/* {cart.products.map((ele, index) => ( */}
        <div key={""} className={styles.cartItem}>
          <div className={styles.productInfo}>
            <img 
              className={styles.productImage} 
              src={"/Product.jpg"} 
              alt={"name"} 
            />
            <div className={styles.productDetails}>
              <h3 className={styles.productName}>
                Cheese Pizza
              </h3>
              <p className={styles.productVariant}>
                type: food | category: pizza
              </p>
              <div className={styles.quantityControls}>
                <button 
                //   onClick={() => handleAddToCart(ele.productId, -1, ele.quantity, ele.size, ele.color)} 
                  className={styles.quantityBtn}
                >
                  -
                </button>
                <span className={styles.quantity}>
                  1
                </span>
                <button  
                //   onClick={() => handleAddToCart(ele.productId, 1, ele.quantity, ele.size, ele.color)}  
                  className={styles.quantityBtn}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className={styles.priceSection}>
            <p className={styles.price}>
              {/* ₹{ele.price.toLocaleString()} */}$100
            </p>
            <button 
            //    onClick={() => handleRemoveFromCart(ele.productId, ele.size, ele.color)}
              className={styles.deleteBtn}
            >
              <RiDeleteBin3Line className={styles.deleteIcon} />
            </button>
          </div>
        </div>
      {/* ))} */}
    </div>
  );
};

export default CartContent;