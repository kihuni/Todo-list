const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

require('dotenv').config

//setting up server
app.set('view engine', 'ejs')
app.use(express.static('public')) // access the body
//makes the middleware possible
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let PORT = 3000 
let db,
    dbConnectionStr = 'mongodb+srv://stephen:Stevo1000@cluster0.t7mwh.mongodb.net/Quotes?retryWrites=true&w=majority',
    dbName = 'Quotes'

    // connecting to mongodb
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
    })

app.listen(process.env.PORT/*for when heroku assigns a new port */ || PORT/*default port */, () => {
        console.log(`Server running on port ${PORT}`)
})
    

app.get('/',async(req, res) => {
    const todoItems = await db.collection('quotes').find().toArray()
    const itemsLeft = await db.collection('quotes').find().countDocuments({ completed: false })
    response.render('app.ejs', {items: todoItems, left: itemsLeft})
})