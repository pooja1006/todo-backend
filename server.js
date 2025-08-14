const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const taskRoutes = require("./routes/taskroutes")
const authRoute = require("./routes/authroute")

const app = express()

app.use(cors())

app.use(express.json())

app.use('/tasks',taskRoutes)
app.use('/auth', authRoute);


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('Mongodb connected');
    app.listen(process.env.PORT, ()=> {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log('Mongodb cont connected',err);
})