const {getter}=require("../service/map");

async function restrictlogin(req,res,next){
    
    const token=req.cookies?.token;
    if(!token){
       return next();
    }
 
    const user=getter(token);
    req.user=user;
    
    
    
    
  
  return  next();

};
function authorization(roles=[]){
    return function (req,res,next){
    if(!req.user){

        return res.redirect("/login");
    }
    if(!roles.includes(req.user.role)){
        return res.end("unauthrixed");

    }
     
   return next();
}

};







module.exports={restrictlogin,authorization};