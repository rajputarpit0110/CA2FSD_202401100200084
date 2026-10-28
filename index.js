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
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error.message)
    })