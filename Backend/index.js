import "dotenv/config";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./db/connectDB.js"
import UserRoute from "./routes/user.route.js"
import CaptainRoute from "./routes/captain.route.js"
import MailRoute from "./routes/mail.route.js"

const app = express()

// Database 
connectDB()


// Middleware

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://factory-snowy.vercel.app"
    ],
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())


// Routes 

app.use("/user", UserRoute)
app.use("/captain", CaptainRoute)
app.use("/", MailRoute)



// Route on /

app.get("/", (req, res) => {
    res.send("𝓕𝓐𝓒𝓣𝓞𝓡𝓨")
})


// Server 
const PORT = process.env.PORT || 2005

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})