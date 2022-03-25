import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { method } = req
  dbConnect()
  switch (method) {
    case 'GET':
      try {
        const user = await User.find({ email: session.user.email })
        res.status(200).json({ success: true, data: { user } })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}