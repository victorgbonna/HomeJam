const config=require('./config/config')
const jwt =require('jsonwebtoken')
const cookieparser=require('cookie-parser')
const express=require('express')
const connectDB=require('./config/db')

const apiUserRoute=require('./routes/api/user')
const apiClassRoute=require('./routes/api/class')


connectDB()
const app= express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieparser())

app.use('/api/user', apiUserRoute)
app.use('/api/class', apiClassRoute)
// app.use('/api/order', apiOrderRoute)


app.listen(config.port,()=>{
    console.log(`Server running in ${config.nodeEnv} on port ${config.port} on db- ${config.mongoUrl}`);
})