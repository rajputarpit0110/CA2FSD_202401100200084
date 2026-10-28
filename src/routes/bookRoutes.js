import express from "express"
import { addBook, getBook, updateBook } from "../controllers/bookController.js"
const router = express.Router()

router.post("/", addBook)

router.get("/", getBook)

router.patch("/:id", updateBook)

export default router