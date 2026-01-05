import React, { useState } from 'react';
import styles from './BestSellingProduct.module.css';
import ProductGrid from '../ProductGrid/ProductGrid';
import { products } from '../../constants/Products';

interface Category {
  id: string;
  name: string;
  active?: boolean;
}

const BestSellingProducts: React.FC = () => {
  
  const [activeCategory, setActiveCategory] = useState<string>('vegetables');

  const categories: Category[] = [
    { id: 'vegetables', name: 'Vegetables', active: true },
    { id: 'fresh-meat', name: 'Fresh Meat' },
    { id: 'bread', name: 'Bread' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'snacks', name: 'Snacks' },
  ];

  const filteredProducts = products?.filter(product => product?.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim());

  return (
    <section className={styles.container}>
      
      <div className={styles.header}>
          <h2 className={styles.title}>Best Selling Products</h2>
      </div>

      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryBtn} ${
              activeCategory === category.id ? styles.categoryActive : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <ProductGrid products={filteredProducts}/>

    </section>
  );
};

export default BestSellingProducts;