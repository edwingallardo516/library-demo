const { MongoClient } = require('mongodb')

const url = `mongodb+srv://edwin1:12345@curso-platzi.foj8m.mongodb.net/library?retryWrites=true&w=majority`
let connection

async function connectDB() {
    if(connection) return connection

    let client
    try {
        client = await MongoClient.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
        console.log('db conectada con exito');
        connection = client.db("library")
    }

    catch(error) {
        console.error('Could not connect to db', error)
        process.exit(1)
    }
    return connection  
}

module.exports = connectDB;

