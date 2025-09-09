import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import styles from './DeliveryAgents.module.css';
import { useNavigate } from 'react-router-dom';
import { deliveryAgentsData, type DeliveryAgent } from '../../constant/DeliveryAgentData';

const DeliveryAgents: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(deliveryAgentsData?.agents?.length / itemsPerPage);
  const navigate = useNavigate();
  
  const currentAgents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return deliveryAgentsData?.agents?.slice(startIndex, endIndex);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; Delivery Agents</h2>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Agent Name</th>
                <th className={styles.tableHeader}>Phone</th>
                <th className={styles.tableHeader}>Vehicle Type</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentAgents?.length > 0 ? (
                (currentAgents as DeliveryAgent[]).map((agent) => (
                  <tr key={agent.id} className={styles.tableRow}>
                    <td className={styles.tableCell} data-label="Agent Name">
                      <div className={styles.agentInfo}>
                        <span className={styles.agentName}>{agent.name}</span>
                      </div>
                    </td>

                    <td className={styles.tableCell} data-label="Phone">
                      <span className={styles.agentPhone}>
                        {agent.phone}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Vehicle Type">
                      <span 
                        className={`${styles.vehicleType} ${styles.vehicleDefault}`}
                      >
                        {agent.vehicleType}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Actions">
                      <div className={styles.actionButtons}>
                        <button 
                          onClick={() => navigate(`/delivery-agent/${agent.id}`)} 
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          aria-label="View agent details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noDataCell}>
                    No delivery agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationControls}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`${styles.navButton} ${currentPage === 1 ? styles.navButtonDisabled : ''}`}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} className={styles.navIcon} />
            Previous
          </button>
          
          <div className={styles.pageButtons}>
            <button
              className={`${styles.pageButton} ${styles.pageButtonActive}`}
              aria-label={`Page ${currentPage}`}
            >
              {currentPage}
            </button>
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || deliveryAgentsData?.agents.length === 0}
            className={`${styles.navButton} ${(currentPage === totalPages || deliveryAgentsData?.agents.length === 0) ? styles.navButtonDisabled : ''}`}
            aria-label="Next page"
          >
            Next
            <ChevronRight size={16} className={styles.navIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgents;