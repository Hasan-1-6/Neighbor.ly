import prisma from "../../db/postgresql.js";

export default async function createApart(req, res) {
  if (req.role != "admin")
    return res.status(403).json({ message: "unauthorized action" });

  const floors = Number(req.body.floors)
  const flats = Number(req.body.flats)

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
    const lastApart = await prisma.Apartment.findFirst({
      orderBy: { id: "desc" },
    });
    const nextApartId = lastApart
      ? String.fromCharCode(lastApart.apartId.charCodeAt(0) + 1)
      : "A";

    const createQuery = {
      apartId: nextApartId,
      FloorCount: floors,
      FlatCount : flats,
      floors: {
        create: floorQuery,
      },
    };

    const createdData = await prisma.Apartment.create({ data: createQuery });
    return res.status(200).json({...createdData, occupied : 0});
  } catch (err) {
    console.error("CreateApart Error:", err);
    return res.status(500).json({ message: err.message });
  }
}
