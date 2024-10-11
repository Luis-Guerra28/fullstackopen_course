const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')

const mongoUrl = config.MONGO_URI

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('Conneting to ', mongoUrl)
  })
  .catch(error => {
    logger.error('Error connecting with MongoDB\n', error)
  })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app