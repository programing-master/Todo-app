const jwt=require("jsonwebtoken");

const createAccessToken=(payload)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'5h'},(err,token)=>{
            if(err){
   reject(err)
            }else{
resolve(token)
            }
        })
    })
}
module.exports={createAccessToken}