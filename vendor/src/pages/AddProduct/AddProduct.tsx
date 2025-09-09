import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import styles from './AddProduct.module.css';

interface ProductData {
  name: string;
  price: number;
  discountedPrice: number;
  platformFees: number;
  description: string;
  stockAvailable: boolean;
  category: string;
  options: string[];
  images: { url: string; altText: string }[];
}

const AddProduct: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    price: 0,
    discountedPrice: 0,
    platformFees: 1,
    description: '',
    stockAvailable: true,
    category: '',
    options: [],
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setProductData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (name === 'options') {
      // Handle comma-separated options
      const optionsArray = value.split(',').map(option => option.trim()).filter(option => option);
      setProductData(prev => ({
        ...prev,
        options: optionsArray
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    const newImage = {
      url: imageUrl,
      altText: `Product image ${productData.images.length + 1}`
    };

    setProductData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
  };

  const removeImage = (indexToRemove: number): void => {
    setProductData(prev => {
      // Clean up object URL
      const imageToRemove = prev.images[indexToRemove];
      if (imageToRemove?.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return {
        ...prev,
        images: prev.images.filter((_, index) => index !== indexToRemove)
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validate required fields
    if (!productData.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (productData.price <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    console.log('Adding product:', productData);
    alert('Product added successfully!');
    
    // Reset form
    setProductData({
      name: '',
      price: 0,
      discountedPrice: 0,
      platformFees: 1,
      description: '',
      stockAvailable: true,
      category: '',
      options: [],
      images: [],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin &gt; Products &gt; Add New</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.formGrid}>
          {/* Product Name */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Product Name *
            </label>
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
            <label className={styles.label} htmlFor="category">
              Category
            </label>
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
            <label className={styles.label} htmlFor="description">
              Description
            </label>
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
            <label className={styles.label} htmlFor="price">
              Price *
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={productData.price || ''}
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
            <label className={styles.label} htmlFor="discountedPrice">
              Discounted Price
            </label>
            <input
              id="discountedPrice"
              type="number"
              name="discountedPrice"
              value={productData.discountedPrice || ''}
              onChange={handleChange}
              className={styles.input}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          {/* Platform Fees */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="platformFees">
              Plateform Fees Per Unit Price
            </label>
            <input
              id="platformFees"
              type="number"
              name="platformFees"
              value={productData.platformFees || ''}
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
            <label className={styles.label} htmlFor="options">
              Options (comma-separated)
            </label>
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
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;