import isEmail from "validator/lib/isEmail.js";
import prisma from "../../db/postgresql.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

export default async function registerAdmin(req, res) {
  //all are strings btw
  const { password, name, role, email, contact } = req.body;
  if (!password || !name || !role || !email || !contact) {
    res.status(400).json({ message: "insufficient data provided" });
    return;
  }
  if (password.length < 6)
    return res.status(400).json({ message: "Password is too short" });

  if (!isEmail(email))
    return res.status(400).json({ message: "Invalid email" });
  if (contact.length < 10)
    return res.status(400).json({ message: "Invalid contact number" });
  try {
    const adminExists = await prisma.Admin.findUnique({
      where: { email: email },
    });
    if (adminExists)
      return res.status(403).json({ message: "Error, User already exists" });
    const Id = nanoid(4);

    const salt = await bcrypt.genSalt(6);

    const hashedPass = await bcrypt.hash(password, salt);

    const newAdmin = {
      id: Id,
      password: hashedPass,
      name: name,
      role: role,
      email: email,
      contact: contact,
    };

    await prisma.Admin.create({ data: newAdmin });

    res.status(200).json({
      name: newAdmin.name,
      contact: newAdmin.contact,
      role: newAdmin.role,
      email: newAdmin.email,
    });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
}

// use each model like prisma.tablename eg [prisma.user, prisma.admin]
//lookup tables/models inside of ./prisma/schema.prisma file
