import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './AllCategories.module.css';

interface SubCategory {
  id: string;
  name: string;
  image: string;
  badge?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subCategories: SubCategory[];
}

const CategoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('fashion');

  const categories: Category[] = [
    {
      id: 'fashion',
      name: 'Fashion',
      icon: '👕',
      color: '#E0E7FF',
      subCategories: [
        { id: 'men-clothing', name: "Men's Clothing", image: '🧥', badge: 'Sale is live' },
        { id: 'women-clothing', name: "Women's Clothing", image: '👗', badge: 'Trendy Attire' },
        { id: 'kids-wear', name: "Kids' Wear", image: '👶', badge: 'New Collection' },
        { id: 'ethnic-wear', name: 'Ethnic Wear', image: '🥻', badge: 'Festival Special' },
        { id: 'winter-wear', name: 'Winter Wear', image: '🧣' },
        { id: 'casual-wear', name: 'Casual Wear', image: '👔' },
        { id: 'sports-wear', name: 'Sports Wear', image: '🏃' },
      ]
    },
    {
      id: 'appliances',
      name: 'Appliances',
      icon: '🔌',
      color: '#FEF3C7',
      subCategories: [
        { id: 'kitchen', name: 'Kitchen Appliances', image: '🍳' },
        { id: 'home', name: 'Home Appliances', image: '🏠' },
        { id: 'personal-care', name: 'Personal Care', image: '💆' },
        { id: 'washing', name: 'Washing Machines', image: '🧺' },
      ]
    },
    {
      id: 'mobiles',
      name: 'Mobiles',
      icon: '📱',
      color: '#DBEAFE',
      subCategories: [
        { id: 'smartphones', name: 'Smartphones', image: '📱' },
        { id: 'tablets', name: 'Tablets', image: '📱' },
        { id: 'accessories', name: 'Mobile Accessories', image: '🎧' },
        { id: 'power-banks', name: 'Power Banks', image: '🔋' },
      ]
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '💻',
      color: '#E0E7FF',
      subCategories: [
        { id: 'laptops', name: 'Laptops', image: '💻' },
        { id: 'cameras', name: 'Cameras', image: '📷' },
        { id: 'audio', name: 'Audio Devices', image: '🎵' },
        { id: 'smart-home', name: 'Smart Home', image: '🏡' },
      ]
    },
    {
      id: 'gadgets',
      name: 'Smart Gadgets',
      icon: '⌚',
      color: '#FEE2E2',
      subCategories: [
        { id: 'smartwatch', name: 'Smart Watches', image: '⌚' },
        { id: 'earbuds', name: 'Earbuds', image: '🎧' },
        { id: 'fitness', name: 'Fitness Bands', image: '⌚' },
        { id: 'speakers', name: 'Smart Speakers', image: '🔊' },
      ]
    },
    {
      id: 'beauty',
      name: 'Beauty & Personal Care',
      icon: '💄',
      color: '#FCE7F3',
      subCategories: [
        { id: 'makeup', name: 'Makeup', image: '💄' },
        { id: 'skincare', name: 'Skincare', image: '🧴' },
        { id: 'fragrance', name: 'Fragrances', image: '🌸' },
        { id: 'haircare', name: 'Hair Care', image: '💇' },
      ]
    },
    {
      id: 'sports',
      name: 'Sports Hub',
      icon: '⚽',
      color: '#D1FAE5',
      subCategories: [
        { id: 'fitness', name: 'Fitness Equipment', image: '🏋️' },
        { id: 'outdoor', name: 'Outdoor Sports', image: '⚽' },
        { id: 'cycling', name: 'Cycling', image: '🚴' },
        { id: 'yoga', name: 'Yoga & Wellness', image: '🧘' },
      ]
    },
    {
      id: 'food',
      name: 'Food & Healthcare',
      icon: '🍎',
      color: '#FEF3C7',
      subCategories: [
        { id: 'organic', name: 'Organic Food', image: '🥗' },
        { id: 'supplements', name: 'Supplements', image: '💊' },
        { id: 'snacks', name: 'Healthy Snacks', image: '🍪' },
        { id: 'beverages', name: 'Beverages', image: '🥤' },
      ]
    },
    {
      id: 'auto',
      name: 'Auto Accessories',
      icon: '🚗',
      color: '#E0E7FF',
      subCategories: [
        { id: 'car-accessories', name: 'Car Accessories', image: '🚗' },
        { id: 'bike-accessories', name: 'Bike Accessories', image: '🏍️' },
        { id: 'car-care', name: 'Car Care', image: '🧽' },
        { id: 'tools', name: 'Tools & Equipment', image: '🔧' },
      ]
    },
  ];

  const activeCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={styles.container}>
      {/* Left Sidebar - Categories */}
      <div className={styles.sidebar}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryItem} ${
              selectedCategory === category.id ? styles.categoryActive : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : 'transparent'
            }}
          >
            <div className={styles.categoryIcon}>{category.icon}</div>
            <div className={styles.categoryName}>{category.name}</div>
          </div>
        ))}
      </div>

      {/* Right Content - Subcategories */}
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>{activeCategory?.name}</h2>
        </div>

        <div className={styles.subCategoriesGrid}>
          {activeCategory?.subCategories.map((subCategory) => (
            <div key={subCategory.id} className={styles.subCategoryCard}>
              <div className={styles.subCategoryImageContainer}>
                <div className={styles.subCategoryIcon}>{subCategory.image}</div>
                {subCategory.badge && (
                  <div className={styles.subCategoryBadge}>{subCategory.badge}</div>
                )}
              </div>
              <div className={styles.subCategoryInfo}>
                <h3 className={styles.subCategoryName}>{subCategory.name}</h3>
              </div>
            </div>
          ))}
          
          {/* View All Card */}
          <div className={`${styles.subCategoryCard} ${styles.viewAllCard}`}>
            <div className={styles.viewAllContent}>
              <ChevronRight size={32} className={styles.viewAllIcon} />
              <span className={styles.viewAllText}>View All</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;