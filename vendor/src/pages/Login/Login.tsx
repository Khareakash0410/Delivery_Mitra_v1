import React, { useEffect, useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import styles from './Login.module.css';
import usePostApi from '../../api/usePostApi';
import apiEndpoints from '../../api/Config';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../store/slices/UserSlice';

interface FormData {
  email: string;
  password: string;
}

const Auth: React.FC = () => {

  const {user, isAuthenticated} = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const {data, error, loading, setEnabled} = usePostApi(apiEndpoints.AUTH.LOGIN, formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnabled(true);
  };

  console.log(data)

  useEffect(() => {
   if (data) {
    toast.success(data?.message);
    setEnabled(false);
    dispatch(loginSuccess({vendor: data?.user, token: data?.token}));
   }

   if (error) {
    toast.error(error?.message);
    setEnabled(false);
   }
  }, [data, error]);

  if (user || isAuthenticated) {
    return <Navigate to={"/"}/>
  }


  
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
              className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
              disabled={loading}
            >
              {loading ? (
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