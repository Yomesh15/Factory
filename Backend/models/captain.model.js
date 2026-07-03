import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const CaptainSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color Must be at Least 3 Characters Long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Number Plate Must be at Least 10 Characters Long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity Must be at Least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"]
        }
    },
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }
})


CaptainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

CaptainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

CaptainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 11)
}




const CaptainModel = mongoose.model("captain", CaptainSchema)
export default CaptainModel