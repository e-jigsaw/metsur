import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user?.id,
      },
    });
    if (user) {
      const key = await prisma.metsurApiKey.create({
        data: {
          userId: user.id,
          key: randomUUID(),
        },
      });
      res.status(200);
      return res.json({
        ok: true,
        payload: key,
      });
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
