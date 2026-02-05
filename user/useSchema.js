const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","normal"],
        default:"normal"
    }

});
const USER=mongoose.model("user",schema);
module.exports=USER;