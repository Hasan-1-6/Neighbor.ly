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

  // If a user is creating a ticket, createdBy will be their ID (e.g., A1001)
  

  if (req.role == "admin") {
    if (!apart) {
      return res.status(400).json({ message: "Apartment is required" });
    }

    if (!floor) {
      return res.status(400).json({ message: "Floor is required" });
    }

    if (!flat) {
      return res.status(400).json({ message: "Flat is required" });
    }
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  if (isNaN(cost)) {
    return res.status(400).json({ message: "Cost must be a number" });
  }

  if (!createdBy) {
    return res.status(400).json({ message: "Created By is required" });
  }

  try {
    if (req.role == "admin") {
      // 1. Validate Apartment for admin-created tickets
      const existingApartment = await prisma.apartment.findFirst({
        where: { apartId: apart },
        select: { id: true },
      });

      if (!existingApartment) {
        return res.status(400).json({ message: "Invalid Apartment ID." });
      }

      // 2. Validate Floor within the Apartment
      const existingFloor = await prisma.floor.findFirst({
        where: {
          floorNum: Number(floor) * 10,
          apartmentId: existingApartment.id,
        },
        select: { id: true },
      });

      if (!existingFloor) {
        return res
          .status(400)
          .json({
            message: `Floor ${floor} does not exist in Apartment ${apart}.`,
          });
      }

      // 3. Validate Flat within the Floor
      const existingFlat = await prisma.flat.findFirst({
        where: {
          flatNum: Number(flat),
          floorId: existingFloor.id,
        },
      });

      if (!existingFlat) {
        return res
          .status(400)
          .json({
            message: `Flat ${flat} does not exist on Floor ${floor}.`,
          });
      }
    }

    const newTicket = await prisma.notifications.create({
      data: {
        ticketId: nanoid(8),
        title,
        description,
        apart: apart,
        floor: Number(floor),
        flat: Number(flat),
        status,
        resolutionTime: resolutionTime ? Number(resolutionTime) : undefined,
        cost: Number(cost),
        createdBy,
        handledBy: handledBy || null,
      },
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create ticket", error: error.message });
  }
};
