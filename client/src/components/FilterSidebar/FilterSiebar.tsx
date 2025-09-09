import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FilterSidebar.module.css';

interface FilterState {
  category: string;
  brand: string[];
  minPrice: number;
  maxPrice: number;
}

const FilterSidebar: React.FC = () => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories: string[] = ["Grocery", "Dairy", "Medicine", "Electronics", "Others"];
  
  const brands: string[] = [
    'General Store',
    'Medicine Pharma',
    'Street Shop',
    'Beach Breeze',
    'Fashionist',
    'Pharmaeasy',
    'Roadster',
    'Siyaram',
  ];

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

  const handleBrandChange = useCallback((brand: string) => {
    const updatedBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    
    const newFilters: FilterState = {
      ...filters,
      brand: updatedBrands
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

      {/* seller filter */}
      <div className={styles.filterSection}>
        <div className={styles.filterTitle}>Seller</div>
        {brands.map((ele) => (
          <div key={ele} className={styles.filterItem}>
            <input 
              type="checkbox" 
              value={ele}
              checked={filters.brand.includes(ele)}
              onChange={() => handleBrandChange(ele)}
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
          max="1000" 
          value={priceRange[1]} 
          onChange={handlePriceChange}
          className={styles.rangeInput}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;