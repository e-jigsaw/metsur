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
      const images = await prisma.image.findMany({
        where: {
          userId: user.id,
        },
        skip: parseInt((req.query.skip as string) ?? 0),
        take: parseInt((req.query.take as string) ?? 20),
        orderBy: {
          id: "desc",
        },
      });
      res.status(200);
      return res.json({
        ok: true,
        payload: images,
      });
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
