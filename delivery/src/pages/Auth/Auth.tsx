// Auth.tsx
import React, { useState } from 'react';
import { User, Phone } from 'lucide-react';
import styles from './Auth.module.css';

interface FormData {
  name: string;
  mobile: string;
}

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      mobile: ''
    });
  };

  React.useEffect(() => {
    if (!isSignUp) {
      setFormData(prev => ({ ...prev, name: '' }));
    }
  }, [isSignUp]);

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundImage}></div>
      <div className={styles.overlay}></div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            {!isSignUp && (
              <p className={styles.subtitle}>
                Sign in to your account
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>

            {/* Name Field - Only for Sign Up */}
            {isSignUp && (
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Full Name
                </label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} size={18} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            {/* Mobile Field - Always Present */}
            <div className={styles.inputGroup}>
              <label htmlFor="mobile" className={styles.label}>
                Mobile Number
              </label>
              <div className={styles.inputWrapper}>
                <Phone className={styles.inputIcon} size={18} />
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your mobile number"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                isSignUp ? 'Sign Up' : 'Sign In'
              )}
            </button>

          </form>

          {/* Toggle Auth Mode Footer */}
          <div className={styles.toggleSection}>
            <span>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            </span>
            <button
              type="button"
              onClick={toggleAuthMode}
              className={styles.toggleLink}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;