import prisma from "../../db/postgresql.js";

import bcrypt from "bcrypt";

export default async function registerUser(req, res) {
  //all are strings btw
  let { owner, contact, apart, floorNum, flatNum, password, aadhar, floorId, flatId } = req.body;
  if (!password || !owner || !contact || !apart || !floorNum || !flatNum || !floorId || !flatId) {
    res.status(400).json({ message: "insufficient data provided" });
    return;
  }

  floorId = Number(floorId);
  flatId = Number(flatId);
  if (password.length < 6)
    return res.status(400).json({ message: "Password is too short" });

  if (contact.length < 10)
    return res.status(400).json({ message: "Invalid contact number" });
  try {
    let Id = apart + `${floorNum}` + "0" + `${flatNum}`;
    const userExists = await prisma.Resident.findUnique({
      where: { id: Id },
    });
    if (userExists)
      return res.status(409).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(6);

    const hashedPass = await bcrypt.hash(password, salt);

    const newResident = {
      id: Id,
      owner: owner,
      contact: contact,
      apart: apart,
      floor: Number(floorId),
      flat: Number(flatId),
      password: hashedPass,
      aadhar : aadhar
    };

    const createdResident = await prisma.Resident.create({ 
      data: newResident
    });
    const flatRecord = await prisma.Flat.findFirst({
      where: {
        id: flatId,
        floorId: floorId
      }
    });
    if(flatRecord.occupiedById) return res.status(409).json({message : "Flat already occupied"})
    await prisma.Flat.update({
      where: {
        id : flatRecord.id
      },
      data : {
        occupiedById : Id
      }
    })


    res.status(200).json(createdResident);
  } catch (err) {
    return res.status(500).json({ message: "server error occured" });
  }
}

// use each model like prisma.tablename eg [prisma.user, prisma.admin]
//lookup tables/models inside of ./prisma/schema.prisma file
