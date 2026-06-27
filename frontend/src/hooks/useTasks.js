import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/api';

export const useTasks = (filters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, todo: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const res = await taskService.getAll(params);
      setTasks(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await taskService.getStats();
      setStats(res.data);
    } catch (err) {
      console.error('Stats fetch error:', err.message);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    const res = await taskService.create(taskData);
    await Promise.all([fetchTasks(filters), fetchStats()]);
    return res.data;
  };

  const updateTask = async (id, taskData) => {
    const res = await taskService.update(id, taskData);
    await Promise.all([fetchTasks(filters), fetchStats()]);
    return res.data;
  };

  const deleteTask = async (id) => {
    await taskService.delete(id);
    await Promise.all([fetchTasks(filters), fetchStats()]);
  };

  const quickStatusUpdate = async (id, status) => {
    await taskService.update(id, { status });
    await Promise.all([fetchTasks(filters), fetchStats()]);
  };

  useEffect(() => {
    fetchTasks(filters);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    tasks,
    stats,
    loading,
    statsLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    quickStatusUpdate,
  };
};
