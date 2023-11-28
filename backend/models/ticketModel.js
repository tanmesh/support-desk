const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        product: {
            type: String,
            required: [true, 'PLease select a product.'],
            enum: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Apple TV', 'Beats', 'Accessories']
        },
        description: {
            type: String,
            required: [true, 'Please enter a description of the issue.'],
        },
        status: {
            type: String,
            required: true,
            default: 'new',
            enum: ['new', 'open', 'closed']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ticket', ticketSchema)