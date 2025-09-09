import React from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';
import { categories } from '../../constants/ProductCategories';
import { useNavigate } from 'react-router-dom';


 interface ModalProps {
  onClose: () => void;
 }

const Modal: React.FC<ModalProps> = ({onClose}: any) => {

  const navigate = useNavigate();

  const handleCategoryClick = (category: any) => {
    navigate(`/collections/category=${category.name}`);
    onClose();
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>What are you looking for?</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Subtitle */}
        <div className={styles.subtitle}>
          <p>Choose a category to explore our products</p>
        </div>

        {/* Categories List */}
        <div className={styles.categoriesContainer}>
          {categories.map((category: any) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={styles.categoryItem}
            >
              <div className={styles.categoryImage}>
                <img src={category.image} alt={category.name} />
              </div>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <span className={styles.categoryArrow}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;