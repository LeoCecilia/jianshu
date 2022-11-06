import { NextApiRequest, NextApiResponse } from "next";
import { Articles } from "../../../../models";

export default async function viewArticle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { articleId },
  } = req;
  try {
    await Articles.updateOne({ _id: articleId }, { $inc: { view_count: 1 } });
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("viewArticle err", err);
  }
}
