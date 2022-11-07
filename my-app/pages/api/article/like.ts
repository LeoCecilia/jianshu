import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import { Likes } from "../../../models/likes";
import { dbConnect } from "../../../utils/connectDB";

export default async function like(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const session = await unstable_getServerSession(req, res, authOptions);
      const { articleId, isLike, authorId } = JSON.parse(req.body);
      let result;
      let queryObj = {
        article: articleId,
        articleAuthor: authorId,
        user: session?.user?.id,
      };
      if (isLike) {
        result = await Likes.updateOne(
          queryObj,
          { $setOnInsert: queryObj },
          { upsert: true }
        );
      } else {
        result = await Likes.findOneAndRemove(queryObj);
      }
      result = JSON.parse(JSON.stringify(result));
      result.isLike = isLike;

      return res.status(200).json({ result });
    } catch (err) {
      console.error("like article err", (err as Error).message);
      res.status(500).json({ message: (err as Error).message });
    }
  }
}
