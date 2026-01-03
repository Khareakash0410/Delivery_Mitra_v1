import { ShoppingCart } from 'lucide-react';
import styles from './ProductList.module.css';
import { useNavigate } from 'react-router-dom';


const ProductsList = ({products}:any) => {

  const navigate = useNavigate();

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className={styles.fullStar}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.halfStar}>★</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.emptyStar}>★</span>);
    }

    return stars;
  };

  return (   
      <div className={styles.productsGrid}>
        {products.map((product:any) => (
          <div key={product.id} className={styles.productCard} onClick={() => navigate("/product/" + [product.id])}>
            <div className={styles.imageContainer}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className={styles.productImage}
                loading="lazy"
              />
              <span className={styles.categoryTag}>{product.category}</span>
            </div>
            
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              
              <div className={styles.ratingContainer}>
                {renderRating(product.rating)}
                <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
              </div>
              
              <div className={styles.priceContainer}>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                )}
                <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
              </div>
              
              <button className={styles.addToCartBtn}>
                  <ShoppingCart size={14} />
                  Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ProductsList;