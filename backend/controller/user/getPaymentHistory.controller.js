import prisma from "../../db/postgresql.js";

const getPaymentHistory = async (req, res) => {
  const { id } = req.user;

  try {
    const paymentHistory = await prisma.payHistory.findMany({
      where: {
        userId: id,
      },
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
