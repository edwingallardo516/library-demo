'use strict'
const connectDB = require('./db')

async function getId() {
    let db,books = []
    let id
    try {
        db = await connectDB()
        books = await db.collection('books').find().toArray()
        for (let i=0; i<books.length; i++) {
            if (i+1 != books[i]._id) {
                id = i + 1
                return id
            }
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getId
}