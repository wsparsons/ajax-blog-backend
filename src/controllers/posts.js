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
  const { name, recipe } = req.body
  if(!name || !recipe){
    return next({
      status: 404,
      message: `Name and recipe are required`
    })
  }
  const data = model.create(name, recipe)
  if (!data) {
    return next({
      status: 400,
      message: `Could not create new post`,
    })
  }
  res.status(201).json({ data })
}

function update(req, res, next) {
  const id = req.params.id
  const { name, recipe } = req.body
  if(!name || !recipe){
    return next({
      status: 404,
      message: `Name and recipe are required`
    })
  }
  const data = model.update(id, name, recipe)
  if (!data) {
    return next({
      status: 400,
      message: `Could not update new post due to wrong ID of ${id}`,
    })
  }
  res.status(200).json({ data })
}

function remove(req, res, next) {
  const id = req.params.id
  const data = model.remove(id)
  if (!data) {
    return next({
      status: 404,
      message: `Could not delete post due to wrong ID of ${id}`,
    })
  }
  res.status(200).json({ data })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};
