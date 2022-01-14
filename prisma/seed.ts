import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const data: Prisma.ProviderUncheckedCreateInput[] = [
  {
    name: 'Twitter',
    account: 'courselift',
    posts: {
      create: [
        {
          body: 'My first post',
          publishAt: new Date(),
          campaigns: {
            create: [
              {
                name: 'My first campaign',
                description: 'This is a Twitter campaign for Twitter'
              }
            ]
          }
        }
      ]
    }
  }
];

async function main() {
  await prisma.provider.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.post.deleteMany();

  for (let item of data) {
    await prisma.provider.create({ data: item });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
