import prisma from "../../db/postgresql";



export default function registerAdmin(req, res){
    const {email, password, name} = req.body;
    
    
}





// use each model like prisma.tablename eg [prisma.user, prisma.admin]
    //lookup tables/models inside of ./prisma/schema.prisma file