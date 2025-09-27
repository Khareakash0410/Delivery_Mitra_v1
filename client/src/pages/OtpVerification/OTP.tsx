// OTPVerification.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import styles from './OTP.module.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import usePostApi from '../../api/usePostApi';
import apiEndpoints from '../../api/Config';
import { toast } from 'sonner';
import { veirfyLoginOtpSuccess, verifyOtpSuccess } from '../../store/slices/authSlice';



const OTPVerify = () => {

  const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch();

  const [otpData, setOtpData] = useState({
  otp: ['', '', '', '', '', ''],
  phone: formData?.mobile,
  name: formData?.name,
  utm_source: localStorage.getItem('utm_source'),
  utm_medium: localStorage.getItem('utm_medium'),
  utm_campaign: localStorage.getItem('utm_campaign'),
  });

  const {data: addData, error: addError, loading: addLoading,  setEnabled: addEnabled} = usePostApi(`${apiEndpoints.AUTH.VERIFY_OTP}`, otpData);

  const {data: loginData, error: loginError, loading: loginLoading,  setEnabled: loginEnabled} = usePostApi(`${apiEndpoints.AUTH.LOGIN_VERIFY_OTP}`, otpData);


  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otpData.otp];
    newOtp[index] = value;
    setOtpData(prev => ({
      ...prev,
      otp: newOtp
    }));
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpData.name) {
      addEnabled(true);
    }
      loginEnabled(true);
  };

  useEffect(() => {
    if (addData) {
      toast.success(addData?.message);
      addEnabled(false);
      dispatch(verifyOtpSuccess({user: addData?.user, token: addData?.token}));
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
      dispatch(veirfyLoginOtpSuccess({user: loginData?.user, token: loginData?.token}));
    }
    if(loginError) {
      toast.error(loginError?.message);
      loginEnabled(false);
    }
  }, [loginData, loginError]);

  if(isAuthenticated || user) {
    return <Navigate to={"/"}/>
  };

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundImage}></div>
      <div className={styles.overlay}></div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          {/* Back Button */}
          <button 
            type="button" 
            className={styles.backButton}
            onClick={() => navigate("/auth")}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Enter OTP</h1>
            <p className={styles.subtitle}>
              We've sent a 6-digit verification code to
            </p>
            <p className={styles.phoneNumber}>{formData?.mobile}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* OTP Input Fields */}
            <div className={styles.otpContainer}>
              <div className={styles.otpInputs}>
                {otpData.otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => {inputRefs.current[index] = el}}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={e => handleInputChange(index, e.target.value)}
                    className={`${styles.otpInput} ${digit ? styles.filled : ''}`}
                    autoComplete="one-time-code"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button 
              type="submit" 
              className={`${styles.verifyButton} ${(addLoading || loginLoading) ? styles.disabled : ''} ${(addLoading || loginLoading) ? styles.loading : ''}`}
              disabled={addLoading || loginLoading}
            >
              { addLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Verify & Sign In'
              )}
            </button>
          </form>

          {/* Resend Section */}
          <div className={styles.resendSection}>
              <button 
                type="button"
                className={`${styles.resendButton} 
                 `
              }
                // onClick={""}
                // disabled={isResending}
              >
                {/* {isResending ? ( */}
                  {/* <>
                    <div className={styles.resendSpinner}></div>
                    <span>Sending...</span>
                  </> */}
                {/* ) : ( */}
                  <>
                    <RotateCcw size={16} />
                    <span>Resend OTP</span>
                  </>
                {/* )} */}
              </button>
          </div>

          {/* Help Text */}
          <div className={styles.helpText}>
            <p>Didn't receive the code? Check your message inbox or try resending.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;