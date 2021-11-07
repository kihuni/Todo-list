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
    dbConnectionStr = process.env.DB_String,
    dbName = 'Quotes'

    // connecting to mongodb
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
    })

app.listen(process.env.PORT/*for when heroku assigns a new port */ || PORT/*default port */, () => {
        console.log(`Server running on port ${PORT}`)
})
    

app.get('/', async(req, res) => {
    const todoItems = await db.collection('quotes').find().toArray() //grab from database
    const itemsLeft = await db.collection('quotes').find().countDocuments({ completed: false })
    response.render('app.ejs', {items: todoItems, left: itemsLeft})
})

app.post('/addItems', (req, res) => {
    db.collection('quotes').insertOne({ thing: request.body.todoItem, completed: false })
    .then(result =>{

        console.log('Todo added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})
