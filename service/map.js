const jwt=require("jsonwebtoken");
const secret="shruti";
function setter(user){
   return jwt.sign({
      _id:user._id,
      email:user.email,
      role:user.role

   },secret);
 
};
function getter(token){
   if(!token){
      return null;
   }
   try{
return jwt.verify(token,secret);
   }
   catch( error){
      return null;

   }
   
};
module.exports={
    setter,getter
};