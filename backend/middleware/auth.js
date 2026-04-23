const jwt=require("jsonwebtoken");

module.exports=function(req,res,next){

const token=req.header("auth-token");

if(!token)
return res.status(401).json("Unauthorized");

try{

const verified=jwt.verify(
token,
"secretkey"
);

req.user=verified;

next();

}

catch{
res.status(400).json("Invalid Token");
}

}