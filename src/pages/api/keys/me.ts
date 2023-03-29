import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const key = await prisma.picsurApiKey.findFirst({
      where: {
        userId: session.user?.id,
      },
    });
    if (key) {
      res.status(200);
      return res.json({ ok: true, payload: key.key });
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
