import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Fans } from "../../../models/Fans";
import dbConnect from "../../../utils/connectDB";
import { authOptions } from "../auth/[...nextauth]";

export default async function follow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const session = await unstable_getServerSession(req, res, authOptions);
      const { userId, isFollow } = JSON.parse(req.body);
      if (userId === session?.user?.id) {
        return res.status(400).json({ message: "不能自己关注自己" });
      }
      const queryObj = {
        follows: userId,
        user: session?.user?.id,
      };
      let result;
      if (isFollow) {
        result = await Fans.updateOne(
          queryObj,
          { $setOnInsert: queryObj },
          { upsert: true }
        );
      } else {
        result = await Fans.findOneAndRemove(queryObj);
      }
      result = JSON.parse(JSON.stringify(result));
      result.isFollow = isFollow;
      return res.status(200).json({ result });
    } catch (err) {
      console.error("follow people fail", err.message);
      return res.json(500).json({ message: err.message });
    }
  }
}
