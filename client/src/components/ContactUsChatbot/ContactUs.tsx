import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import styles from './ContactUs.module.css';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatData = {
    welcome: {
      text: "Hi! 👋 I'm here to help. What can I assist you with today?",
      options: [
        "Product Information",
        "Pricing & Plans",
        "Technical Support",
        "Account Help"
      ]
    },
    responses: {
      "Product Information": {
        text: "Great! What would you like to know about our products?",
        options: [
          "Features Overview",
          "Product Demo",
          "Use Cases",
          "Back to Main Menu"
        ]
      },
      "Features Overview": {
        text: "Our platform offers AI-powered analytics, real-time collaboration, advanced security features, and seamless integrations with 100+ tools. Would you like to know more about a specific feature?",
        options: ["AI Analytics", "Integrations", "Security", "Back to Main Menu"]
      },
      "Product Demo": {
        text: "I can schedule a personalized demo for you! Please visit our website or contact sales@company.com to book a session. Is there anything else I can help with?",
        options: ["Pricing & Plans", "Technical Support", "Back to Main Menu"]
      },
      "Use Cases": {
        text: "Our platform is perfect for project management, team collaboration, data analysis, and workflow automation. Which industry are you interested in?",
        options: ["Tech/Software", "Healthcare", "Finance", "E-commerce", "Back to Main Menu"]
      },
      "Pricing & Plans": {
        text: "We offer flexible pricing options. What would you like to know?",
        options: [
          "Free Trial",
          "Subscription Plans",
          "Enterprise Solutions",
          "Back to Main Menu"
        ]
      },
      "Free Trial": {
        text: "Excellent! We offer a 14-day free trial with full access to all features. No credit card required. Sign up at our website to get started!",
        options: ["Subscription Plans", "Technical Support", "Back to Main Menu"]
      },
      "Subscription Plans": {
        text: "We have 3 plans: Basic ($29/month), Professional ($79/month), and Enterprise (custom pricing). Each includes different features and user limits. Need help choosing?",
        options: ["Compare Plans", "Enterprise Solutions", "Back to Main Menu"]
      },
      "Technical Support": {
        text: "I'm here to help! What technical issue are you experiencing?",
        options: [
          "Login Issues",
          "Installation Help",
          "Bug Report",
          "API Documentation",
          "Back to Main Menu"
        ]
      },
      "Login Issues": {
        text: "Let's resolve your login issue. Have you tried resetting your password? You can do this from the login page. If that doesn't work, contact support@company.com",
        options: ["Installation Help", "Contact Live Support", "Back to Main Menu"]
      },
      "Installation Help": {
        text: "Installation is easy! Check our step-by-step guide at docs.company.com/installation. For specific platforms, which one do you need help with?",
        options: ["Windows", "macOS", "Linux", "Mobile Apps", "Back to Main Menu"]
      },
      "Account Help": {
        text: "How can I assist with your account?",
        options: [
          "Update Profile",
          "Billing Questions",
          "Cancel Subscription",
          "Data Export",
          "Back to Main Menu"
        ]
      },
      "Billing Questions": {
        text: "For billing inquiries, you can view your invoices in Account Settings > Billing. For specific questions, email billing@company.com or call 1-800-XXX-XXXX",
        options: ["Update Profile", "Cancel Subscription", "Back to Main Menu"]
      },
      "Back to Main Menu": {
        text: "No problem! What else can I help you with?",
        options: [
          "Product Information",
          "Pricing & Plans",
          "Technical Support",
          "Account Help"
        ]
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(chatData.welcome.text, chatData.welcome.options);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now(),
        text,
        sender: 'bot',
        options,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    const response = chatData.responses[option as keyof typeof chatData.responses];
    if (response) {
      addBotMessage(response.text, response.options);
    } else {
      addBotMessage(
        "I'm not sure about that. Let me connect you with a human agent. Please email support@company.com or call 1-800-XXX-XXXX",
        ["Back to Main Menu"]
      );
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue('');

    addBotMessage(
      "Thanks for your message! For custom inquiries, please contact us at support@company.com. Can I help you with anything else?",
      ["Product Information", "Pricing & Plans", "Technical Support", "Back to Main Menu"]
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessages([]);
    }, 300);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className={styles.floatingButton}>
          <button
            onClick={() => setIsOpen(true)}
            className={styles.chatButton}
          >
            <MessageCircle size={28} />
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.headerIcon}>
                  <Bot size={24} />
                </div>
                <div>
                  <h2 className={styles.headerTitle}>AI Assistant</h2>
                  <p className={styles.headerSubtitle}>Online • Here to help</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`${styles.messageWrapper} ${
                    message.sender === 'user' ? styles.messageWrapperUser : styles.messageWrapperBot
                  }`}
                >
                  <div className={styles.messageContent}>
                    <div className={`${styles.avatar} ${
                      message.sender === 'bot' ? styles.avatarBot : styles.avatarUser
                    }`}>
                      {message.sender === 'bot' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div>
                      <div className={`${styles.messageBubble} ${
                        message.sender === 'bot' ? styles.messageBubbleBot : styles.messageBubbleUser
                      }`}>
                        {message.text}
                      </div>
                      {message.options && (
                        <div className={styles.optionsContainer}>
                          {message.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(option)}
                              className={styles.optionButton}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className={styles.typingIndicator}>
                  <div className={`${styles.avatar} ${styles.avatarBot}`}>
                    <Bot size={18} />
                  </div>
                  <div className={styles.typingBubble}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={styles.inputArea}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className={styles.input}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`${styles.sendButton} ${
                    inputValue.trim() ? styles.sendButtonActive : styles.sendButtonDisabled
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;