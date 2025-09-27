import React, { useEffect, useState } from 'react';
import { User, Phone } from 'lucide-react';
import styles from './Auth.module.css';
import usePostApi from '../../api/usePostApi';
import apiEndpoints from '../../api/Config';
import { useUTMTracker } from '../../utils/UTM';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface FormData {
  name: string;
  mobile: string;
}

const Auth: React.FC = () => {

  useUTMTracker();

  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: ''
  });

  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const {data: addData, error: addError, loading: addLoading,  setEnabled: addEnabled} = usePostApi(`${apiEndpoints.AUTH.SIGNUP}`, formData);

  const {data: loginData, error: loginError, loading: loginLoading,  setEnabled: loginEnabled} = usePostApi(`${apiEndpoints.AUTH.LOGIN}`, {phone: formData.mobile});

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
    addEnabled(true);
    }
    loginEnabled(true);
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

  useEffect(() => {
    if (addData) {
      toast.success(addData?.message);
      addEnabled(false);
      navigate(`/verify-otp`, {state: formData});
    }

    if(addError) {
      toast.error(addError?.message);
      addEnabled(false);
    }

  }, [addData, addError]);

  useEffect(() => {
    if (loginData) {
      toast.success(loginData?.message);
      loginEnabled(false);
      navigate(`/verify-otp`, {state: formData});
    }

    if(loginError) {
      toast.error(loginError?.message);
      loginEnabled(false);
    }
  }, [loginData, loginError])

  if(isAuthenticated || user) {
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
              className={`${styles.submitButton} ${(addLoading || loginLoading) ? styles.loading : ''}`}
              disabled={addLoading || loginLoading}
            >
              {addLoading ? (
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