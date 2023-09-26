require('dotenv').config()
const express = require('express')
// const connectDB = require('./config.dbConn')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3001

connectDB()

app.use(express.json())

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')){
        res.send('page not found')
    }
    else if (req.accepts('json')){
        res.json({message : '404 not found'})
    }
})

mongoose.connection.once('open', ()=>{
    console.log('conn')
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`)
    })
})
mongoose.connection.on('error', err =>{
    console.log(err)

})

