import prisma from "../../db/postgresql.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


function generateToken(user){
    return jwt.sign(
        {
            id : user.id,
        },
        process.env.SECRET_KEY,
        { expiresIn : '2h'}
    )
}
export default async function loginUser(req, res){
    if(!req.body) return res.status(400).json({message : "Credentials not provided"})
    let {id, password} = req.body;
    if(!id || !password) return res.status(400).json({message : "Credentials not provided"})
    

    try{
        const findUser = await prisma.Resident.findUnique({
            where : {
                id : id
            }
        })
        if(!findUser) return res.status(400).json({message : 'User not found'})
        const matchPass = await bcrypt.compare(password, findUser.password);
        if(!matchPass) return res.status(400).json({message : 'Invalid password'});

        //when we login we set our jwt in cookie 
        const token = generateToken({
            id : findUser.id,
        })

        res.cookie('token', token, {
            httpOnly : true,
            sameSite : "strict",
            secure : false,
            maxAge : 2 * 60 * 60 * 1000
        })
        console.log("Token Set !!");
        return res.status(200).json({message : "Logged In Succesfully"})
    }
    catch(err){
        return res.status(500).json({message : "Some error Occured "})
    }
} 