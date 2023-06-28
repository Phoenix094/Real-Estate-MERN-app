import Property, { findByIdAndUpdate } from '../models/Property.js'


//get all Property

export const getAll = async (req, res) => {
    try {
        const properties = await Property.find({}).populate('currentOwner', '-password');

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

// Get all type of property count

export const getTypeCount = async (req, res) => {
    try {
        const beachType = await Property.countDocuments({ type: "Beach" }).populate('currentOwner', '-password')
        const mountainType = await Property.countDocuments({ type: "Mountain" }).populate('currentOwner', '-password')
        const villageType = await Property.countDocuments({ type: "Village" }).populate('currentOwner', '-password')

        res.status(200).json({
            beach: beachType,
            mountain: mountainType,
            village: villageType
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// get a specific prpperty 

export const getSpecific = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner', '-password')

        if (!property) {
            throw new Error("There is no such Property with that ID")

        } else {
            res.status(200).json(property)
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//create a new Property

export const createProperty = async (req, res) => {
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id })

        return res.status(201).json(newProperty)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Updating the Property

export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property.currentOwner !== req.user.id) {
            throw new Error("There is no such property")
        } else {
            const updatedProperty = await Property.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )

            res.status(200).json(updateProperty)
        }

    } catch (error) {
        res.status(500).json(error.message);
    }
}

// deleting the property 

export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)

        if (property.currentOwner !== req.user.id) {
            throw new Error("You can't delete this Property")
        } else {
            await property.deleteOne()
            res.status(200).json({ msg: "Property has been deleted" })
        }

    } catch (error) {
        res.status(500).json(error.message);
    }
}