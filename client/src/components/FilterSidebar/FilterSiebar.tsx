import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FilterSidebar.module.css';

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
}

const FilterSidebar: React.FC = () => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const categories: string[] = ["Grocery", "Dairy", "Electronics", "Vegetables", "Pharmacy", "Personalcare", "Household","Sweets", "Stationery","Agriculture", "Fertilizers", "Fashion", "Footwear", "Toys"];

  const updateURLParams = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      } else if (value && !Array.isArray(value)) {
        params.append(key, value.toString());
      }
    });
    
    navigate(`?${params.toString()}`);
  }, [navigate]);

  // const handleFilterChange = useCallback(() => {
  //   const newFilters = { ...filters };
  //   setFilters(newFilters);
  //   updateURLParams(newFilters);
  // }, [filters, updateURLParams]);

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    
    const newFilters: FilterState = {
      ...filters,
      minPrice: 0,
      maxPrice: newPrice
    };
    
    setFilters(newFilters);
    updateURLParams(newFilters);
  }, [filters, updateURLParams]);

  const handleCategoryChange = useCallback((category: string) => {
    const newFilters: FilterState = {
      ...filters,
      category
    };
    setFilters(newFilters);
    updateURLParams(newFilters);
  }, [filters, updateURLParams]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Filter You Like</div>
      
      {/* category filter */}
      <div className={styles.filterSection}>
        <div className={styles.filterTitle}>Category</div>
        {categories.map((ele) => (
          <div key={ele} className={styles.filterItem}>
            <input 
              type="radio" 
              name="category" 
              value={ele}
              checked={filters.category === ele}
              onChange={() => handleCategoryChange(ele)}
              className={styles.input}
            />
            <label className={styles.label}>{ele}</label>
          </div>
        ))}
      </div>

      {/* price range filter */}
      <div className={styles.filterSection}>
        <div className={styles.filterTitle}>Price Range</div>
        <div className={styles.priceDisplay}>
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="10000" 
          value={priceRange[1]} 
          onChange={handlePriceChange}
          className={styles.rangeInput}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;