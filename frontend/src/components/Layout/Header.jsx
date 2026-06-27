import { IoMenuOutline, IoAddCircleOutline } from 'react-icons/io5';
import { format } from 'date-fns';

const NAV_LABELS = {
  all: 'All Tasks',
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const Header = ({ activeNav, onMenuToggle, onAddTask }) => {
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <header className="header">
      <div className="header-left">
        <h1>{NAV_LABELS[activeNav] || 'Tasks'}</h1>
        <p>Manage your tasks and stay productive</p>
      </div>

      <div className="header-right">
        <span className="header-date" aria-label="Current date">{today}</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={onAddTask}
          id="header-add-task-btn"
          aria-label="Create new task"
        >
          <IoAddCircleOutline size={16} />
          New Task
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={onMenuToggle}
        id="mobile-menu-btn"
        aria-label="Toggle sidebar"
        style={{
          display: 'none',
          position: 'static',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        <IoMenuOutline size={24} />
      </button>
    </header>
  );
};

export default Header;
