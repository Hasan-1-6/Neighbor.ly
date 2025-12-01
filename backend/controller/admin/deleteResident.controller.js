import prisma from "../../db/postgresql.js";

export default async function deleteResident(req, res) {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  const { id } = req.body;

  try {
    await prisma.$transaction(async (prisma) => {
      // First, find the resident to be deleted to get their details
      const resident = await prisma.Resident.findUnique({
        where: { id },
      });

      if (!resident) {
        return res.status(404).json({ message: "Resident not found"});
      }

      // Then, find the flat occupied by this resident and update it
      await prisma.Flat.updateMany({
        where: { occupiedById: id },
        data: { occupiedById: null },
      });

      // Finally, delete the resident
      await prisma.Resident.delete({
        where: { id },
      });
    });

    return res.status(200).json({ message: "Resident deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
