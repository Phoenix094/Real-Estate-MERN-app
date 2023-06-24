import Property from '../models/Property.js'


//get all Property

export const getAll = async (req, res) => {
    try {
        const properties = await Property.find({});

        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//get Fetured property 

export const getFetured = async (req, res) => {
    try {
        const feturedProperty = Property.find({ featured: true }).populate('currentOwner', '-password')

        res.status(200).json(feturedProperty)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// get a specific type of property

export const getType = async (req, res) => {
    const type = req.query;

    try {
        if (type) {
            const properties = await Property.find(type).populate('currentOwner', '-password')

            res.status(200).json(properties)
        } else {
            res.status(402).json({ msg: "there is no type" })
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}