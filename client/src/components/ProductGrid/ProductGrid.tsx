import type { JSX } from 'react';
import styles from './ProductGrid.module.css';
import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ProductGrid = ({products}:any) => {

  const navigate = useNavigate();

  const formatPrice = (price: number): string => {
    return `₹${price.toFixed(2)}/kg`;
  };

  const renderStars = (rating: number): JSX.Element => {
    return (
      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${styles.star} ${star <= rating ? styles.starFilled : ''}`}
            size={12}
          />
        ))}
      </div>
    );
  };


  return (
      <div className={styles.productsWrapper}>
        <div className={styles.productsContainer}>
          {products?.map((product:any) => (
            <div key={product.id} className={styles.productCard} onClick={() => navigate("/product/" + product.id)}>
              <div className={styles.productImage}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                
                <div className={styles.ratingContainer}>
                  {renderStars(product.rating)}
                  <span className={styles.reviewCount}>{product.reviews}</span>
                </div>
                
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <button className={styles.addToCartBtn}>
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ProductGrid