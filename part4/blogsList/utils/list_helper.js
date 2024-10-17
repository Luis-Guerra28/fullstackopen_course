const _ = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const favoriteBLog = (blogs) => {
  let favorite = {
    likes: 0
  }
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  const authorsCounter = _.countBy(blogs, 'author')
  const [author, blogsNum] = _.maxBy(
    Object.entries(authorsCounter),
    ([author, blogsNum]) => blogsNum
  )

  return {
    author,
    blogs: blogsNum
  }
}

const mostLikes = (blogs) => {
  const authorsBlogs = _.groupBy(blogs, 'author')
  const authorsLikes = _.mapValues(
    authorsBlogs,
    (authorBlogs) =>  _.sumBy(authorBlogs, 'likes')
  )

  const [author, likes] = _.maxBy(
    Object.entries(authorsLikes),
    ([author, likes]) => likes
  )
  return {
    author,
    likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBLog,
  mostBlogs,
  mostLikes
}