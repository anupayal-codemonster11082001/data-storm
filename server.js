const express = require('express')
const mongo = require("mongoose")
const methodOverride = require('method-override');
const app = express()

app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//Importing and Assigning ENV variables
require('dotenv').config();
const database_url = process.env.MONGO

//Importing routes
const postRouter = require('./routes/post.js')

//Connecting to Mongo
app.use(express.json());
mongo.connect(database_url)
.then(() => console.log('Connected!'))
.catch(err => console.error('MongoDB Atlas Error:', err));


app.get('/',(req,res) => {
    res.render('form')
})

app.use('/post/',postRouter)

app.listen(5000)