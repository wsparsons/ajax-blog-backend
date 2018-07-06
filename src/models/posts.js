// models
const uuid = require('uuid/v4')
const posts = require('./data')

function getAll(){
  return posts
}

function getOne(id){
  return posts.find(post => post.id === id)
}

function create(title, content){
  const errors = []
  let response
  if (!title) {
    errors.push('Title is required')
    response = { errors }
  } else if (!content) {
    errors.push('Content is required')
    response = { errors }
  } else {
    const post = { id: uuid(), title, content }
    posts.push(post)
    response = post
  }
  return response
}

function update(id, title, content){
  const errors = []
  const post = posts.find(post => post.id === id)
  let response
  if (!post) {
    errors.push(`Could not find post with ID of ${id}`)
    response = { errors }
  } else if (!title || !content){
    errors.push(`Title and content are required`)
    response = { errors }
  } else {
    post.title = title
    post.content = content
    response = post
  }
  return response
}

function remove(id){
  const errors = []
  const post = posts.find(post => post.id === id)
  let response
  if(!post){
    errors.push(`Could not find post with id of ${id}`)
    response = { errors }
  } else {
    response = post
    const index = posts.indexOf(post)
    posts.splice(index, 1)
  }
  return response
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
