import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

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
      const keys = await prisma.metsurApiKey.findMany({
        where: {
          userId: user.id,
        },
      });
      res.status(200);
      return res.json({
        ok: true,
        payload: keys,
      });
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
