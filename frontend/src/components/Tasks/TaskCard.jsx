import { format, isPast, isToday } from 'date-fns';
import { IoPencil, IoTrash, IoCalendarOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { PriorityBadge, StatusBadge } from '../UI/Badge';
import { STATUS_CONFIG } from '../../utils/constants';

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle, nextStatus, nextLabel }) => {
  const isCompleted = task.status === 'completed';

  // fallback next status if not passed (grid/list view)
  const ns    = nextStatus || (isCompleted ? 'todo' : task.status === 'todo' ? 'in-progress' : 'completed');
  const nl    = nextLabel  || (isCompleted ? '↺ Reopen' : task.status === 'todo' ? 'Start →' : 'Done ✓');

  const isOverdue = task.dueDate && !isCompleted
    && isPast(new Date(task.dueDate))
    && !isToday(new Date(task.dueDate));

  const statusCfg = STATUS_CONFIG[ns] || STATUS_CONFIG.todo;

  return (
    <article
      className={`task-card priority-${task.priority}`}
      aria-label={`Task: ${task.title}`}
    >
      {/* Header */}
      <div className="task-card-header">
        <h3 className={`task-card-title ${isCompleted ? 'completed-text' : ''}`}>
          {task.title}
        </h3>
        <div className="task-card-actions" role="group">
          <button className="btn btn-ghost btn-icon" onClick={e => { e.stopPropagation(); onEdit(task); }}
            title="Edit" id={`edit-${task._id}`} aria-label="Edit task">
            <IoPencil size={14} />
          </button>
          <button className="btn btn-ghost btn-icon" onClick={e => { e.stopPropagation(); onDelete(task); }}
            title="Delete" id={`del-${task._id}`} aria-label="Delete task"
            style={{ color: 'var(--high-color)' }}>
            <IoTrash size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className="task-card-tags">
          {task.tags.map(tag => <span key={tag} className="task-tag">#{tag}</span>)}
        </div>
      )}

      {/* Footer */}
      <div className="task-card-footer">
        <div className="task-card-meta">
          <PriorityBadge priority={task.priority} />
          {task.dueDate && (
            <span className={`task-card-date ${isOverdue ? 'overdue' : ''}`}>
              <IoCalendarOutline size={12} />
              {isToday(new Date(task.dueDate)) ? 'Today' : format(new Date(task.dueDate), 'MMM d')}
              {isOverdue && ' ⚠'}
            </span>
          )}
        </div>

        {/* Quick status action button */}
        <button
          className="task-status-btn"
          onClick={e => { e.stopPropagation(); onStatusToggle(task._id, ns); }}
          style={{ background: statusCfg.bg, color: statusCfg.color, borderColor: `${statusCfg.color}30` }}
          id={`status-${task._id}`}
          aria-label={`Move to ${nl}`}
        >
          <IoCheckmarkCircle size={12} />
          {nl}
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
