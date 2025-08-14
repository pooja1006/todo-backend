const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const taskRoutes = require("./routes/taskroutes")
const authRoute = require("./routes/authroute")

const app = express()

app.use(cors())

app.use(express.json())
app.get('/', (req, res) => {
    res.send('MongoDB connected ✅ — Server running on port 8080');
  });

app.use('/tasks',taskRoutes)
app.use('/auth', authRoute);


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('Mongodb connected');
    const port = process.env.PORT || 8080; //  for local dev
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
})
.catch((err)=> {
    console.log('Mongodb cont connected',err);
})