const express=require("express");
const router=express.Router();

const Grievance=require("../models/Grievance");
const auth=require("../middleware/auth");


// Submit grievance
router.post("/",auth,async(req,res)=>{

try{

const grievance=new Grievance({
title:req.body.title,
description:req.body.description,
category:req.body.category,
studentId:req.user.id
});

await grievance.save();

res.json(grievance);

}

catch(err){
res.status(500).json(err);
}

});


// View all grievances
router.get("/",auth,async(req,res)=>{

try{

const grievances=await Grievance.find();

res.json(grievances);

}

catch(err){
res.status(500).json(err);
}

});



// View by ID
router.get("/:id",auth,async(req,res)=>{

try{

const grievance=await Grievance.findById(
req.params.id
);

res.json(grievance);

}

catch(err){
res.status(500).json(err);
}

});




// Update grievance
router.put("/:id",auth,async(req,res)=>{

try{

const updated=await Grievance.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(updated);

}

catch(err){
res.status(500).json(err);
}

});




// Delete grievance
router.delete("/:id",auth,async(req,res)=>{

try{

await Grievance.findByIdAndDelete(
req.params.id
);

res.json("Deleted Successfully");

}

catch(err){
res.status(500).json(err);
}

});




// Search grievance by title
router.get("/search/title",auth,async(req,res)=>{

try{

const data=await Grievance.find({
title:req.query.title
});

res.json(data);

}

catch(err){
res.status(500).json(err);
}

});


module.exports=router; 