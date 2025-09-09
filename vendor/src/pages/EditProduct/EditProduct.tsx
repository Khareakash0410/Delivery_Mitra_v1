import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import styles from './EditProduct.module.css';
import type { ProductData } from '../../constant/Singleproduct';


const EditProductPage: React.FC = () => {
  
  const [productData, setProductData] = useState<ProductData>({
    name: "Mask",
    price: 10,
    discountedPrice: 8,
    platformfees: 2,
    description: "This is mask",
    stockAvailable: true,
    category: "Wear",
    options: ["S", "M", "L"],
    images: [{url: "/Login.jpg", altText: "Prducyt"}],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setProductData({
        ...productData,
        [name]: checkbox.checked
      });
    } 
    else {
      setProductData({
        ...productData,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const removeImage = (indexToRemove: number): void => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin &gt; Products &gt; Edit</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>


        <div className={styles.formGrid}>
          {/* Product Name */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Product Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter category name"
            />
          </div>

          {/* Description */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={4}
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="price">Price *</label>
            <input
              id="price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className={styles.input}
              min="0"
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>

          {/* Discounted Price */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="discountedPrice">Discounted Price</label>
            <input
              id="discountedPrice"
              type="number"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              className={styles.input}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          {/* Platform Fees Per Unit */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="discountedPrice">Platform Fees Per Unit</label>
            <input
              id="platformFees"
              type="number"
              name="platformFees"
              value={productData.platformfees}
              onChange={handleChange}
              className={styles.input}
              min="1"
              step="0.01"
              placeholder="1.00"
            />
          </div>

          {/* Stock Available */}
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="stockAvailable"
                checked={productData.stockAvailable}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Stock Available</span>
            </label>
          </div>

          {/* Options */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="options">Options (comma-separated)</label>
            <input
              id="options"
              type="text"
              name="options"
              value={productData.options.join(', ')}
              onChange={handleChange}
              className={styles.input}
              placeholder="S, M, L, XL"
            />
          </div>

        </div>

        {/* Image Upload */}
        <div className={styles.imageSection}>
          <label className={styles.label}>Product Images</label>
          <div className={styles.imageUploadContainer}>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className={styles.fileInput}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className={styles.fileInputLabel}>
                  <Upload className={styles.uploadIcon} />
                  Choose Image
            </label>
          </div>

          {productData.images.length > 0 && (
            <div className={styles.imagePreview}>
              {productData.images.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img 
                    src={image.url} 
                    alt={`Product ${index + 1}`} 
                    className={styles.image}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className={styles.removeImageButton}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submitButton}
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;