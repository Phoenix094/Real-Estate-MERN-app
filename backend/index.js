import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import routesIndex from './routes/index.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT;

// all the middleware for the frontend to get request and send response
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.URL).then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, (error) => {
        if (!error) {
            console.log(`app is running on Port : ${PORT}`);
        }
    })
}).catch((error) => {
    console.log("MongoDB is not Connected");
})


// Routes for the app 
app.use('/app', routesIndex)

