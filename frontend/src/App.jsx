import { useState, useCallback } from 'react';
import './index.css';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMenuOutline, IoAddCircleOutline, IoCheckmarkDoneCircle, IoTimeOutline, IoBarChartOutline, IoGridOutline, IoWarningOutline } from 'react-icons/io5';
import { format } from 'date-fns';

import { ToastProvider, useToast } from './components/UI/Toast';
import Sidebar from './components/Layout/Sidebar';
import StatsCards from './components/Dashboard/StatsCards';
import TaskCard from './components/Tasks/TaskCard';
import TaskFilters from './components/Tasks/TaskFilters';
import TaskForm from './components/Tasks/TaskForm';
import Modal from './components/UI/Modal';
import ConfirmDialog from './components/UI/ConfirmDialog';
import Loader from './components/UI/Loader';
import EmptyState from './components/UI/EmptyState';
import { useTasks } from './hooks/useTasks';

/* ── Kanban Column ───────────────────────────────────────────── */
const COLS = [
  { id: 'todo',        label: 'To Do',       dot: '#94a3b8', cls: 'todo', nextStatus: 'in-progress', nextLabel: 'Start →' },
  { id: 'in-progress', label: 'In Progress', dot: '#f59e0b', cls: 'prog', nextStatus: 'completed',   nextLabel: 'Done ✓' },
  { id: 'completed',   label: 'Completed',   dot: '#10b981', cls: 'done', nextStatus: 'todo',         nextLabel: '↺ Reopen' },
];

const KanbanCol = ({ col, tasks, onEdit, onDelete, onStatusToggle }) => (
  <div className={`kanban-col ${col.cls}`}>
    <div className="kanban-col-header">
      <span className="kanban-col-dot" />
      <span className="kanban-col-title">{col.label}</span>
      <span className="kanban-col-count">{tasks.length}</span>
    </div>
    <div className="kanban-col-body">
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-3)', fontSize: '.82rem' }}
          >
            {col.id === 'todo' ? '🎯 No tasks yet' : col.id === 'in-progress' ? '⚡ Nothing in progress' : '🎉 Nothing completed yet'}
          </motion.div>
        ) : tasks.map((task, i) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: .95 }}
            transition={{ delay: i * 0.05, duration: .3 }}
            layout
          >
            <TaskCard
              task={task}
              index={i}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusToggle={onStatusToggle}
              nextStatus={col.nextStatus}
              nextLabel={col.nextLabel}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

