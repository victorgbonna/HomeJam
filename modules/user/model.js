const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    fullName:{
        type: String,
    },
    email:{
        type: String,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        maxlength: [50, 'Email can only take up to 50 characters'],
        required: [true,'Email is required']
    },
    password:{
        type: String,
        maxlength: [50, 'Password can only take up to 50 characters'],
        required: [true,'password is required']
    },
    gender:{
        type: String,
        lowercase:true,
        enum:['male', 'female', 'others'],
        required:true
    },
    profile:{
        type: String,
        default:'default.png'
    },
    isInstructor:{
        type: Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}) 

userSchema.path('email').validate(async(email) => {
    const emailCount=await mongoose.models.User.countDocuments({email})
    return !emailCount
},'Email already exists')


//static method to login user
userSchema.statics.login= async function(email, password){
    const user= await this.findOne({email});
    // console.log(user, email) 
    if(!user) {
        throw 'incorret email'
    }
    if(user.password!=password){
        throw 'incorret password'
    }
    return user
}
module.exports=mongoose.model('User',userSchema)