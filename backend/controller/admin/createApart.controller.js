import prisma from "../../db/postgresql";

export default async function createApart(req, res) {
  if (req.role != "admin")
    return res.status(403).json({ message: "unauthorized action" });

  const { floors, flats } = req.body;

  const floorQuery = Array.from({ length: floors }, (elem, i) => ({
    floorNum: (1 + i) * 10,
    totalFlats: flats,
    flats: {
      create: Array.from({ length: flats }, (elem, j) => ({
        flatNum: j + 1,
      })),
    },
  }));

  try {
    const lastApart = await prisma.apartment.findFirst({
      orderBy: { id: "desc" },
    });
    const nextApartId = lastApart
      ? String.fromCharCode(lastApart.apartId.charCodeAt(0) + 1)
      : "A";

    const createQuery = {
      apartId: nextApartId,
      totalFloors: floors,
      floors: {
        create: floorQuery,
      },
    };

    await prisma.Apartment.create({ data: createQuery });
    return res.status(200).json({ message: "Apartment created succesfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error occured" });
  }
}
