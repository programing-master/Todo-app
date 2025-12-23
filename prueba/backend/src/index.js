const {app,port}=require("./app")

app.listen(port,()=>{
    console.log(`Server runnning on port ${port}`)
})