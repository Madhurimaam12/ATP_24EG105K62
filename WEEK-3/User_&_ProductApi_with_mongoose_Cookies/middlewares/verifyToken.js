import jwt from 'jsonwebtoken'
const {verify}=jwt
export function verifyToken(req,res,next){
    //token verification logic 
    const token = req.cookies?.token;
    //if token is undefiend
    //if req from unauthoried user
    if(!token)
    {
        return res.status(401).json({message:"plz login"})
    }
    try{
    //if token is exicted
    const decodedToken = verify(token,'abcdef')
    console.log(decodedToken);
    //call next
    next();
    }
    catch(err)
    {
        res.status(401).json({message:"session expired. plz relogin"})
    }
}