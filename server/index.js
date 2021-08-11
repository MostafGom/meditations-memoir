import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()

// miidleware

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send("Welcome to Meditations Memoirs")
})


// MongoDB atlas --> cloud database
dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => app.listen(PORT,
  () => console.log(`running at port : ${PORT} and connected to DB ✔️✔️`)))
  .catch(error => { console.log(error.message) })

mongoose.set('useFindAndModify', false)