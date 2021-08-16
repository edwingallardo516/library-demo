'use strict'

const queries = require('./query')
const mutations = require('./mutations')
const types = require('./types')

module.exports = {
    Query: queries,
    Mutation: mutations
}