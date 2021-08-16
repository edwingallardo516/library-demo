'use strict'
//const {ObjectId} = require('mongodb')
const connectDB = require('./db')
const resolverTypes = require('./assignmentId')

async function addBook(root,{input}) {
    const id = await resolverTypes.getId()
    const defaults = {
        _id: id,
        isbn: '',
        pageCount: '',
        thumbnailUrl: '',
        shortDescription: '',
        longDescription: ''
    }
    const newbook = Object.assign(defaults,input)

    let db
    try {
        db = await connectDB()
        await db.collection('books').insertOne(newbook)
    } catch (error) {
        console.error(error)
    }
    return newbook
}

async function editBook(root, {isbn,input}) {
    let db
    let book
    try {
        db = await connectDB()
        await db.collection('books').updateOne(
            {isbn: isbn},
            {$set: input})

        book = await db.collection('books').findOne({ isbn: isbn})
    } catch (error) {
        console.error(error)
    }
    return book
}

async function removeBook(root, { isbn }) {
    let db, bookDelete
    try {
        db = await connectDB()
        bookDelete = await db.collection('books').deleteOne({isbn:isbn})
    } catch (error) {
        console.error(error)
    }
    return bookDelete.deletedCount
        ? "The Book was delete"
        : "The Book does not exist"
}

module.exports = {
    addBook,
    editBook,
    removeBook
}
