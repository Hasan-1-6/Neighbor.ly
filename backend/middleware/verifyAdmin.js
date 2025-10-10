import prisma from "../db/postgresql";
import jwt from "jsonwebtoken"

export default async function verifyUser(req, res, next){
    const token = req.cookies.token
    if(!token) res.status(401).json({message : "Token not found, Please relogin"});

    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const findAdmin = await prisma.Admin.findUnique({
            where : {
                id : decodedToken.id
            }
        })
        if(!findAdmin) return res.status(403).json({message : "Couldnt find any Admin"}) ;
        req.admin = findAdmin;
        next();
    }
    catch(err){
        return res.status(500).json({message : "Some internal error occured "})
    }
}