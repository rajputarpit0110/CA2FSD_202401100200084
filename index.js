import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express()

dotenv.config()
app.use(express.json())

import bookRoute from "./src/routes/bookRoutes.js"
app.use("/api/books", bookRoute)

const port = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected successfully")
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error.message)
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});