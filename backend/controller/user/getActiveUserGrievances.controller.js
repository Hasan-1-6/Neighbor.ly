import prisma from "../../db/postgresql.js";

const getActiveUserGrievances = async (req, res) => {
  console.log(req.user);
  const { id , apart } = req.user;
  try {
    const grievances = await prisma.notifications.findMany({
      where: {
        apart : apart,
        status: {
          in: ["active", "in-progress"],
        },
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

export default getActiveUserGrievances;
