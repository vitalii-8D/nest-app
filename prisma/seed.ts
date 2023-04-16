import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'New Post' },
    update: {},
    create: {
      title: 'New Post',
      body: 'new post text has a lot of useful information. new post text has a lot of useful information. new post text has a lot of useful information. new post text has a lot of useful information.',
      description: 'This is new post description',
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'New Post 2' },
    update: {},
    create: {
      title: 'New Post 2',
      body: 'new post 2 text has a lot of useful information. new post 2 text has a lot of useful information. new post 2 text has a lot of useful information. new post 2 text has a lot of useful information.',
      description: 'This is new post 2 description',
      published: false,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
