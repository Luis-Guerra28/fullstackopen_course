const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)
const _ = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  const initialBlogs = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = initialBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the blogs id are the correct name', async () => {
  const response = await api.get('/api/blogs')
  assert(Object.keys(response.body[0]).includes('id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog de prueba',
    author: 'Krespo',
    url: 'http://krespo.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes(newBlog.title))
})

test('A blog without likes can be added correctly', async () => {
  const newBlog = {
    title: 'Blog sin likes',
    author: 'Le pepe',
    url: 'http://Lepepe.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const blogAdded = _.find(blogsAtEnd, newBlog,
    (objValue, otherValue, key) => {
      if (key === 'likes') {
        return true
      }
    })

  assert.strictEqual(blogAdded.likes, 0)
})

test.only('a wrong blogs are not added', async () => {
  const wrongBlogs = [
    {
      title: 'Blog sin url',
      author: 'Krespo',
      likes: 0
    },
    {
      author: 'Krespo',
      url: 'http://withouttitle.com',
      likes: 0
    }
  ]

  await Promise.all(wrongBlogs.map(blog => {
    return api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  }))

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})




