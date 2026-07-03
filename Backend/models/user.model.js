import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [2, "Name Must be at Least 2 Characters Long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [11, "Email Must be at Least 11 Characters Long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});


// generate jwt
UserSchema.methods.generateAuthToken = function () {
    const token =  jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    return token;
};

// compare password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// hassh password
UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 11);
};



const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
