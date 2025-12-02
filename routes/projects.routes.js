const express = require('express');
const router = express.Router();
const controller = require('../controllers/projects.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);
router.delete('/', requireAuth, controller.removeAll);

module.exports = router;
