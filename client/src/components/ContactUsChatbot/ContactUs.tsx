import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail, User } from 'lucide-react';
import styles from './ContactUs.module.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsOpen(false);
    }, 3000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <>
      {/* Floating Chat Button */}
      <div className={`${styles.floatingButton} ${isOpen ? styles.hidden : styles.visible}`}>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.chatButton}
        >
          <MessageCircle size={28} className={styles.messageIcon} />
        </button>
        
        {/* Floating tooltip */}
        <div className={styles.tooltip}>
          Need help? Contact us!
          <div className={styles.tooltipArrow}></div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            
            {/* Header */}
            <div className={styles.header}>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
              
              <div className={styles.headerContent}>
                <div className={styles.headerIcon}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h2 className={styles.headerTitle}>Get in Touch</h2>
                  <p className={styles.headerSubtitle}>We'd love to hear from you!</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Name Field */}
                <div className={styles.inputGroup}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className={styles.input}
                  />
                </div>

                {/* Email Field */}
                <div className={styles.inputGroup}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className={styles.input}
                  />
                </div>

                {/* Phone Field */}
                <div className={styles.inputGroup}>
                  <Phone size={18} className={styles.inputIcon} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone Number"
                    className={styles.input}
                  />
                </div>

                {/* Message Field */}
                <div className={styles.inputGroup}>
                  <MessageCircle size={18} className={styles.textareaIcon} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    rows={4}
                    className={`${styles.input} ${styles.textarea}`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`${styles.submitButton} ${
                    isFormValid && !isSubmitting ? styles.submitButtonActive : styles.submitButtonDisabled
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.footerText}>
                We typically respond within an hour.
              </p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default ContactChatbot;