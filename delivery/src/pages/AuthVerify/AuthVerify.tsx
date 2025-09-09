// OTPVerification.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import styles from './AuthVerfiy.module.css';
import { useNavigate } from 'react-router-dom';

interface OTPVerificationProps {
  phoneNumber?: string;
  onVerify?: (otp: string) => void;
}

const AuthVerify: React.FC<OTPVerificationProps> = ({
  phoneNumber = "+91 98765 43210",
  onVerify
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    if (value.length <= 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length > 1) {
      // Handle paste
      const digits = value.slice(0, 6 - index).split('');
      for (let i = 0; i < digits.length && index + i < 6; i++) {
        newOtp[index + i] = digits[i];
      }
      setOtp(newOtp);
      
      // Focus the next empty input or last input
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      // Focus first empty input
      const firstEmptyIndex = otp.findIndex(digit => !digit);
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
      return;
    }
    setIsLoading(true);
    onVerify?.(otpString);
  };

  const handleResend = async () => {
    setIsResending(true);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

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
            <p className={styles.phoneNumber}>{phoneNumber}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* OTP Input Fields */}
            <div className={styles.otpContainer}>
              <div className={styles.otpInputs}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
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
              className={`${styles.verifyButton} ${!isOtpComplete ? styles.disabled : ''} ${isLoading ? styles.loading : ''}`}
              disabled={!isOtpComplete || isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Verify & Sign In'
              )}
            </button>
          </form>

          {/* Resend Section */}
          <div className={styles.resendSection}>
            {!canResend ? (
              <p className={styles.timerText}>
                Resend OTP in <span className={styles.timer}>00:{timer.toString().padStart(2, '0')}</span>
              </p>
            ) : (
              <button 
                type="button"
                className={`${styles.resendButton} ${isResending ? styles.resending : ''}`}
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <div className={styles.resendSpinner}></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw size={16} />
                    <span>Resend OTP</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthVerify;