const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8000;

// connect to database 
connectDB();

const app = express();

app.use(express.json()) // allows to send raw json
app.use(express.urlencoded({ extended: false })) // allows to receive  data

app.get('/', (req, res) => {
    res.send('hello');
})

// Routes 
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))