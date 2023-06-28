import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Beach", "Mountain", 'Village'],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 20
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqMeters: {
        type: Number,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        min: 2
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Property = mongoose.model('Property', PropertySchema);
export default Property