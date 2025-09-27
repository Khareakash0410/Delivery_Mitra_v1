import React, { useState, useRef, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';

interface MonthlyData {
  month: string;
  shortMonth: string;
  earnings: number;
  orders: number;
}

const mockData: MonthlyData[] = [
  { month: 'January 2024', shortMonth: 'Jan', earnings: 15000, orders: 45 },
  { month: 'February 2024', shortMonth: 'Feb', earnings: 18500, orders: 52 },
  { month: 'March 2024', shortMonth: 'Mar', earnings: 22000, orders: 68 },
  { month: 'April 2024', shortMonth: 'Apr', earnings: 19200, orders: 58 },
  { month: 'May 2024', shortMonth: 'May', earnings: 25000, orders: 72 },
  { month: 'June 2024', shortMonth: 'Jun', earnings: 21800, orders: 65 },
  { month: 'July 2024', shortMonth: 'Jul', earnings: 28000, orders: 85 },
  { month: 'August 2024', shortMonth: 'Aug', earnings: 31000, orders: 92 },
  { month: 'September 2024', shortMonth: 'Sep', earnings: 26500, orders: 78 },
  { month: 'October 2024', shortMonth: 'Oct', earnings: 29000, orders: 88 },
  { month: 'November 2024', shortMonth: 'Nov', earnings: 33000, orders: 95 },
  { month: 'December 2024', shortMonth: 'Dec', earnings: 35000, orders: 102 }
];

const Dashboard: React.FC = () => {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const {user, isAuthenticated} = useSelector((state: RootState) => state.user);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to latest months on mobile
  useEffect(() => {
    if (isMobile && chartRef.current) {
      const scrollContainer = chartRef.current.querySelector(`.${styles.chartScrollable}`);
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        }, 100);
      }
    }
  }, [isMobile]);

  // Calculate max values for scaling bars
  const maxEarnings = Math.max(...mockData.map(d => d.earnings));
  const maxOrders = Math.max(...mockData.map(d => d.orders));
  
  // Calculate totals and averages
  const totalEarnings = mockData.reduce((sum, d) => sum + d.earnings, 0);
  const totalOrders = mockData.reduce((sum, d) => sum + d.orders, 0);
  const avgEarnings = Math.round(totalEarnings / mockData.length);
  const avgOrders = Math.round(totalOrders / mockData.length);

  const formatCurrency = (amount: number): string => {
    if (isMobile && amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const handleBarClick = (index: number) => {
    setSelectedBar(selectedBar === index ? null : index);
  };

  if (!user || !isAuthenticated) {
    return <Navigate to={"/login"}/>
  }

  return (
    <div className={styles.container}>

    <div className={styles.header}>         
      <h2 className={styles.title}>Vendor &gt; Dashboard</h2>       
    </div> 

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Total Orders</h2>
          </div>
          <p className={styles.cardValue} aria-label={`${totalOrders} total orders`}>
            {totalOrders.toLocaleString()}
          </p>
          <p className={styles.cardSubtext}>
            Avg: {avgOrders}/month • Verified orders
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Total Revenue</h2>
          </div>
          <p className={styles.cardValue} aria-label={`$${totalEarnings.toLocaleString()} total earnings`}>
            {formatCurrency(totalEarnings)}
          </p>
          <p className={styles.cardSubtext}>
            Avg: {formatCurrency(avgEarnings)}/month • Total revenue
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      <section className={styles.chartSection} aria-labelledby="chart-title">
        <div className={styles.chartHeader}>
          <h2 id="chart-title" className={styles.chartTitle}>
            Monthly Performance
          </h2>
          <div className={styles.legend} role="img" aria-label="Chart legend">
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.earnings}`} aria-hidden="true"></div>
              <span>Revenue</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.orders}`} aria-hidden="true"></div>
              <span>Orders</span>
            </div>
          </div>
        </div>

        <div className={styles.chartContainer} ref={chartRef}>
          <div 
            className={styles.chartScrollable}
            role="img"
            aria-label="Monthly performance bar chart showing earnings and orders"
          >
            {mockData.map((data, index) => (
              <div key={index} className={styles.chartBar}>
                <div className={styles.barGroup}>
                  <div 
                    className={`${styles.bar} ${styles.earnings}`}
                    style={{
                      height: `${(data.earnings / maxEarnings) * 100}%`
                    }}
                    title={`${data.month}: ${formatCurrency(data.earnings)} revenue`}
                    onClick={() => handleBarClick(index)}               
                    tabIndex={0}
                    role="button"
                    aria-label={`${data.month} revenue: ${formatCurrency(data.earnings)}`}
                  >
                    <span className={styles.barValue} aria-hidden="true">
                      {isMobile ? `${Math.round(data.earnings / 1000)}k` : `$${(data.earnings / 1000).toFixed(0)}k`}
                    </span>
                  </div>
                  <div 
                    className={`${styles.bar} ${styles.orders}`}
                    style={{
                      height: `${(data.orders / maxOrders) * 100}%`
                    }}
                    title={`${data.month}: ${data.orders} orders`}
                    onClick={() => handleBarClick(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${data.month} orders: ${data.orders}`}
                  >
                    <span className={styles.barValue} aria-hidden="true">
                      {data.orders}
                    </span>
                  </div>
                </div>
                <div className={styles.barLabel} aria-hidden="true">
                  {isMobile ? data.shortMonth : data.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected month details for mobile */}
        {selectedBar !== null && isMobile && (
          <div 
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}
            role="region"
            aria-live="polite"
            aria-label="Selected month details"
          >
            <strong>{mockData[selectedBar].month}</strong>
            <br />
            <span>Revenue: {formatCurrency(mockData[selectedBar].earnings)}</span>
            <br />
            <span>Orders: {mockData[selectedBar].orders}</span>
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;