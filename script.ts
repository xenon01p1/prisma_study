import { prisma } from './lib/prisma';

async function main() {
  // await prisma.user.deleteMany();
  //   const result = await prisma.user.createMany({
  //     data: [
  //       { name: "tabby", email: "bullshit@gmail.com", age: 20 },
  //       { name: "oleg", email: "oleg@yahoo.com", age: 30 }
  //     ]
  //   });

  const result = await prisma.user.findMany({
    where: {
      name: { notIn: ["tabby", "sally"] },
      age: { lte: 20 },
      email: { endsWith: "@yahoo.com" },
      // AND/OR/NOT: [ {email: { contains: "@yahoo" }} , {...} ]
      // writtenPosts: {
      //   all/every/some: { title: { contains: "Prisma" }}
      // }
    },
  })

  console.log(result);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })