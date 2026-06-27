import { AnimatePresence, motion } from 'framer-motion';
import { IoGridOutline, IoAddCircleOutline, IoCheckmarkDoneCircle, IoTimeOutline, IoBarChartOutline, IoAppsOutline } from 'react-icons/io5';

const NAV = [
  { id: 'board', label: 'Task Board',   icon: <IoAppsOutline size={18} />,          desc: 'Kanban view' },
  { id: 'all',   label: 'All Tasks',    icon: <IoGridOutline size={18} />,           desc: 'Every task' },
];

const Sidebar = ({ activeNav, onNavChange, taskCount, onAddTask, isOpen, onClose }) => (
  <>
    <AnimatePresence>
      {isOpen && (
        <motion.div className="sidebar-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
    </AnimatePresence>

    <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✓</div>
        <div className="sidebar-logo-text">
          <h2>TaskFlow</h2>
          <span>Task Manager</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* Add task button */}
        <button className="btn btn-primary w-full" style={{ marginBottom: '1rem' }}
          onClick={onAddTask} id="sidebar-add-btn">
          <IoAddCircleOutline size={18} />
          New Task
        </button>

        <span className="nav-section-label">Views</span>

        {NAV.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => onNavChange(item.id)}
            id={`nav-${item.id}`}
          >
            {item.icon}
            <span>
              <div>{item.label}</div>
              <div style={{ fontSize: '.68rem', color: 'var(--text-3)', fontWeight: 400 }}>{item.desc}</div>
            </span>
            {item.id === 'all' && taskCount > 0 && <span className="nav-badge">{taskCount}</span>}
          </button>
        ))}

        {/* Quick Stats mini */}
        <span className="nav-section-label" style={{ marginTop: '1.5rem' }}>Quick Stats</span>
        <div style={{ padding: '.5rem .75rem', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {[
            { label: 'Total', value: taskCount, color: 'var(--indigo)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.82rem', color: 'var(--text-2)' }}>
              <span>{s.label}</span>
              <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <p>COLL-EDGE CONNECT</p>
        <p>MERN Stack Assignment 🚀</p>
      </div>
    </aside>
  </>
);

export default Sidebar;
