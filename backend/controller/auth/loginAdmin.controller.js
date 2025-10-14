import prisma from "../../db/postgresql.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


function generateToken(admin){
    return jwt.sign(
        {
            id : admin.id,
        },
        process.env.SECRET_KEY,
        { expiresIn : '2h'}
    )
}
export default async function loginAdmin(req, res){
    
    if(!req.body) return res.status(400).json({message : "Credentials not provided"})
    let {id, password} = req.body;
    if(!id || !password) return res.status(400).json({message : "Credentials not provided"})
    

    try{
        const findAdmin = await prisma.Admin.findUnique({
            where : {
                email : id
            }
        })
        if(!findAdmin) return res.status(400).json({message : 'User not found'})
        const matchPass = await bcrypt.compare(password, findAdmin.password);
        if(!matchPass) return res.status(400).json({message : 'Invalid password'});

        //when we login we set our jwt in cookie 
        const token = generateToken({
            id : findAdmin.id,
        })

        res.cookie('adminToken', token, {
            httpOnly : true,
            sameSite : "strict",
            secure : false,
            maxAge : 2 * 60 * 60 * 1000
        })
        console.log(findAdmin);
        return res.status(200).json({user : findAdmin})
    }
    catch(err){
        return res.status(500).json({message : err.message})
    }
} 