import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { parse } from "date-fns";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization) {
    if (/^Api-Key\s/.test(req.headers.authorization)) {
      const [_, key] = req.headers.authorization.split(" ");
      const metsurApiKey = await prisma.metsurApiKey.findFirst({
        where: {
          key,
        },
      });
      if (metsurApiKey?.userId && req.body) {
        const param = JSON.parse(req.body);
        const image = await prisma.image.create({
          data: {
            userId: metsurApiKey.userId,
            picsurId: param.id,
            tags: param.tags,
            created: parse(param.created, "yyyyMMdd", new Date()),
          },
        });
        res.status(200);
        return res.json({
          ok: true,
          payload: image,
        });
      }
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
