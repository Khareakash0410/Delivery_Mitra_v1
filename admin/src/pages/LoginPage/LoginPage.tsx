import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import styles from './LoginPage.module.css';

interface FormData {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
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
    setIsLoading((prev) => !prev)
  };

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
              Sign in to your Dashboard
            </h1>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  minLength={6}
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
                'Sign In'
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;