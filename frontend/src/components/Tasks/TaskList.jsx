import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import Loader from '../UI/Loader';
import EmptyState from '../UI/EmptyState';

const TaskList = ({ tasks, loading, error, onEdit, onDelete, onStatusToggle, onAddTask }) => {
  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Failed to load tasks</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <div className="tasks-grid" role="list" aria-label="Task list">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <div key={task._id} role="listitem">
            <TaskCard
              task={task}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusToggle={onStatusToggle}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
