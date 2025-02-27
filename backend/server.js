import express, { urlencoded } from "express"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express()
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo DB connected"))
    .catch(err => console.log("MongoDB connection error", err))


import userRoutes from "./routes/users.js"
app.use("/api/users", userRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`))