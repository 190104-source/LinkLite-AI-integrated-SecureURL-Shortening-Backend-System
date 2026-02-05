const USER=require("../user/useSchema");
const{setter,getter}=require("../service/map");
const{v4: uuidv4}=require("uuid");
async function signrequest(req,res){
    const body=req.body;
   await  USER.create({
        name:body.name,
        email:body.email,
        password:body.password


    });
    res.send("done");



};
async function logrequest(req,res){
    const body=req.body;
   const people= await USER.findOne({
        email:body.emailid,
        name:body.fullname

    });
    if(!people){
       return res.render("login");
    }
    
  const token=  setter(people);
  res.cookie("token",token);
   
    res.redirect("/use");
    
    
}

module.exports={signrequest,logrequest};
