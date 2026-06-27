const express = require('express');
const router = express.Router();
const {
  getTasks,
  getStats,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { taskValidationRules, validate } = require('../middleware/validation');

// Stats route (must be before /:id to avoid conflict)
router.get('/stats', getStats);

// Task CRUD routes
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', taskValidationRules, validate, createTask);
router.put('/:id', taskValidationRules, validate, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
