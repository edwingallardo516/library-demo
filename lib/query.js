'use strict'
const connectDB = require('./db')
const {ObjectId} = require('mongodb')

async function getBooks() {
    let db, books = []
    try {
        db = await connectDB()
        books = await db.collection('books').find().toArray()
    } catch (error) {
        console.error(error)
    }
    return books
}

async function getBook(root, {isbn}) {
    let db, book = []
    try {
        db = await connectDB()
        book = await db.collection('books').findOne({isbn: isbn})
    } catch (error) {
        console.error(error)
    }
    return book
}

async function searchBook(root,{keyword}) {
    let db
    let items, books
    try {
        db = await connectDB()
        books = await db.collection('books').find(
            { $text: { $search: keyword} }).toArray()
        items = books
    } catch (error) {
        console.error(error)
    }
    return items
}

module.exports = {
    getBooks,
    getBook,
    searchBook
}