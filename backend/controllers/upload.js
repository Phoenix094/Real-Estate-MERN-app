import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }
})

export const upload = multer({
    storage
})

export const uploadImage = async (req, res) => {
    try {
        res.status(200).json("file Uploaded Successfully");
    } catch (error) {
        res.status(500).json(error.message)
    }
}