import React from 'react';
import { IoMdClose } from "react-icons/io";
import styles from './CartDrawer.module.css';
import CartContent from '../../common/CartContent/CartContent';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  cartDrawerOpen: boolean;
  toggleCart: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cartDrawerOpen, toggleCart }) => {

  const navigate = useNavigate();

  const handleCheckout = (): void => {
    navigate("/order/details");
    toggleCart();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {cartDrawerOpen && (
        <div 
          className={styles.backdrop}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Cart Drawer */}
      <div 
        className={`${styles.drawer} ${cartDrawerOpen ? styles.drawerOpen : styles.drawerClosed}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header with Close Button */}

        {/* Cart Content Area */}
        <div className={styles.contentArea}>

        <div className={styles.header}>
          <h2 className={styles.title}>
            Your Cart
          </h2>

          <button 
            onClick={toggleCart}
            className={styles.closeButton}
            aria-label="Close cart"
            type="button"
          >
            <IoMdClose className={styles.closeIcon} />
          </button>
        </div>


          
          {/* Cart Items */}
          <div className={styles.cartItems}>
              <CartContent 
                // cart={cart} 
                // userId={userId} 
                // guestId={guestId} 
              />
            {/* ) : ( */}
              {/* <div className={styles.emptyCart}>
                <p className={styles.emptyText}>
                  Your cart is empty.
                </p>
              </div> */}
             {/* )} */}
          </div>
        </div>

        {/* Checkout Footer */}
        {/* {cart && cart?.products?.length > 0 && ( */}
          <div className={styles.footer}>
            <button 
              onClick={handleCheckout} 
              className={styles.checkoutButton}
              type="button"
            >
              Checkout
            </button>
            <p className={styles.disclaimerText}>
              Shipping, taxes and discount codes calculated at checkout.
            </p>
          </div>
        {/* )} */}
      </div>
    </>
  );
};

export default CartDrawer;