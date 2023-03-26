import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const image = await prisma.image.create({
    data: {
      picsurId: "aaa",
    },
  });
  console.log(image);
}

main().then(async () => {
  await prisma.$disconnect();
});
