//takes in an APART like A or D then show all floors on that apart
import prisma from "../../db/postgresql.js";

export default async function viewFlats(req, res){
    
    const { f_id } = req.body;
    if (req.role != "admin")
        return res.status(403).json({ message: "Unauthorized Access" });    

    try{
        const allFlats = await prisma.Flat.findMany({
            where : {
                floorId : Number(f_id),
                occupiedById : null 
            }
        })
        if(allFlats.length == 0) return res.status(404).json({message : "No flats found"})


        return res.status(200).json(allFlats);
    }
    catch(err){
        return res.status(500).json({message : err});
    }
}