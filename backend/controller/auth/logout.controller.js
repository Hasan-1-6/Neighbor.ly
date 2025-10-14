export default function Logout(req, res){
    const { role } = req.body;
    const token = role == "admin" ? "adminToken" : "userToken"
    console.log(token)
    res.clearCookie(token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
