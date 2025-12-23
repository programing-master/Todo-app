const z=require("zod");

const registerSchema=z.object({
    username:z.string({required_error:["User name is required"]}).min(3,{message:["User name must be at least 3 characters"]}),
    email:z.string({required_error:["Email is required"]}).min(8,{message:["Email must be at least 8 characters"]}),
    password:z.string({required_error:["Password is required"]}).min(6,{message:["Password must be at least 6 characters"]})
})

const loginSchema=z.object({
    email:z.string({required_error:["Email is required"]}).min(8,{message:["Email must be at least 8 characters"]}),
    password:z.string({required_error:["Password is required"]}).min(6,{message:["Password must be at least 6 characters"]})
})

module.exports={registerSchema,loginSchema}