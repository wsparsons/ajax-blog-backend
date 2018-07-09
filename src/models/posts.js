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
  const errors = []
  let response;
  const post = posts.find(post => post.id === id)
  if(!post){
    errors.push(`Could not find account with ID of ${id}`)
    response = { errors }
  } else {
    post.name = name
    post.recipe = recipe
    response = post
  }
  return response
}

function remove(id){
  const errors = []
  let response;
  const post = posts.find(post => post.id === id)
  if(!post){
    errors.push(`Could not find account with ID of ${id}`)
    response = { errors }
  } else {
    const index = posts.indexOf(post)
    posts.splice(index, 1)
    response = post
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
