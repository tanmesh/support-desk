const express = require('express');
const {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
} = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// Re-routes to noteRoutes
const notesRouter = require('./noteRoutes')
router.use('/:ticketId/notes', notesRouter)

// Routes
router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket)

router.route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router;