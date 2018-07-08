// models
const uuid = require('uuid/v4')
const posts = require('./data')

function getAll(){
  return posts
}

function getOne(id){
  return posts.find(post => post.id === id)
}

function create(name, recipe){
    const post = { id: uuid(), name, recipe}
    posts.push(post)
    return post
}

function update(id, name, recipe){
  const post = posts.find(post => post.id === id)
  post.name = name
  post.recipe = recipe
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
