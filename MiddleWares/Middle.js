const jwt =require("jsonwebtoken")

const AuthMiddleWare=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
       try {
        const decoded= jwt.verify(token,'masai')
        if(decoded){
             req.body.author=decoded.author
            req.body.authorID=decoded.authorID
          next()
        }else{
            res.status(400).send({"msg":"Please Login !!"})
        }
    
    } catch (error) {
        res.send("err1",error)
       }
           
        
    }else{
        res.status(400).send({"msg":"Please Login !!"})
    }
}

module.exports={AuthMiddleWare}