import prisma from "../../db/postgresql.js";

export const getNotifHistory = async (req, res) => {
  try {
    const notifications = await prisma.Notifications.findMany({
      where : {
        status : "resolved"
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notifications", error: error.message });
  }
};
