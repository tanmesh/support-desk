const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const path = require('path')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8000;

// connect to database 
connectDB();

var cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json()) // allows to send raw json
app.use(express.urlencoded({ extended: false })) // allows to receive  data

// Routes 
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))


// Serve frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('*', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))