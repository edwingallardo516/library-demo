'use strict'
const connectDB = require('./db')

async function getId() {
    let db,books = []
    let ids = []
    try {
        db = await connectDB()
        books = await db.collection('books').find().toArray()
        for (let i=0; i<books.length; i++) {
            if(Number.isInteger(books[i]._id)) { ids.push(books[i]._id) }
        }
        for (let id=10; id<ids.length; id++) {
            if(ids.indexOf(id)== -1){ return id }
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getId
}