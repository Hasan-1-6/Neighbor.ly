import prisma from "../../db/postgresql.js";

const getResolvedUserGrievances = async (req, res) => {
  const { id } = req.user;
  try {
    const grievances = await prisma.notifications.findMany({
      where: {
        createdBy: id,
        status: "resolved",
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

export default getResolvedUserGrievances;
