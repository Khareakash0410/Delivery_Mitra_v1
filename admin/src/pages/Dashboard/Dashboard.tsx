import React, { useState, useRef, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { mockData } from '../../constant/DashboardData';
import { formatCurrency } from '../../utils/formatCurrency';

const Dashboard: React.FC = () => {
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const scrollContainer = chartRef.current.querySelector(`.${styles.chartScrollable}`);
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        }, 100);
      }
    }
  }, []);

  // Calculate max values for scaling bars
  const maxEarnings = Math.max(...mockData.map(d => d.earnings));
  const maxOrders = Math.max(...mockData.map(d => d.orders));
  
  // Calculate totals and averages
  const totalEarnings = mockData.reduce((sum, d) => sum + d.earnings, 0);
  const totalOrders = mockData.reduce((sum, d) => sum + d.orders, 0);

  const handleBarClick = (index: number) => {
    setSelectedBar(selectedBar === index ? null : index);
  };

  return (
    <div className={styles.container}>

    <div className={styles.header}>         
      <h2 className={styles.title}>Admin &gt; Dashboard</h2>       
    </div> 

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Total Users</h2>
          </div>
          <p className={styles.cardValue} aria-label={`${totalOrders} total users`}>
            50
          </p>
          <p className={styles.cardSubtext}>
           View All 
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Total Vendors</h2>
          </div>
          <p className={styles.cardValue} aria-label={`$${totalEarnings.toLocaleString()} total vendors`}>
            100
          </p>
          <p className={styles.cardSubtext}>
           View All
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Total Delivery Agent</h2>
          </div>
          <p className={styles.cardValue} aria-label={`$${totalEarnings.toLocaleString()} total delivery agent`}>
            50
          </p>
          <p className={styles.cardSubtext}>
            View All
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
                      {Math.round(data.earnings / 1000)}
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
                  {data.shortMonth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected month details for mobile */}
        {selectedBar !== null  && (
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