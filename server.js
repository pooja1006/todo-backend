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
    const port = process.env.PORT || 4000; // 4000 for local dev
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
})
.catch((err)=> {
    console.log('Mongodb cont connected',err);
})