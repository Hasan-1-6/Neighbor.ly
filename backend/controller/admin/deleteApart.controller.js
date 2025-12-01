import prisma from "../../db/postgresql.js";

export default async function deleteApart(req, res) {
  if (req.role != "admin")
    return res.status(403).json({ message: "unauthorized action" });
  const { id, apartName } = req.body;
  //add a check to prevent deleting apart if any resident still resides in there
  const residentInAparts = await prisma.Resident.findMany({
    where: {
      apart: apartName,
    },
  });

  if (residentInAparts.length > 0)
    return res.status(401).json({ message: "Apart is not empty" });

  try {
    await prisma.Apartment.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ message: "Apartment deleted succefully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
