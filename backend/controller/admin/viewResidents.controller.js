import prisma from "../../db/postgresql.js";

export default async function viewResidents(req, res) {
  if (req.role != "admin") {
    return res.status(403).json({ message: "Unauthorized Access" });
  }

  try {
    const { apart, floor, flat, residentId } = req.query;

    const where = {};

    if (residentId) {
      where.id = residentId;
    }

    if (apart) {
      where.apart = apart;
    }

    if (floor && floor.trim() !== "") {
      where.floor = parseInt(floor);
    }
    
    if (flat && flat.trim() !== "") {
      where.flat = parseInt(flat);
    }

    const residents = await prisma.Resident.findMany({
      where,
    });

    return res.status(200).json(residents);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
