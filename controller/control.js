const shortid=require("shortid");
const URL=require("../user/schema");
const scan=require("../service/fraud");
async function  generateshorturl(req,res){
    const shortID = shortid.generate();
    const body=req.body;
    if(!body.url){
       return  res.status(400).json({
            error:"url is required"
        })
    }
    const Risklevel= await scan(body.url);
    if(Risklevel=="malicious"){
     return res.render("home", {
      all: null,
      user: req.user,
      error: "Malicious URL cannot be shortened",
      success:null,
      id:null
    });
  }
    
  await URL.create({

  
    shortId:shortID,
     redirectURL:body.url,
     visit:[],
     created:req.user._id,
     Scanstatus:"passed",
     Risklevel:Risklevel


});
const allurl = await URL.find({
  created:req.user._id

});

res.render("home",{
  id:shortID,
  all:allurl,
  user:req.user,
  success: "URL shortened successfully",
  error: null
  
  
});


};
async function  analytics(req,res){
     const shortId=req.params.shortId;
   const entry=await URL.findOneAndUpdate(
    {shortId},{
        $push:{
            visit:{
                timestamp: Date.now()
                
            }
        }
    },{new:true});
    if (!entry) {
  return res.status(404).send("Short URL not found");
}

          res.redirect(entry.redirectURL);
    };
   
    // return res.json(
    //   {
    //     totalclicks:visit.length

    //   }
    // );

async function admin(req,res){
  if(!req.user){
    res.redirect("/login");
  }
  const allurl=await URL.find({});
  res.render("home",{
    
    id:null,
        all:allurl,
        users:req.user._id || null,
        error:null,
        success:null
  })
};



module.exports={generateshorturl,analytics,admin};