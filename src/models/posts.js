// models
const uuid = require('uuid/v4')
const posts = require('./data')

function getAll() {
  return posts
}

function getOne(id) {
  const errors = []
  let response;
  const getPost = posts.find(post => post.id === id)
  if (!getPost) {
    errors.push(`Could not find post with ID of ${id}`)
    response = {
      errors
    }
    return response
  }
  return getPost
}

function create(body) {
  const errors = []
  const name = body.name
  const recipe = body.recipe
  let response
  if (!name || !recipe) {
    errors.push(`Name and recipe are required`)
    response = {
      errors
    }
    return response
  }

  const newPost = {
    id: uuid(),
    name,
    recipe
  }
  posts.push(newPost)
  return newPost
}

function update(id, body) {
  const errors = []
  const name = body.name
  const recipe = body.recipe
  const updatePost = posts.find(post => post.id === id)
  let response;

  if (!updatePost) {
    errors.push(`Could not find account with ID of ${id}`)
    response = {
      errors
    }
    return response
  }

  if (!name || !recipe) {
    errors.push(`Name and recipe are required`)
    response = {
      errors
    }
    return response
  }

  updatePost.name = name
  updatePost.recipe = recipe
  return updatePost
}

function remove(id) {
  const errors = []
  const deletePost = posts.find(post => post.id === id)
  let response;

  if (!deletePost) {
    errors.push(`Could not find account with ID of ${id}`)
    response = {
      errors
    }
  }

  const index = posts.indexOf(deletePost)
  posts.splice(index, 1)
  return deletePost
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
