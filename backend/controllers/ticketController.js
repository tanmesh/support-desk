const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get all tickets for a user
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    const tickets = await Ticket.find({ user: user._id })

    res.status(200).json(tickets)
})


// @desc    Create a ticket for a user
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please enter all fields.')
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    // Create ticket
    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @desc    Get a ticket for a user
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found.')
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    res.status(200).json(ticket)
})

// @desc    Delete a ticket for a user
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found.')
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    await ticket.deleteOne()

    res.status(200).json({ message: 'Ticket removed.' })
})

// @desc    Update the ticket for a user
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found.')
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}