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
      const param = JSON.parse(req.body);
      if (param.id) {
        const image = await prisma.image.create({
          data: {
            userId: user.id,
            picsurId: param.id,
            created: new Date(),
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
