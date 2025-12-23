const validateSchema=(schema)=>(req,res,next)=>{
   try {
    schema.parse(req.body)
    next()
   } catch (error) {
    return res
    .status(500)
    .json({ msg: [error.issues.map((item, index) => item.message)] })
   }
}
module.exports={validateSchema}