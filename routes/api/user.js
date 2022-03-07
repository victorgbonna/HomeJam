const express = require('express')
const jwt= require('jsonwebtoken')

const { loginUser,addUser, getUser, getUsers, deleteUser } = require('../../modules/user/service')
const { getUserClasses } = require('../../modules/class/service')
const { requireGuest, requireAuth, requireCurrentUser } = require('../../middleware/authMiddleware')

const router = express.Router()

//register user requireGuest
router.post('/register',requireGuest, async (req, res) => {
  try{
    const user= await addUser(req.body)
    return res.json({user})  
  } 
  catch(e){
    return res.json({error:e})
  }
})

//login user route
router.post('/login',requireGuest, async (req, res) => {
    try{
      const {user,token}=await loginUser(req.body)
      res.cookie('jwt', token, {httpOnly:true, maxAge: 24 * 60 * 60 * 1000})
      return res.json({user})
    }
    catch(e){
      console.log(e)
      return res.json({error:e})
  }
})
//logout user route ,requireAuth
router.get('/logout',requireAuth, async (req, res) => {
  try{
    res.cookie('jwt', '', {maxAge:1})
    return res.json({message:'logged out successfully'})
  }
  catch(e){
    console.log(e)
    return res.json({error:e})
}
})

//get user 
router.get('/getUser/:userId', async (req, res) => {
  try{
    const user= await getUser(req.params.userId)
    if(!user){
      return res.json({error:'no user'})
    }
    return res.json({user})  
  } 
  catch(e){
    console.log(e)
    return res.json({error:e})
  }
})
// get users with conditions e.g /?name=victorogbonna. it returns everything by default
router.get('/getUsers/all', async (req, res) => {
  const conditions=req.query
  try{
    const users= await getUsers({conditions})
    return res.json({users}) 
  } 
  catch(e){
    return res.json({error:e})
  }
})
// get user classes
router.get('/getUser/:userId/classes', async (req, res) => {
  try{
    const userClasses= await getUserClasses(req.params.userId)
    return res.json({userClass:userClasses}) 
  } 
  catch(e){
    return res.json({error:e})
  }
})
//delete user [requireAuth,requireCurrentUser]
router.delete('/deleteUser/:userId',requireCurrentUser, async (req, res) => {
  try{
    const deleted= await deleteUser(req.params.userId)
    return res.json({deleted})
  } 
  catch(e){
    return res.json({error:e})
  }
})
module.exports=router