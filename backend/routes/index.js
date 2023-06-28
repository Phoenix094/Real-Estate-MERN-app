import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js'
import { verifyToken } from "../middlewares/verifyToken.js"
import { getAll, getFetured, getSpecific, getType, getTypeCount, createProperty, updateProperty, deleteProperty } from '../controllers/property.js'

const router = express.Router()



router.post('/register', registerUser)
router.post('/login', loginUser)


router.get('/getAll', getAll);
router.get('/findFetured', getFetured);
router.get('/find', getType);
router.get('/find/type', getTypeCount);
router.get('/find/:id', getSpecific);

router.post('/', verifyToken, createProperty);
router.put('/:id', verifyToken, updateProperty);
router.delete('/:id', verifyToken, deleteProperty)

export default router