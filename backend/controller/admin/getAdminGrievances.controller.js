import prisma from "../../db/postgresql.js";

export const getAdminGrievances = async (req, res) => {
  try {
    const notifications = await prisma.notifications.findMany({
      where: {
        status: {
          in: ["active", "in-progress"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to get grievances", error: error.message });
  }
};
