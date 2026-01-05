import React from 'react';
import styles from './CategoryProduct.module.css';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  itemCount: string;
  image: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Dairy',
    itemCount: '140+ Items',
    image: '🥛'
  },
  {
    id: '2',
    name: 'Stationery',
    itemCount: '140+ Items',
    image: '📚'
  },
  {
    id: '3',
    name: 'Agriculture',
    itemCount: '140+ Items',
    image: '🌾'
  },
  {
    id: '4',
    name: 'Fertilizers',
    itemCount: '140+ Items',
    image: '🧪'
  },
  {
    id: '5',
    name: 'Fashion',
    itemCount: '140+ Items',
    image: '👕'
  },
  {
    id: '6',
    name: 'Footwear',
    itemCount: '140+ Items',
    image: '👟'
  },
  {
    id: '7',
    name: 'Toys',
    itemCount: '140+ Items',
    image: '🧸'
  },
  {
    id: '8',
    name: 'Grocery',
    itemCount: '165+ Items',
    image: '🧺'
  },
  {
    id: '9',
    name: 'Electronics',
    itemCount: '140+ Items',
    image: '📱'
  },
  {
    id: '10',
    name: 'Pharmacy',
    itemCount: '35+ Items',
    image: '💊'
  },
  {
    id: '11',
    name: 'Vegetables',
    itemCount: '140+ Items',
    image: '🥬'
  },
  {
    id: '12',
    name: 'Personalcare',
    itemCount: '140+ Items',
    image: '🧴'
  },
  {
    id: '13',
    name: 'Household',
    itemCount: '85+ Items',
    image: '🏠'
  },
  {
    id: '14',
    name: 'Sweets',
    itemCount: '75+ Items',
    image: '🍬'
  }
];

const CategoryProduct: React.FC = () => {


  const navigate = useNavigate();

  return (
    <section className={styles.shopByCategory}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop By Category</h2>
          <button className={styles.seeAllBtn} onClick={() => navigate("/all-category")}>
            View All Categories
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowIcon}
            >
              <path 
                d="M6 12L10 8L6 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.categoriesWrapper}>
          <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <div key={category.id} className={styles.categoryCard} onClick={() => navigate("/collections/"+category.name.toLocaleLowerCase())}>
                <div className={styles.categoryImage}>
                  <span className={styles.emoji}>{category.image}</span>
                </div>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.itemCount}>{category.itemCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CategoryProduct;