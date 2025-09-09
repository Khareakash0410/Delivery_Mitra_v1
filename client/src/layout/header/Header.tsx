import styles from './Header.module.css';
import Topbar from '../../common/Topbar/Topbar';
import Navbar from '../../common/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation();

  return (
    <header className={styles.header}>

      <Topbar />

      {location.pathname === '/' && <Navbar />}
      
    </header>
  );
};

export default Header;