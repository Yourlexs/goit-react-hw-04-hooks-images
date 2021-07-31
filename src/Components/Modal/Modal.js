import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, image }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handlebackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={handlebackdropClick}>
        <img src={image} alt="" className={styles.modalImg} />
      </div>
    </div>,
    modalRoot,
  );
}
