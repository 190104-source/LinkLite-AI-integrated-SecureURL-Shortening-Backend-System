const express=require("express");
const {getter}=require("../service/map");
const app=express();
const URL = require("../user/schema");
const path=require("path");


async function render(req,res){
   if(!req.user){
  return  res.redirect("/login")
   }

    const allurl=await URL.find({
        created:req.user._id

    });
   




    res.render("home",{
        id:null,
        all:allurl,
        users:req.user._id || null,
        error:null,
        success:null
        
    }
        
    );
    
};
 function show(req,res){
    res.render("homepage");
}
async function display(req,res){
    res.render("login");
}
module.exports={render,show,display}; 