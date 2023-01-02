import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import connectDB from './config/db.js'
import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs'


dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//parse req.body GET/POST
app.use(express.json())



//routes 
app.use('/api/users', userRoutes)




//open AI DEMO

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration)





app.post('/testing', async (req, res) => {

 console.log(req.body)

console.log( req.body.formData.subject)
  const subject = req.body.formData.subject
  const From = req.body.formData.from
  const To = req.body.formData.to
  const Reason = req.body.formData.reason
  const tone = req.body.value.name
  
  const completion = await openai.createCompletion({
    model: 'text-davinci-001',
    prompt: `Email in ${tone} from ${From} to ${To} due to ${Reason} about ${subject}`,
    temperature: 1,
    max_tokens: 250,
  })

  // const response = await openai.createEdit({
  //   model: "text-davinci-edit-001",
  //   input: "What day of the week is it?",
  //   instruction: "Make this in the voice of Donald Trump",
  // });

  res.status(200).json({ result: completion.data.choices[0] })


})


//we dont access __dirname when working with ES modules, it only available for common js modules, so path.resolve is used to mimic the __driname
const __dirname = path.resolve()

//making the uploads file static so browser can access it
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//after building react application giviing the access to react build version
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('api is running!')
  })
}


//error handling
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
