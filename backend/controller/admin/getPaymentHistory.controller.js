import prisma from "../../db/postgresql.js";

const getPaymentHistory = async (req, res) => {
  const { userId } = req.query;

  try {
    const whereClause = {};
    if (userId) {
      whereClause.userId = userId;
    }

    const paymentHistory = await prisma.payHistory.findMany({
      where: whereClause,
      orderBy: {
        transactionId: "desc",
      },
    });
    res.json(paymentHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getPaymentHistory;
