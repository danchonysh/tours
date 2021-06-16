const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3030
const createConnection = require('./database/index.js')

const apiRouter = require('./routes/api')
const userRouter = require('./routes/user')

app.use('/', express.static(path.resolve(__dirname, './client')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)
app.use('/user', userRouter)

createConnection()
	.then(() => app.listen(PORT, () => console.log('Server has been started...')))
	.catch(err => console.log('Error: ', JSON.stringify(err)))