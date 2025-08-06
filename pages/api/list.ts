// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { r2 } from "@/lib/r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const list = await r2.send(new ListObjectsV2Command({Bucket:"academica"}))
  res.status(200).json({
    name: "John Doe",
    list
  });
}
