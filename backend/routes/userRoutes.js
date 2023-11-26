const express = require('express');
const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// Routes 
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe) // protect middleware will run first and makes the route Private

module.exports = router;