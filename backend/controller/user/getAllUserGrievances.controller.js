import prisma from "../../db/postgresql.js";

const getAllUserGrievances = async (req, res) => {
  const { id } = req.user;
  try {
    const grievances = await prisma.notifications.findMany({
      where: {
        createdBy: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllUserGrievances;