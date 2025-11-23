import prisma from "../db/postgresql.js";
import jwt from "jsonwebtoken";

export default async function checkToken(req, res, next) {
  const { userToken, adminToken } = req.cookies;
  if (!userToken && !adminToken) {
    return res
      .status(403)
      .json({ message: "No token found, please login again" });
  }

  try {
    if (userToken) {
      const decodedToken = jwt.verify(userToken, process.env.SECRET_KEY);
      const findUser = await prisma.Resident.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (!findUser)
        return res.status(403).json({ message: "Couldnt find any user" });
      req.role = "user";
      req.user = findUser;

      return next();
    }
    if (adminToken) {
      const decodedToken = jwt.verify(adminToken, process.env.SECRET_KEY);

      const findAdmin = await prisma.Admin.findUnique({
        where: {
          id: decodedToken.id,
        },
      });
      if (!findAdmin)
        return res.status(403).json({ message: "Couldnt find any Admin" });
      req.role = "admin";
      req.user = findAdmin;

      return next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
}
