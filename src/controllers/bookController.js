import Book from "../models/bookModel.js"

const addBook = async (req,res)=>{
    const {title,author,category} = req.body ?? {};
    
    if(!title || !author || !category){
        return res
        .status(400)
        .json({
            message : "All three fields are required"
        })
    }

    try {
        const book = await Book.create({ title, author, category })
        return res.status(201).json({
            message: "Book added successfully",
            book
        })
    } catch (error) {
        const statusCode = error.name === "ValidationError" ? 400 : 500
        return res
        .status(statusCode)
        .json({
            message: statusCode === 400 ? "Book details are invalid" : "Error adding book"
        })
    }
}


const getBook = async(req,res)=>{
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1)
    const limit = Math.max(Number.parseInt(req.query.limit, 10) || 10, 1)

    try {
        const [books, totalRecords] = await Promise.all([
            Book.find().skip((page - 1) * limit).limit(limit),
            Book.countDocuments()
        ])

        return res.status(200).json({
            books,
            currentPage: page,
            totalRecords
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving books"
        })
    }
}

const updateBook = async(req,res)=>{
    const { available } = req.body ?? {}

    if (typeof available !== "boolean") {
        return res.status(400).json({
            message: "Availability must be true or false"
        })
    }

    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { available },
            { new: true, runValidators: true }
        )

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        return res.status(200).json({
            message: "Book availability updated successfully",
            book
        })
    } catch (error) {
        const statusCode = error.name === "CastError" ? 400 : 500
        return res.status(statusCode).json({
            message: statusCode === 400 ? "Invalid book ID" : "Error updating book"
        })
    }
}


export {
    addBook,
    getBook,
    updateBook
}