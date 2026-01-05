import { ShoppingCart } from 'lucide-react';
import styles from './ProductList.module.css';
import { useNavigate } from 'react-router-dom';

const ProductsList = ({products}:any) => {
  const navigate = useNavigate();

  return (
    <div className={styles.productsGrid}>
      {products.map((product:any) => (
        <div 
          key={product.id} 
          className={styles.productCard}
          onClick={() => navigate("/product/" + [product.id])}>
          <div className={styles.imageContainer}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={styles.productImage}
            />
            <div className={styles.categoryTag}>{product.category}</div>
            <div className={styles.ratingBadge}>
              <span>★</span>
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.priceRow}>
              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  ₹{product.price.toFixed(0)}
                </span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    ₹{product.originalPrice.toFixed(0)}
                  </span>
                )}
              </div>
              <button 
                className={styles.addToCartBtn}
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <ShoppingCart size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}    
    </div>
  );
};

export default ProductsList;