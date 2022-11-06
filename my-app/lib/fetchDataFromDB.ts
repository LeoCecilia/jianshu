import { PipelineStage, Types } from "mongoose";
import { Articles, Users } from "../models";
import dbConnect from "../utils/connectDB";

export const articleQuery = [
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author",
    },
  },
  {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "article",
      as: "likes",
    },
  },
];

const userQuery: PipelineStage[] = [
  {
    $lookup: {
      from: "articles",
      localField: "_id",
      foreignField: "author",
      as: "articles",
    },
  },
  {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "articleAuthor",
      as: "liked",
    },
  },
];

export const getQuery = (userId) => {
  let query = [...userQuery];
  if (userId) {
    query = [
      {
        $lookup: {
          from: "fans",
          as: "follower",
          let: { follower_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user", new Types.ObjectId(userId)] },
                    { $eq: ["$follows", "$$follower_id"] },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $match: {
          _id: { $ne: new Types.ObjectId(userId) },
          // find user that not be paid attention to
          follower: [],
        },
      },
      ...query,
    ];
  }
  return query;
};

export const listRecommendUsers = async (session) => {
  const { user } = session;
  const query = getQuery(user?.id);

  await dbConnect();
  try {
    const userInfo = await Users.aggregate(query).limit(5);
    return JSON.parse(JSON.stringify(userInfo));
  } catch (err) {
    console.error("fetchUserError", err);
    return [];
  }
};

export const getArticles = async () => {
  await dbConnect();
  try {
    const articles = await Articles.aggregate(articleQuery).limit(10);
    const count = await Articles.count();
    return { data: JSON.parse(JSON.stringify(articles)), count };
  } catch (err) {
    console.log("get article err", err.message);
  }
};
