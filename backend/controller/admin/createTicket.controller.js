import prisma from "../../db/postgresql.js";
import { nanoid } from "nanoid";

export const createTicket = async (req, res) => {
  const {
    title,
    description,
    apart,
    floor,
    flat,
    status,
    resolutionTime,
    cost,
    createdBy,
    handledBy,
  } = req.body;
  if (!title) {
  return res.status(400).json({ message: "Title is required" });
}

if (!description) {
  return res.status(400).json({ message: "Description is required" });
}

if (!apart) {
  return res.status(400).json({ message: "Apartment is required" });
}

if (!floor) {
  return res.status(400).json({ message: "Floor is required" });
}

if (!flat) {
  return res.status(400).json({ message: "Flat is required" });
}

if (!status) {
  return res.status(400).json({ message: "Status is required" });
}

if (isNaN(cost)) {
  return res.status(400).json({ message: "Cost is required" });
}

if (!createdBy) {
  return res.status(400).json({ message: "Created By is required" });
}

if (!handledBy) {
  return res.status(400).json({ message: "Handled By is required" });
}

  try {
    // 1. Validate Apartment
    const existingApartment = await prisma.apartment.findFirst({
      where: { apartId: apart },
      select: { id: true }, // Only need the ID to link with Floor
    });

    if (!existingApartment) {
      return res.status(400).json({ message: "Invalid Apartment ID." });
    }

    // 2. Validate Floor within the Apartment
    const existingFloor = await prisma.floor.findFirst({
      where: {
        floorNum: Number(floor*10),
        apartmentId: existingApartment.id,
      },
      select: { id: true }, // Only need the ID to link with Flat
    });

    if (!existingFloor) {
      return res.status(400).json({ message: `Floor ${floor} does not exist in Apartment ${apart}.` });
    }

    // 3. Validate Flat within the Floor
    const existingFlat = await prisma.flat.findFirst({
      where: {
        flatNum: Number(flat),
        floorId: existingFloor.id,
      },
    });

    if (!existingFlat) {
      return res.status(400).json({ message: `Flat ${flat} does not exist on Floor ${floor}.` });
    }

    const newTicket = await prisma.notifications.create({
      data: {
        ticketId: nanoid(8),
        title,
        description,
        apart,
        floor : Number(floor),
        flat : Number(flat), // Corrected: should be flat not floor
        status,
        resolutionTime : Number(resolutionTime),
        cost : Number(cost),
        createdBy,
        handledBy,
      },
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket", error: error.message });
  }
};
