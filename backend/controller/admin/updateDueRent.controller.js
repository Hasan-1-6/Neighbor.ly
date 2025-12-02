import prisma from "../../db/postgresql.js";

const updateDueRent = async (req, res) => {
  const { residentId } = req.body;

  if (!residentId) {
    return res.status(400).json({ message: "Resident ID is required" });
  }

  try {
    const updatedResident = await prisma.resident.update({
      where: {
        id: residentId,
      },
      data: {
        dueRent: 10000,
      },
    });

    res.json(updatedResident);
  } catch (error) {
    res.status(500).json({ message: "Failed to update due rent", error: error.message });
  }
};

export default updateDueRent;
