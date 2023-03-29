import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const param = JSON.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        id: session.user?.id,
      },
    });
    if (user) {
      if (param.key) {
        await prisma.picsurApiKey.create({
          data: {
            key: param.key,
            userId: user.id,
          },
        });
        res.status(200);
        return res.json({ ok: true });
      }
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
