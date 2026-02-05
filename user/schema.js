const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true
    },
    redirectURL:{
        type:String,
        required:true

    },
    visit:[{timestamp:{
        type:Number
    }}],
    created:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    ScanStatus:{
        type:String,
        default:"passed"
    },
    Risklevel :{
        type:String,
        default:"unkown"

    }
   

},{timestamps:true});
const URL=mongoose.model("url",urlSchema);
module.exports=URL;