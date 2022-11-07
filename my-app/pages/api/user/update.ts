import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Users } from "../../../models";
import dbConnect from "../../../utils/connectDB";
import { authOptions } from "../auth/[...nextauth]";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { name } = JSON.parse(req.body);
    await dbConnect();

    try {
      const user = await Users.updateOne(
        { _id: session?.user?.id! },
        { $set: { name } }
      );
      return res.status(200).json({ result: JSON.parse(JSON.stringify(user)) });
    } catch (err) {
      console.error("update user err", (err as Error).message);
      return res.status(500).json({ message: (err as Error).message });
    }
  }
}
