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
      if (param.id && param.tags) {
        const image = await prisma.image.findFirst({
          where: {
            id: param.id,
          },
        });
        if (image) {
          const updated = await prisma.image.update({
            where: {
              id: param.id,
            },
            data: {
              tags: param.tags,
            },
          });
          res.status(200);
          return res.json({ ok: true, payload: updated });
        }
      }
    }
  }
  res.status(400);
  return res.json({ ok: false });
};
