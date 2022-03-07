const express = require('express')
const { requireInstructor, requireAuth, requireCurrentUser, requireClassInstructor } = require('../../middleware/authMiddleware')
const {joinClass, getClass, getClasses,getUsersInClass, 
      removeUserfromClass, leaveClass, 
      createClass, deleteClass} = require('../../modules/class/service')
const { getUser } = require('../../modules/user/service')
const router = express.Router()

//add class [requireAuth,requireInstructor]
router.post('/create',requireInstructor, async (req, res) => {
  try{
    await getUser(req.body.adminId)
    const classObj= await createClass(req.body.adminId)
    return res.json({classObj})  
  } 
  catch(e){
    return res.json({error:e})
  }
})

//join class, userId and classId as req body
router.post('/join/:id',requireCurrentUser, async (req, res) => {
    try{
      await getUser(req.body.userId)
      const classObj= await joinClass({classId:req.params.id,userId:req.body.userId})
      return res.json({classObj})  
    } 
    catch(e){
      return res.json({error:e})
    }
})

//get class 
router.get('/getClass/:id', async (req, res) => {
    try{
      const classObj = await getClass(req.params.id)
      return res.json({classObj})  
    } 
    catch(e){
      return res.json({error:e})
    }
})

//get all classes with conditions (/?name=400). it returns everything by default
router.get('/getClasses/all', async (req, res) => {
    try{
        const conditions= req.query
        const classes= await getClasses({conditions})
        return res.json({classes})  
    } 
    catch(e){
      return res.json({error:e})
    }
})
//get class members/users
router.get('/getClass/:id/users', async (req, res) => {
  try{
    const classObjmembers = await getUsersInClass(req.params.id)
    return res.json({classObjmembers})  
  } 
  catch(e){
    return res.json({error:e})
  }
})
//leave class [auth,reqcurrentuser]
router.put('/leave/:id',requireCurrentUser, async (req, res) => {
  try{
    await getUser(req.body.userId)
    const classObj= await leaveClass({classId:req.params.id,userId:req.body.userId})
    return res.json({classObj})  
  } 
  catch(e){
    return res.json({error:e})
  }
})
//remove user out of class [auth,requserbody]
router.put('/:classId/removeUser/:userId', requireClassInstructor, async (req, res) => {
  try{  
    const {classId,userId}= req.params
    await getUser(userId)
    const result= await removeUserfromClass({classId,userId})
    return res.json({result})  
  } 
  catch(e){
    console.log(e)
    return res.json({error:e})
  }
})
//delete class [auth,classAdmin]
router.delete('/delete/:id',requireClassInstructor, async (req, res) => {
  try{
    await getUser(req.body.adminId)
    const result= await deleteClass(req.params.id)
    return res.json({result})  
  } 
  catch(e){
    return res.json({error:e})
  }
})


module.exports=router