import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    if (!req.header.authorization) return res.status(403).json({ msg: "Unauthorized User...." })

    if (req.header.authorization && req.header.authorization.startsWith("Bearer ")) {
        const token = req.header.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SRT, (err, data) => {
            if (err) res.status(403).json({ msg: "Session expired login again ...." })
            else {
                req.user = data;
                next()
            }

        })
    }
}