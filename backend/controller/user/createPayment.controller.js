import prisma from "../../db/postgresql.js";
import { nanoid } from "nanoid";

const createPayment = async (req, res) => {
  const { id } = req.user;
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const user = await prisma.resident.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.dueRent === 0) {
      return res.status(400).json({ message: "No due rent to pay" });
    }

    if (amount > user.dueRent) {
      return res.status(400).json({ message: "Amount cannot be greater than due rent" });
    }

    const updatedUser = await prisma.resident.update({
      where: { id },
      data: {
        dueRent: {
          decrement: amount,
        },
      },
    });

    const paymentHistory = await prisma.payHistory.create({
      data: {
        transactionId: nanoid(10),
        userId: id,
        amount,
      },
    });

    res.json({ updatedUser, paymentHistory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createPayment;
