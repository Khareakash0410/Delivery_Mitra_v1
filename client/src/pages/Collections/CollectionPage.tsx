import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaFilter } from 'react-icons/fa';
import ProductsList from '../../components/ProductList/ProductList';
import { products } from '../../constants/Products';
import SortOption from '../../components/SortOptions/SortOption';
import styles from './Collection.module.css';
import FilterSidebar from '../../components/FilterSidebar/FilterSiebar';

interface CollectionPageProps {
  className?: string;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ className = '' }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [resultsCount, setResultsCount] = useState<number>(products.length);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      sidebarRef.current && 
      !sidebarRef.current.contains(event.target as Node)
    ) {
      closeSidebar();
    }
  }, [closeSidebar]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isSidebarOpen) {
      closeSidebar();
    }
  }, [isSidebarOpen, closeSidebar]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, handleClickOutside, handleKeyDown]);


  useEffect(() => {
    setResultsCount(products.length);
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>

      <div className={styles.mobileHeader}>
        <button
          onClick={toggleSidebar}
          className={styles.filterButton}
          aria-label="Open filters"
          aria-expanded={isSidebarOpen}
        >
          <FaFilter className={styles.filterIcon} aria-hidden="true" />
          <span>Filters</span>
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Filter Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
        role="complementary"
        aria-label="Product filters"
      >
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filters</h2>
          <button
            onClick={closeSidebar}
            className={styles.closeSidebarButton}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
        <FilterSidebar />
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h1 className={styles.resultsTitle}>
            {resultsCount} Result{resultsCount !== 1 ? 's' : ''} found
          </h1>
          <div className={styles.sortContainer}>
            <SortOption />
          </div>
        </div>
        
        <div className={styles.productsContainer}>
          <ProductsList products={products} />
        </div>
      </main>
    </div>
  );
};

export default CollectionPage;