'use strict'

const express = require('express')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolver')

// start server
const app = express()
const port = process.env.port || 3000

// Scheme 
const typeDefs = readFileSync(
    join(__dirname,'lib','schema.graphql'),'utf-8')

const schema = makeExecutableSchema({typeDefs,resolvers})

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  }))

  app.listen(port, () => {
    console.log('Server is listening at http://localhost:3000/api')
  })