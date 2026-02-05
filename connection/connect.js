const mongoose=require("mongoose");
async function connect(Url){
   return  mongoose.connect(Url)
};
module.exports={connect};