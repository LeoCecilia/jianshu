import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getQuery } from "../../../lib/fetchDataFromDB";
import { Users } from "../../../models";
import dbConnect from "../../../utils/connectDB";
import { authOptions } from "../auth/[...nextauth]";

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  await dbConnect();

  const query = getQuery(session?.user?.id);

  try {
    const users = await Users.aggregate([{ $sample: { size: 5 } }, ...query]);
    return res.status(200).json({
      result: { users: JSON.parse(JSON.stringify(users)) },
    });
  } catch (err) {
    console.error("user list", err);
    return res.status(500).json({
      message: err.message,
    });
  }
}
