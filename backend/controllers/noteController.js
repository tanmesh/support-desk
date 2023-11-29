const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes/
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    const tickets = await Ticket.findById(req.params.ticketId)

    if (tickets.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    const note = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(note)
})

// @desc    Add notes for a ticket
// @route   POST /api/tickets/:ticketId/notes/
// @access  Private
const addNote = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    const tickets = await Ticket.findById(req.params.ticketId)

    if (tickets.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user._id,
        ticket: req.params.ticketId
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}