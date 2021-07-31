import { useEffect } from 'react';

import styles from './Button.module.css';

export default function Button({ totalImages, currentPage, onClick }) {
  useEffect(() => {
    if (totalImages > 10 && currentPage > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [totalImages, currentPage]);

  return (
    <button type="button" onClick={onClick} className={styles.button}>
      Load more
    </button>
  );
}
