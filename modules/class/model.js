const mongoose= require('mongoose')

const classSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    //no of students excluding the admin/instructor
    noOfstudents:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}) 
const populateData = function (next) {
    this.populate(
      "admin",
      "_id fullName email gender isInstructor profile"
    ),
    this.populate(
        "members",
        "_id fullName email gender isInstructor profile"
    )
    next();
};

classSchema.pre("find", populateData).pre("findOne", populateData)

module.exports=mongoose.model('Class',classSchema)