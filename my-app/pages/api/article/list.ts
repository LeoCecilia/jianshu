import { NextApiRequest, NextApiResponse } from "next";
import { articleQuery } from "../../../lib/fetchDataFromDB";
import { Articles } from "../../../models";
import dbConnect from "../../../utils/connectDB";

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const page = parseInt((req.query.page as string) ?? "1");
  const pageSize = parseInt((req.query.pageSize as string) ?? "10");

  try {
    const article = await Articles.aggregate(articleQuery)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      result: { article: JSON.parse(JSON.stringify(article)) },
    });
  } catch (err) {
    console.error("article list", err);
    return res.status(500).json({
      message: err.message,
    });
  }
}
