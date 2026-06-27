import Modal from './Modal';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="sm">
    <div className="confirm-dialog">
      <div className="confirm-dialog-icon">🗑️</div>
      <h3>{title || 'Are you sure?'}</h3>
      <p>{message || 'This action cannot be undone.'}</p>
      <div className="confirm-dialog-actions">
        <button className="btn btn-secondary" onClick={onClose} disabled={loading} id="confirm-cancel-btn">
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={loading} id="confirm-delete-btn">
          {loading ? 'Deleting...' : confirmText}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
