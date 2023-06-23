import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/User.js";

dotenv.config();


// route -> register the User
export const registerUser = async (req, res) => {
    try {
        const isUserExists = await User.findOne({ email: req.body.email });

        if (isUserExists) {
            throw new Error("User already exists !....");
        }

        const hashPassword = await bcrypt.hash(req.body.password, 13);

        const newUser = await User.create({ ...req.body, password: hashPassword });

        const { password, ...others } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SRT, {
            expiresIn: "4h"
        });

        res.status(201).json({ others, token })
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// route -> login the user

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            throw new Error("User is not registered Please register");
        }

        const verify = await bcrypt.compare(req.body.password, user.password)
        if (!verify) {
            throw new Error("Wrong credential")
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SRT, { expiresIn: '4h' })
        const { password, ...others } = user._doc

        res.status(201).json({ others, token })

    } catch (error) {
        res.status(502).json(error)
    }
}