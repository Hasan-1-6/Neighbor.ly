import prisma from "../../db/postgresql.js";

export default async function viewApart(req, res) {

  try {
    const apartments = await prisma.Apartment.findMany();

    const apartmentsWithOccupiedCount = await Promise.all(
      apartments.map(async (apartment) => {
        const occupiedCount = await prisma.Resident.count({
          where: {
            apart: apartment.apartId,
          },
        });
        return {
          ...apartment,
          occupied: occupiedCount,
        };
      })
    );

    return res.status(200).json(apartmentsWithOccupiedCount);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
