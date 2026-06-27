import { IoSearch, IoFunnelOutline, IoSwapVerticalOutline } from 'react-icons/io5';
import { SORT_OPTIONS } from '../../utils/constants';

const STATUS_OPTS = [
  { value: 'all', label: 'All Status' },
  { value: 'todo', label: '⬜ To Do' },
  { value: 'in-progress', label: '🔄 In Progress' },
  { value: 'completed', label: '✅ Completed' },
];

const PRIORITY_OPTS = [
  { value: 'all', label: 'All Priority' },
  { value: 'high', label: '△ High' },
  { value: 'medium', label: '◇ Medium' },
  { value: 'low', label: '▽ Low' },
];

const TaskFilters = ({ filters, onChange, taskCount, sortOrder, onSortOrderToggle }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filters-bar" role="search" aria-label="Filter and search tasks">
      {/* Search */}
      <div className="search-wrapper">
        <IoSearch size={16} className="search-icon" aria-hidden="true" />
        <input
          id="task-search"
          className="form-control search-input"
          placeholder="Search tasks by title, description or tag..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      {/* Status Filter */}
      <div className="filter-group">
        <IoFunnelOutline size={14} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
        <select
          id="filter-status"
          className="form-control filter-select"
          value={filters.status || 'all'}
          onChange={(e) => handleChange('status', e.target.value)}
          aria-label="Filter by status"
        >
          {STATUS_OPTS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          id="filter-priority"
          className="form-control filter-select"
          value={filters.priority || 'all'}
          onChange={(e) => handleChange('priority', e.target.value)}
          aria-label="Filter by priority"
        >
          {PRIORITY_OPTS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          id="filter-sort"
          className="form-control filter-select"
          value={filters.sortBy || 'createdAt'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          aria-label="Sort tasks by"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <button
          className="sort-btn"
          onClick={onSortOrderToggle}
          title={`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
          id="sort-order-btn"
          aria-label={`Sort order: ${sortOrder}`}
        >
          <IoSwapVerticalOutline size={16} />
          {sortOrder === 'desc' ? '↓' : '↑'}
        </button>
      </div>

      <span className="task-count" aria-live="polite">
        {taskCount} task{taskCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
};

export default TaskFilters;
