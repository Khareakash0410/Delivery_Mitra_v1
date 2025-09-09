import React, { useState } from 'react';
import { Power } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  isToggleOn?: boolean;
  onToggle?: (isOn: boolean) => void;
  toggleLabel?: string;
}

const Header: React.FC<HeaderProps> = ({isToggleOn = false, onToggle, toggleLabel = "Toggle Status"}) => {

  const [toggleState, setToggleState] = useState(isToggleOn);

  const handleToggleClick = () => {
    const newState = !toggleState;
    setToggleState(newState);
    onToggle?.(newState);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left side - Logo */}
        <div className={styles.logoSection}>
            <img src= "./Logo.png" alt= "Logo" className={styles.logo} />
        </div>

        {/* Right side - Toggle Button */}
        <div className={styles.toggleSection}>
          <button
            className={`${styles.toggleButton} ${toggleState ? styles.toggleOn : styles.toggleOff}`}
            onClick={handleToggleClick}
            aria-label={toggleLabel}
            aria-pressed={toggleState}
            type="button"
          >
            <div className={styles.toggleTrack}>
              <div className={styles.toggleThumb}>
                <Power size={12} className={styles.toggleIcon} />
              </div>
            </div>
            <span className={styles.toggleStatus}>
              {toggleState ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;