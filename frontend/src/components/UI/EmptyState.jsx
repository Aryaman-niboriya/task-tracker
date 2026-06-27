import { motion } from 'framer-motion';

const EmptyState = ({ onAddTask }) => (
  <motion.div
    className="empty-state"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="empty-state-icon">📋</div>
    <h3>No tasks yet</h3>
    <p>Create your first task to get started. Stay organized and track your progress!</p>
    {onAddTask && (
      <button className="btn btn-primary" onClick={onAddTask} id="empty-state-add-btn">
        + Create First Task
      </button>
    )}
  </motion.div>
);

export default EmptyState;
