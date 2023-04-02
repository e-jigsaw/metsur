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
    if (user && req.query.id) {
      const image = await prisma.image.findFirst({
        where: {
          userId: user.id,
          id: parseInt((req.query.id as string) ?? -1),
        },
      });
      res.status(200);
      return res.json({
        ok: true,
        payload: image,
      });
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
