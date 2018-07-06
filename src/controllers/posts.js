// controllers
const model = require('../models/posts')

function getAll(req, res, next){
  const data = model.getAll()
  res.status(200).json({ data })
}

function getOne(req, res, next){
  const id = req.params.id
  if(!id){
    return next({
      status: 400,
      message: `Post id is required`
    })
  }
  const data = model.getOne(id)
  if(!data){
    return next({
      status: 404,
      message: `Cannot find post with ID of ${id}`
    })
  }
  res.status(200).json({ data })
}

function create(req, res, next){
  const { title, content } = req.body
  if(!title || !content){
    return next({
      status: 400,
      message: `Post title and content are required`
    })
  }
  const data = model.create(title, content)
  res.status(201).json({ data })
}

function update(req, res, next){
  const id = req.params.id
  if(!id){
    return next({
      status: 400,
      message: `Post id is required`
    })
  }
  const { title, content } = req.body
  if(!title || !content){
    return next({
      status: 400,
      message: `Post title and content are required`
    })
  }
  const data = model.update(id, title, content)
  if(data.errors){
    return next({
      status: 404,
      message: data.errors
    })
  }
  res.status(200).json({ data })
}

function remove(req, res, next){
  const id = req.params.id
  if(!id){
    return next({
      status: 400,
      message: `Post id is required`
    })
  }
  const data = model.remove(id)
  if(data.errors){
    return next({
      status: 404,
      message: data.errors
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
