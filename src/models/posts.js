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
    return post
}

function update(id, title, content){
  const post = posts.find(post => post.id === id)
  post.title = title
  post.content = content
  return post
}

function remove(id){
  const post = posts.find(post => post.id === id)
  const index = posts.indexOf(post)
  posts.splice(index, 1)
  return post
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
