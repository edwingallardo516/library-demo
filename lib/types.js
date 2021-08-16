'use strict'
const resolverTypes = require('./assignmentId')
const {ObjectId} = require('mongodb')
const connectDB = require('./db')

module.exports = {
    Book: {
        title: async ({ title }) => {
            let titledata
            try {
                titledata = title
                    ? title
                    : 'No Title'

            } catch (error) {
                console.error(error)
            }
            return titledata
        },

        isbn: async ({ isbn }) => {
            let isbndata
            try {
                isbndata = isbn
                    ? isbn
                    : ''

            } catch (error) {
                console.error(error)
            }
            return isbndata
        },

        _id: async ({ _id }) => {
            let _idData
            try {
                if (_id) {
                    if(Number.isInteger(_id)){
                        _idData = _id; return _idData
                    }
                    _idData = await resolverTypes.getId(); return _idData
                } else {
                    _idData = await resolverTypes.getId(); return _idData
                }

            } catch (error) {
                console.error(error)
            }
        },

        shortDescription: async ({ shortDescription }) => {
            let shortDescriptionData
            try {
                shortDescriptionData = shortDescription
                    ? shortDescription
                    : 'Sin descripción'

            } catch (error) {
                console.error(error)
            }
            return shortDescriptionData
        }
    }
}