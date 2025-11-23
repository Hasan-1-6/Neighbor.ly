import prisma from "../../db/postgresql.js";

import bcrypt from "bcrypt";

export default async function registerUser(req, res) {
  //all are strings btw
  let { owner, contact, apart, floor, flat, password } = req.body;
  if (!password || !owner || !contact || !apart || !floor || !flat) {
    res.status(400).json({ message: "insufficient data provided" });
    return;
  }

  floor = Number(floor);
  flat = Number(flat);

  if (password.length < 6)
    return res.status(400).json({ message: "Password is too short" });

  if (contact.length < 10)
    return res.status(400).json({ message: "Invalid contact number" });
  try {
    let Id = apart + `${floor}` + "0" + `${flat}`;

    const salt = await bcrypt.genSalt(6);

    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = {
      id: Id,
      owner: owner,
      contact: contact,
      apart: apart,
      floor: floor,
      flat: flat,
      password: hashedPass,
    };
    await prisma.Resident.create({ data: newUser });
    res.status(200).json({ message: `Registered ${owner} succesfully` });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
}

// use each model like prisma.tablename eg [prisma.user, prisma.admin]
//lookup tables/models inside of ./prisma/schema.prisma file
