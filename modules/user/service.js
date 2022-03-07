const User= require('./model')
const jwt= require('jsonwebtoken')
const config=require('../../config/config')
const {removeUserfromHisClasses, deleteAdminClasses } = require('../class/service')
 
//create token
const createToken=(id, isInstructor)=>{
    return jwt.sign({id, isInstructor}, config.secretToken,{
        //for 24 hours
        expiresIn: 24 * 60 * 60
    })
}

//login user
const loginUser = async ({email, password}) =>{
    const user= await User.login(email,password)
    const token= createToken(user._id, user.isInstructor)
    // set for 24 hours
    return {user,token}
}
// helper to add to the user database
const addUser = async (userInput) =>{
    const user=new User(userInput)
    await user.save()
    return user
}

//get user
const getUser = async (userId) =>{
    const user= await User.findOne({_id:userId}).select('-password')
    if(!user){
        throw 'User does not exist'
    }
    return user
}
//get users
const getUsers = async ({conditions={}}) =>{
    const user= await User.find(conditions).select('-password')
    return user
}
//deleteUser
const deleteUser= async (userId)=>{
    const user= await getUser(userId)
    if(user.isInstructor){
        await deleteAdminClasses(userId)
        // delete Admin/instructor Classes because there is no need of having classes when the one handling the operations is deleting his/her account
    }   
    // removed User from Classes. Since instructors can also be members/students of a class, after deleting admin classes, also remove instructors from classes they are not admin. 
    // If soon to be deleted user is a student remove them from classes they are members in
    await removeUserfromHisClasses(userId)
    const result=await User.deleteOne({
        _id:userId
    })
    return result
}

module.exports= {loginUser,addUser, getUser, getUsers, deleteUser}