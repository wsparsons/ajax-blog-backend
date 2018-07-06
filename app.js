const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.disable('x-powered-by')


//// ROUTE
const postsRoute = require('./src/routes/posts')
app.use('/posts', postsRoute)


//// DEFAULT ROUTE
app.use(function(res, req, next) {
  const status = 404
  const message = `Route not found`
  next({status, message})
})

//// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err)
  const errorMessage = {}

  if (process.env.NODE_ENV !== 'development' && err.stack){
    errorMessage.stack = err.stack
  }

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})

//// STARTING SERVER
const port = process.env.PORT || 3000
const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)

//// MODULE EXPORTS
module.exports = app
