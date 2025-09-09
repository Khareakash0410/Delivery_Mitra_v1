import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

  const navigate = useNavigate();

  const[searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    navigate(`/collections/all?search=${searchTerm}`);
    setSearchTerm("");
  }
  
  return (
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchBar}>
            <input 
              type="text"
              placeholder="Search for products..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <Search type='button' onClick={handleSearch} size={18} className={styles.searchIcon} />
          </form>
        </div>
  )
}

export default SearchBar
