import { NextApiRequest, NextApiResponse } from "next";
import { Articles } from "../../../models";
import { dbConnect } from "../../../utils/connectDB";

export default async function createArticle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  // // console.log("CREATING DOCUMENT");
  // const article = await Articles.create(req.body);
  const article = await Articles.insertMany(req.body);
  // // console.log("ADD ARTICLE");
  return res.status(200).json({ article });
}
