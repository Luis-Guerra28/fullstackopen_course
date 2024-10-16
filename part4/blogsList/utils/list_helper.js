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

module.exports = {
  dummy,
  totalLikes,
  favoriteBLog
}