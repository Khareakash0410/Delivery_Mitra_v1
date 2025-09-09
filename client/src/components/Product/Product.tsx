import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Shield, Droplets, Leaf, Users, Plus, Minus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Product.module.css';
import ProductGrid from '../ProductGrid/ProductGrid';
import { products } from '../../constants/Products';
import ProductsList from '../ProductList/ProductList';
import { product, productImages } from '../../constants/Product';
import type { Feature } from '../../types/Product';



const ProductDetails: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('100ml');
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);


  const features: Feature[] = [
    { icon: <Shield className={styles.featureIcon} />, title: 'Safe &', description: 'Non-Toxic' },
    { icon: <Droplets className={styles.featureIcon} />, title: 'Dermatologist', description: 'Created' },
    { icon: <Leaf className={styles.featureIcon} />, title: 'Biodegradable', description: 'Ingredients' },
    { icon: <Users className={styles.featureIcon} />, title: 'Vegan &', description: 'Cruelty-free' }
  ];

  // Modal functions
  const openModal = (imageIndex: number) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToPreviousImage = () => {
    setModalImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
  };

  const goToNextImage = () => {
    setModalImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1);
  };

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextImage();
    } else if (isRightSwipe) {
      goToPreviousImage();
    }
  };

  const handleAddToCart = () => {
    
  };

  const handleBuyNow = () => {
   
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`${styles.star} ${
          index < Math.floor(rating) ? styles.starFilled : styles.starEmpty
        }`}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.productWrapper}>

        {/* Product */}
        <div className={styles.productGrid}>
          
          {/* Image Section */}
          <div className={styles.imageSection}>
            <div className={styles.mainImageContainer}>
              <img
                src={productImages[selectedImageIndex].src}
                alt={productImages[selectedImageIndex].alt}
                className={styles.mainImage}
                onClick={() => openModal(selectedImageIndex)}
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={styles.heartButton}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className={styles.thumbnailGrid}>
              {productImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`${styles.thumbnail} ${
                    selectedImageIndex === index ? styles.thumbnailActive : styles.thumbnailInactive
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className={styles.productInfo}>
            <div className={styles.badge}>BEST SELLER</div>
            
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.ratingContainer}>
              <div className={styles.starsContainer}>
                {renderStars(product.rating)}
              </div>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>${product.currentPrice.toFixed(2)}</span>
              <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
              <span className={styles.discount}>{product.discount}</span>
            </div>

            <p className={styles.description}>
              {product.description}
            </p>

            {/* Size Selection */}
            <div className={styles.sizeSection}>
              <label className={styles.sectionLabel}>Size:</label>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.sizeActive : styles.sizeInactive
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className={styles.quantitySection}>
              <label className={styles.sectionLabel}>Quantity:</label>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className={styles.quantityButton}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev + 1))}
                  className={styles.quantityButton}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  {feature.icon}
                  <div className={styles.featureTitle}>{feature.title}</div>
                  <div className={styles.featureDesc}>{feature.description}</div>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className={styles.shippingInfo}>
              <ShoppingCart className="w-4 h-4 text-green-600" />
              <span>{product.shippingInfo}</span>
            </div>

            {/* Desktop Action Buttons */}
            <div className={styles.actionSection}>
              <button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
              >
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                className={styles.buyNowButton}
              >
                BUY NOW
              </button>
            </div>

            {/* Product Details */}
            <div className={styles.detailsSection}>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={styles.detailsToggle}
              >
                View More Details {showDetails ? '−' : '+'}
              </button>
              {showDetails && (
                <div className={styles.detailsContent}>
                  {product.description}
                </div>
              )}
            </div>

          </div>
          
        </div>

        {/* Recommended */}
        <div className={styles.recommendedProducts}>
          <h2 className={styles.title}>Recommended Products</h2>
          <ProductGrid products={products}/>
        </div>

        {/* Explore */}
        <div className={styles.recommendedProducts}>
          <h2 className={styles.title}>Explore Products</h2>
          <ProductsList products={products}/>
        </div>

      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className={styles.modalCloseButton}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div
              className={styles.modalImageContainer}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={productImages[modalImageIndex].src}
                alt={productImages[modalImageIndex].alt}
                className={styles.modalImage}
              />
              
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className={`${styles.modalNavButton} ${styles.modalNavButtonLeft}`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={goToNextImage}
                    className={`${styles.modalNavButton} ${styles.modalNavButtonRight}`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {productImages.length > 1 && (
              <div className={styles.modalIndicators}>
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`${styles.modalIndicator} ${
                      modalImageIndex === index ? styles.modalIndicatorActive : styles.modalIndicatorInactive
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ProductDetails;