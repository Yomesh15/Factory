import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("DataBase Connected !");
    } catch (error) {
        console.log(error);
        console.log("Fail to Connect DataBase !");
    }
}

export default connectDB