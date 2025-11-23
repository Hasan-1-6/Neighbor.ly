import prisma from "../../db/postgresql";

export default async function viewApart(req, res) {
  if (req.role != "admin")
    return res.status(403).json({ message: "Unauthorized Access" });

  try {
    const data = await prisma.Apartment.findMany();
    if (data.length == 0)
      return res.status(404).json({ message: "No apartments found" });

    return res.status(400).json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
