import mongoose from "mongoose"

const BlackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 86400
    }
})

const BlackList = mongoose.model("blacklisttoken", BlackListTokenSchema)
export default BlackList