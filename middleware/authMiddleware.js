const jwt= require('jsonwebtoken')
const config=require('../config/config');

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        // throw 'You are not logged in'
        return res.json({error:'You are not logged in'})
    }
    jwt.verify(token, config.secretToken, (err, decodedToken)=>{
        if(err){
            // throw 'You are not logged in'
            return res.json({error:'You are not logged in'})
        }
        // console.log(decodedToken)
        return next()
    })
}
const requireInstructor=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        // throw 'You are not logged in'
        return res.json({error:'You are not logged in'})
    }
    jwt.verify(token, config.secretToken, (err, decodedToken)=>{
        if(err){
            // throw 'You are not logged in'
            return res.json({error:'You are not logged in'})
        }
        if(!decodedToken.isInstructor){
            // throw 'You are forbidden'
            return res.status(403).json({error:'You are forbidden'})
        }
        return next()
    })
}
const requireCurrentUser=(req, res, next)=>{
    const token=req.cookies.jwt;
    if(!token){
        // throw 'You are not logged in'
        return res.json({error:'You are not logged in'})
    }
    jwt.verify(token, config.secretToken, (err, decodedToken)=>{
    if(err){
            // throw 'You are not logged in'
            return res.json({error:'You are not logged in'})
        }
        // const [tokenId,paramsId, bodyId]=[decodedToken.id,req.params.userId,req.body.userId]
        // console.log({tokenId,paramsId,bodyId})
        if((decodedToken.id!=req.params.userId) && (decodedToken.id!=req.body.userId)){
            // throw 'You are forbidden'
            return res.status(403).json({error:'You are forbidden not a in decoded'})
        }
        return next()
    })
}

const requireGuest=(req,res,next)=>{
    const token=req.cookies.jwt;
    if (token){
        return res.status(404).json({'message':'you are already logged in'})
    }
    console.log('passed this stage')
    return next()

}
module.exports= {requireAuth, requireCurrentUser, requireGuest, requireInstructor}
