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

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })


  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app