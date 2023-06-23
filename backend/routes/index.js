import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js'

const router = express.Router()


router.get('/', (req, res) => {
    res.send('hello');
})

router.post('/register', registerUser)
router.post('/login', loginUser)

export default router