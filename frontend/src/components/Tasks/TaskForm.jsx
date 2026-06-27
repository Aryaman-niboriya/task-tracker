import { useState, useEffect } from 'react';
import { DEFAULT_TASK_FORM } from '../../utils/constants';
import { IoClose } from 'react-icons/io5';

const STATUS_OPTIONS = [
  { value: 'todo', label: '⬜ To Do' },
  { value: 'in-progress', label: '🔄 In Progress' },
  { value: 'completed', label: '✅ Completed' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: '▽ Low' },
  { value: 'medium', label: '◇ Medium' },
  { value: 'high', label: '△ High' },
];

const validate = (data) => {
  const errors = {};
  if (!data.title.trim()) errors.title = 'Title is required';
  else if (data.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';
  else if (data.title.trim().length > 100) errors.title = 'Title cannot exceed 100 characters';
  if (data.description && data.description.length > 500) errors.description = 'Description cannot exceed 500 characters';
  return errors;
};

const TaskForm = ({ onSubmit, initialData, loading }) => {
  const [form, setForm] = useState(DEFAULT_TASK_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
      });
    } else {
      setForm(DEFAULT_TASK_FORM);
    }
    setErrors({});
    setTouched({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ title: true, description: true });
    if (Object.keys(errs).length > 0) return;

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      dueDate: form.dueDate || null,
    };
    onSubmit(payload);
  };

  const charCount = form.description?.length || 0;

  return (
    <form onSubmit={handleSubmit} noValidate id="task-form">
      {/* Title */}
      <div className="form-group">
        <label className="form-label" htmlFor="task-title">
          Title <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="task-title"
          name="title"
          className={`form-control ${errors.title ? 'border-danger' : ''}`}
          style={{ borderColor: errors.title ? 'var(--danger)' : undefined }}
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={100}
          autoFocus
          aria-required="true"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <span className="form-error" id="title-error">⚠ {errors.title}</span>}
      </div>

      {/* Description */}
      <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
        <label className="form-label" htmlFor="task-description">
          Description{' '}
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', fontSize: '0.75rem' }}>
            ({charCount}/500)
          </span>
        </label>
        <textarea
          id="task-description"
          name="description"
          className="form-control"
          placeholder="Add more details about this task..."
          value={form.description}
          onChange={handleChange}
          maxLength={500}
          style={{ borderColor: errors.description ? 'var(--danger)' : undefined }}
          aria-describedby={errors.description ? 'desc-error' : undefined}
        />
        {errors.description && <span className="form-error" id="desc-error">⚠ {errors.description}</span>}
      </div>

      {/* Status + Priority */}
      <div className="form-grid" style={{ marginTop: 'var(--space-4)' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            name="status"
            className="form-control"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            className="form-control"
            value={form.priority}
            onChange={handleChange}
          >
            {PRIORITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Due Date + Tags */}
      <div className="form-grid" style={{ marginTop: 'var(--space-4)' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="task-due-date">Due Date</label>
          <input
            type="date"
            id="task-due-date"
            name="dueDate"
            className="form-control"
            value={form.dueDate}
            onChange={handleChange}
            style={{ colorScheme: 'dark' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-tags">
            Tags{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', fontSize: '0.75rem' }}>
              (comma separated)
            </span>
          </label>
          <input
            id="task-tags"
            name="tags"
            className="form-control"
            placeholder="design, frontend, urgent"
            value={form.tags}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
