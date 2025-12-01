import prisma from "../../db/postgresql.js";

export const updateTicket = async (req, res) => {
  if(req.role != "admin") return res.status(403).json({message : "Unauthorized action"})
  const { id } = req.params;
  const { status, resolutionTime, cost, handledBy } = req.body;

  try {
    const updatedTicket = await prisma.Notifications.update({
      where: {
        ticketId: id,
      },
      data: {
        status,
        resolutionTime: Number(resolutionTime),
        cost: Number(cost),
        handledBy,
      },
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
