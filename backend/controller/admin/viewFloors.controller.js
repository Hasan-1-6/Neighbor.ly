//takes in an APART like A or D then show all floors on that apart
import prisma from "../../db/postgresql.js";

export default async function viewFloors(req, res){
    
    const { apartId } = req.body;
    
    if (req.role != "admin")
        return res.status(403).json({ message: "Unauthorized Access" });    

    try{
        const apartment = await prisma.Apartment.findFirst({
            where: {
                apartId: apartId,
            }
        });

        if (!apartment) {
            return res.status(404).json({ message: "Apartment not found" });
        }

        const allFloors = await prisma.Floor.findMany({
            where: {
                apartmentId: apartment.id
            }
        });
        if (allFloors.length == 0) return res.status(404).json({ message: "No floors found" });
        

        return res.status(200).json(allFloors);
    }
    catch(err){
        return res.status(500).json({message : err});
    }
}