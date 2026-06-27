import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoCheckmarkDoneCircle,
  IoTimeOutline,
  IoListOutline,
  IoGridOutline,
  IoWarningOutline,
  IoBarChartOutline,
} from 'react-icons/io5';

const STAT_CONFIG = [
  { key: 'total', label: 'Total Tasks', icon: <IoListOutline />, cls: 'total', iconBg: 'rgba(129,140,248,0.15)', iconColor: 'var(--accent-primary)' },
  { key: 'completed', label: 'Completed', icon: <IoCheckmarkDoneCircle />, cls: 'completed', iconBg: 'rgba(34,197,94,0.15)', iconColor: 'var(--success)' },
  { key: 'inProgress', label: 'In Progress', icon: <IoBarChartOutline />, cls: 'in-progress', iconBg: 'rgba(167,139,250,0.15)', iconColor: 'var(--accent-purple)' },
  { key: 'todo', label: 'To Do', icon: <IoGridOutline />, cls: 'todo-stat', iconBg: 'rgba(148,163,184,0.15)', iconColor: 'var(--text-secondary)' },
  { key: 'overdue', label: 'Overdue', icon: <IoWarningOutline />, cls: 'overdue', iconBg: 'rgba(239,68,68,0.15)', iconColor: 'var(--danger)' },
];

const AnimatedNumber = ({ value }) => {
  return <span>{value}</span>;
};

const StatsCards = ({ stats, loading }) => {
  return (
    <div className="stats-grid" role="region" aria-label="Task statistics">
      {STAT_CONFIG.map((s, i) => (
        <motion.div
          key={s.key}
          className={`glass-card stat-card ${s.cls}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
        >
          <div
            className="stat-card-icon"
            style={{ background: s.iconBg, color: s.iconColor, fontSize: '1.4rem' }}
          >
            {s.icon}
          </div>
          <div className={`stat-card-number ${s.cls}`} aria-label={`${s.label}: ${loading ? 'loading' : stats[s.key]}`}>
            {loading ? '—' : <AnimatedNumber value={stats[s.key]} />}
          </div>
          <div className="stat-card-label">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
