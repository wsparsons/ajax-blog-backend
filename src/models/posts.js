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
  const post = { id: uuid(), title, content }
  posts.push(post)
}

function update(id, title, content){
  const errors = []
  let response
  const post = posts.find(post => post.id === id)
  if(!post){
    errors.push(`Cannot find post with ID of ${id}`)
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
  let response
  const post = posts.find(post => post.id === id)
  if(!post){
    errors.push(`Cannot find post with id of ${id}`)
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