/* ── Main App Inner ──────────────────────────────────────────── */
const AppInner = () => {
  const { addToast } = useToast();

  const [activeNav, setActiveNav]         = useState('board');
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [filters, setFilters]             = useState({});
  const [sortOrder, setSortOrder]         = useState('desc');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask]     = useState(null);
  const [deleteTarget, setDeleteTarget]   = useState(null);
  const [formLoading, setFormLoading]     = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Build API params
  const apiParams = {
    ...(filters.status && filters.status !== 'all' ? { status: filters.status } : {}),
    ...(filters.priority && filters.priority !== 'all' ? { priority: filters.priority } : {}),
    ...(filters.search ? { search: filters.search } : {}),
    sortBy: filters.sortBy || 'createdAt',
    sortOrder,
  };

  const { tasks, stats, loading, statsLoading, error, createTask, updateTask, deleteTask, quickStatusUpdate } =
    useTasks(apiParams);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const colTasks = {
    'todo':        tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    'completed':   tasks.filter(t => t.status === 'completed'),
  };

  /* Handlers */
  const handleOpenCreate = () => { setEditingTask(null); setTaskModalOpen(true); };
  const handleOpenEdit   = (task) => { setEditingTask(task); setTaskModalOpen(true); };
  const handleCloseModal = () => { if (!formLoading) { setTaskModalOpen(false); setEditingTask(null); } };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        addToast('Task updated! ✏️', 'success');
      } else {
        await createTask(formData);
        addToast('Task created! 🎉', 'success');
      }
      setTaskModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteTask(deleteTarget._id);
      addToast('Task deleted 🗑️', 'success');
      setDeleteTarget(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusToggle = async (id, status) => {
    try {
      await quickStatusUpdate(id, status);
      const labels = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Completed' };
      addToast(`Moved to ${labels[status]} ✓`, 'info');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const today = format(new Date(), 'EEEE, MMM d');

  return (
    <div className="app-layout">
      {/* Mobile hamburger */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} id="mobile-hamburger" aria-label="Open menu">
        <IoMenuOutline size={22} />
      </button>

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={(id) => { setActiveNav(id); setSidebarOpen(false); }}
        taskCount={stats.total}
        onAddTask={handleOpenCreate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="main-content">

        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1>
              {activeNav === 'board' ? '📋 Task Board' :
               activeNav === 'all'   ? '🗂️ All Tasks'  : ''}
            </h1>
            <p>Stay organized. Move fast. Ship more.</p>
          </div>
          <div className="header-right">
            <span className="header-date">{today}</span>
            <button className="btn btn-primary btn-sm" onClick={handleOpenCreate} id="header-add-btn">
              <IoAddCircleOutline size={16} />
              New Task
            </button>
          </div>
        </header>

        {/* Page */}
        <main className="page-content">

          {/* Stats */}
          <StatsCards stats={stats} loading={statsLoading} />

          {/* Progress */}
          {stats.total > 0 && (
            <div className="progress-section">
              <div className="progress-bar-wrapper">
                <div className="progress-header">
                  <span className="progress-label">Overall Completion</span>
                  <span className="progress-percent">{completionRate}%</span>
                </div>
                <div className="progress-track" role="progressbar" aria-valuenow={completionRate} aria-valuemin={0} aria-valuemax={100}>
                  <div className="progress-fill" style={{ width: `${completionRate}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <TaskFilters
            filters={filters}
            onChange={setFilters}
            taskCount={tasks.length}
            sortOrder={sortOrder}
            onSortOrderToggle={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
          />

          {/* Board or List */}
          {loading ? <Loader /> : error ? (
            <EmptyState />
          ) : activeNav === 'board' && !filters.search && (!filters.status || filters.status === 'all') ? (
            /* ── Kanban Board ── */
            <div className="kanban-board">
              {COLS.map(col => (
                <KanbanCol
                  key={col.id}
                  col={col}
                  tasks={colTasks[col.id]}
                  onEdit={handleOpenEdit}
                  onDelete={setDeleteTarget}
                  onStatusToggle={handleStatusToggle}
                />
              ))}
            </div>
          ) : (
            /* ── Grid List (when filtering/searching) ── */
            tasks.length === 0 ? <EmptyState onAddTask={handleOpenCreate} /> : (
              <div className="tasks-grid">
                <AnimatePresence>
                  {tasks.map((task, i) => (
                    <motion.div key={task._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: .95 }}
                      transition={{ delay: i * 0.04 }}
                      layout
                    >
                      <TaskCard
                        task={task}
                        index={i}
                        onEdit={handleOpenEdit}
                        onDelete={setDeleteTarget}
                        onStatusToggle={handleStatusToggle}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )
          )}
        </main>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={taskModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? '✏️ Edit Task' : '✨ New Task'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={handleCloseModal} disabled={formLoading} id="form-cancel-btn">Cancel</button>
            <button className="btn btn-primary" type="submit" form="task-form" disabled={formLoading} id="form-submit-btn">
              {formLoading ? 'Saving…' : editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </>
        }
      >
        <TaskForm onSubmit={handleFormSubmit} initialData={editingTask} loading={formLoading} />
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => !deleteLoading && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete this task?"
        message={`"${deleteTarget?.title}" will be permanently removed. This cannot be undone.`}
        loading={deleteLoading}
      />
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <AppInner />
  </ToastProvider>
);

export default App;
