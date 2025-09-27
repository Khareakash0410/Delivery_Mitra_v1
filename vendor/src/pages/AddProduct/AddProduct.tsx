import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import styles from './AddProduct.module.css';
import { categoryOptions } from '../../types/ProductCategory';
import { uploadImage } from '../../utils/ImageUploader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';
import usePostApi from '../../api/usePostApi';
import apiEndpoints from '../../api/Config';

interface ProductData {
  name: string;
  price: number;
  discountedPrice: number;
  platformFees: number;
  description: string;
  stockAvailable: boolean;
  category: string;
  variant: string;
  images: string[];
}

const AddProduct: React.FC = () => {
  const {user, isAuthenticated} = useSelector((state: RootState) => state.user);

  const [productData, setProductData] = useState<ProductData>({
    name: '',
    price: 0,
    discountedPrice: 0,
    platformFees: 1,
    description: '',
    stockAvailable: true,
    category: '',
    variant: '',
    images: [],
  });

  const {data, loading, error, setEnabled} = usePostApi(`${apiEndpoints.PRODUCT.ADD}`, productData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;  
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setProductData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } 
    else {
      setProductData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await uploadImage(file);
    toast.success(data?.message);

    setProductData(prev => ({
      ...prev, images: [...prev.images, data?.imageUrl]
    }));
  };

  const removeImage = (indexToRemove: number): void => {
    setProductData(prev => {
    return {
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    };
    });
  };

  const resetForm = () => {
    setProductData({
      name: '',
      price: 0,
      discountedPrice: 0,
      platformFees: 1,
      description: '',
      stockAvailable: true,
      category: '',
      variant: '',
      images: [],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setEnabled(true);
  };

  useEffect(() => {
   if (data) {
    toast.success(data?.message);
    setEnabled(false);
    resetForm();
   }
   if (error) {
    toast.error(error?.message);
    setEnabled(false);
   }
  }, [data, error]);

  if (!user || !isAuthenticated) {
    return <Navigate to={"/login"}/>
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
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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

          {/* Platform Fees */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="platformFees">
              Platform Fees Per Unit Price
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
              Options
            </label>
            <input
              id="variant"
              type="text"
              name="variant"
              value={productData.variant}
              onChange={handleChange}
              className={styles.input}
              placeholder="like Kg, Litre, Size, etc."
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
                    src={image} 
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
            {loading ? "Adding" : "Add Product"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;