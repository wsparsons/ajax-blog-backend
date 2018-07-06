// controllers
const model = require('../models/posts')

function getAll(req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function getOne(req, res, next) {
  const id = req.params.id
  const data = model.getOne(id)
  if (!data) {
    return next({
      status: 404,
      message: `Could not find post with ID of ${id}`
    })
  }
  res.status(200).json({ data })
}

function create(req, res, next) {
  const { title, content } = req.body
  
  const data = model.create(title, content)
  if (data.errors) {
    return next({
      status: 400,
      message: `Could not create new post`,
      errors: data.errors
    })
  }
  res.status(201).json({ data })
}

function update(req, res, next) {
  const id = req.params.id
  const { title, content } = req.body
  const data = model.update(id, title, content)
  if (data.errors) {
    return next({
      status: 404,
      message: `Could not update new post`,
      errors: data.errors
    })
  }
  res.status(200).json({ data })
}

function remove(req, res, next) {
  const id = req.params.id
  const data = model.remove(id)
  if (data.errors) {
    return next({
      status: 404,
      message: `Could not delete post`,
      errors: data.errors
    })
  }
  res.status(204).json({ data })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
