// const { updateProductInfo } = require('../product/service')
// const { getUser } = require('../user/service')
const Class= require('./model')

//helper to create a class
const createClass = async (admin) =>{
    const classObj= new Class({admin, members:[admin]}) 
    await classObj.save()
    return classObj
}

const getClass = async (classId) =>{
    const classObj= await Class.findOne({_id:classId})
    if(!classObj){
        throw 'class does not exist'
    }
    return classObj
}
const getClasses = async ({conditions={}}) =>{
    const classes= await Class.find(conditions)
    return classes
}
//delete class
const deleteClass= async ({classId,adminId})=>{
    const result=await Class.deleteOne({
        _id:classId, 'admin._id':adminId
    })
    return result
}
//remove classes created by the instructor incase he/she deletes account
const deleteAdminClasses= async (userId)=>{
    const result=await Class.deleteMany({
        admin:userId
    })
    return result
}
//join a class
const joinClass= async ({userId, classId})=>{
    await getClass(classId)
    //check if user is still in class
    const isUserInClass= await Class.findOne({_id:classId,members:{ $elemMatch: { $eq: userId} }})
    if (isUserInClass){
        throw 'You are already a member'
    }
    const addUserToClass= await Class.findOneAndUpdate({_id:classId},
        { $inc: { noOfstudents: 1 }, "$push": { "members": userId } },{new:true})
    return addUserToClass 
}
const getUsersInClass= async(classId)=>{
    const classObj= await getClass(classId)
    return classObj.members
}
const getUserClasses=async(userId)=>{
    const userClasses= await Class.find({members:{ $elemMatch: { $eq: userId} }})
    return userClasses
}

const removeUserfromClass= async({userId, classId,adminId})=>{
    // await getUser(userId)
    await getClass(classId)
    const isUserInClass= await Class.findOne({_id:classId,members:{ $elemMatch: { $eq: userId} }})
    if (!isUserInClass){
        throw 'User is not a member'
    }
    if(isUserInClass.admin._id!=adminId){
        throw "You are forbidden"
    }
    console.log({isUserInClass})
    
    if(isUserInClass.admin._id==userId){
        throw 'You cannot remove the admin'
    }
    const removeUserFromClass= await Class.findOneAndUpdate({_id:classId},
        { $inc: { noOfstudents: -1 }, "$pull": { "members": userId } },{new:true})
    return removeUserFromClass
}
// same with the one above but authorized middleware will be passed to check if user is real
const leaveClass= async({userId,classId})=>{
    await getClass(classId)
    //check if user is still in class
    const isUserInClass= await Class.findOne({_id:classId,members:{ $elemMatch: { $eq: userId} }})
    if (!isUserInClass){
        throw 'You are not a member'
    }
    if(isUserInClass.admin._id==userId){
        // delete class when admin is leaving group as no one to supervise and teach students
        throw 'Admin cannot leave class, rather delete the class instead'
    }
    const removeUserFromClass= await Class.findOneAndUpdate({_id:classId},
        { $inc: { noOfstudents: -1 }, "$pull": { "members": userId } },{new:true})
    return removeUserFromClass 
}

// remove a user from all of his classes, cases of deleted user
const removeUserfromHisClasses= async(userId)=>{
    //cjeck idf its returns if the user has no classes
    const userClasses= await Class.updateMany(
        {members:{ $elemMatch: { $eq: userId} }},
        { $inc: { noOfstudents: -1 }, "$pull": { "members": userId } },{new:true}
    )
    return userClasses
}
//since the admin/instructor of a class handles most operations and activities done in the class, he or she cannot leave the class. Unless you have to delete your account or delete the class itself.
module.exports={joinClass, getClass, getClasses,getUsersInClass, removeUserfromClass,deleteAdminClasses, leaveClass, removeUserfromHisClasses, createClass, deleteClass, getUserClasses}