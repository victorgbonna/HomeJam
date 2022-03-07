require('dotenv').config()

module.exports={
    port:parseInt(process.env.PORT) || 3000,
    secretToken:process.env.SECRET_KEY || 'keyboard cat',
    nodeEnv:process.env.NODE_ENV || 'development',
    mongoUrl:process.env.MONGODB_HOMEJAM || 'mongodb://localhost:27017/homejam'
}