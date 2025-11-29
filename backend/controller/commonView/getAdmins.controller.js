import prisma from "../../db/postgresql.js";
export default async function getAdmins(req, res) {
  try {
    const admins = await prisma.Admin.findMany();
    if (admins == []) return res.status(404).json(admins);
    const adminData = admins.map((e) => ({
      name: e.name,
      role: e.role,
      email: e.email,
      contact: e.contact,
    }));
    return res.status(200).json(adminData);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
