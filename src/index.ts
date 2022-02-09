import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { carRouter } from './routes/car'

const app = express()
app.use(json())
app.use(carRouter)
const url = `mongodb+srv://tonya:2th3ZVFdLS9TEGsO@cinema.a1y8o.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app.listen(5000, () => {
  console.log('server is listening on port 5000')
})