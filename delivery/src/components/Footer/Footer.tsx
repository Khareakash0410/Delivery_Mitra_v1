import React from 'react';
import { Home, TrendingUp, Settings } from 'lucide-react';
import styles from './Footer.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface FooterNavigationProps {
  className?: string;
}

const FooterNavigation: React.FC<FooterNavigationProps> = ({
  className
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={20} />,
      path: '/'
    },
    {
      id: 'earnings',
      label: 'Earnings',
      icon: <TrendingUp size={20} />,
      path: '/earnings'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings'
    }
  ];

  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
        <div className={styles.navContainer}>
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            
            return (
              <button
                key={item.id}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => navigate(item?.path)}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                <div className={styles.iconContainer}>
                  <div className={styles.icon}>
                    {item.icon}
                  </div>
                </div>
                <span className={styles.label}>{item.label}</span>
                
                {/* Active indicator */}
                {isActive && <div className={styles.activeIndicator} />}
              </button>
            );
          })}
        </div>
      </nav>
    </footer>
  );
};

export default FooterNavigation;