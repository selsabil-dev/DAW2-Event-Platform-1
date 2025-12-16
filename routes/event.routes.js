// routes/event.routes.js
const express = require('express');
const router = express.Router();

const {
  createEventController,
  addComiteController,
  addInviteController,
  getEventsController,
  getEventDetailsController,
} = require('../controllers/event.controller');

const { verifyToken } = require('../middlewares/auth.middleware');
const { requirePermission } = require('../middlewares/permissions');
const { createEventValidation, validate } = require('../middlewares/event.validators');

router.post(
  '/create',
  verifyToken,
  requirePermission('create_event'),
  createEventValidation,
  validate,
  createEventController
);

router.post(
  '/:eventId/add-comite',
  verifyToken,
  requirePermission('create_event'),
  addComiteController
);

router.post(
  '/:eventId/add-invite',
  verifyToken,
  requirePermission('create_event'),
  addInviteController
);

router.get('/', getEventsController);
router.get('/:id', getEventDetailsController);

module.exports = router;
