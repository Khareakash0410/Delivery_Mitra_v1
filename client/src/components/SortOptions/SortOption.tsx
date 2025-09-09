// SortOption.tsx
import React, { type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SortOption.module.css';

const SortOption: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.container}>
      <select
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        id="sort"
        className={styles.select}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOption;