import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js'
import { verifyToken } from "../middlewares/verifyToken.js"
import { getAll, getFetured, getSpecific, getType, getTypeCount, createProperty, updateProperty, deleteProperty } from '../controllers/property.js'
import { upload, uploadImage } from '../controllers/upload.js'

const router = express.Router()



router.post('/register', registerUser)
router.post('/login', loginUser)


router.get('property/getAll', getAll);
router.get('property/findFetured', getFetured);
router.get('property/find', getType);
router.get('property/find/type', getTypeCount);
router.get('property/find/:id', getSpecific);

router.post('/property/', verifyToken, createProperty);
router.put('/property/:id', verifyToken, updateProperty);
router.delete('/property/:id', verifyToken, deleteProperty)

router.post('/upload/image', upload.single("image"), uploadImage)

export default router