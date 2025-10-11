import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit } from 'lucide-react';
import styles from './Products.module.css';
import { productData, type Product } from '../../constant/Products';
import { useNavigate } from 'react-router-dom';

const ProductSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteEnabled, setDeleteEnabled] = useState(false);

  const navigate = useNavigate();

  const itemsPerPage = 15;
  const totalPages = Math.ceil(productData?.products?.length / itemsPerPage);
  
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productData?.products?.slice(startIndex, endIndex);
  }, [currentPage, productData?.products]);

  const handleDelete = (productId: string): void => {
    setDeleteEnabled(true);
    setDeleteId(productId);
  };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; Product Management</h2>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Price</th>
                <th className={styles.tableHeader}>Category</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentProducts?.length > 0 ? (
                currentProducts.map((product: Product) => (
                  <tr key={product.id} className={styles.tableRow}>
                    <td className={styles.tableCell} data-label="Name">
                      <span className={styles.productName}>{product.name}</span>
                    </td>

                    <td className={styles.tableCell} data-label="Price">
                      <span className={styles.productPrice}>
                        {`₹${product.price}`}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Category">
                      <span className={styles.categoryTag}>
                        {product.category}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Actions">
                      <div className={styles.actionButtons}>
                        <button 
                          onClick={() => navigate("/product/edit")} 
                          disabled={loading}
                          className={`${styles.actionButton} ${styles.editButton}`}
                          aria-label="Edit product"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)} 
                          disabled={loading}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          aria-label="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noDataCell}>
                    No products found.
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
            onClick={() =>  setCurrentPage(prev => Math.max(prev - 1, 1))}
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
            disabled={currentPage === totalPages || productData?.products.length === 0}
            className={`${styles.navButton} ${(currentPage === totalPages || productData?.products.length === 0) ? styles.navButtonDisabled : ''}`}
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

export default ProductSection;