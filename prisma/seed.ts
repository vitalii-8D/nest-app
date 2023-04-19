import { PrismaClient, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const topics = [
    { id: 1, name: 'Node JS' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
    { id: 4, name: 'Vue' },
    { id: 5, name: 'Mongo' },
    { id: 6, name: 'MySQL' },
    { id: 7, name: 'GraphQL' },
    { id: 8, name: 'Prisma' },
    { id: 9, name: 'Docker' },
  ];

  const users = [
    {
      id: 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.STUDENT,
    },
    {
      id: 2,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.LECTOR,
    },
    {
      id: 3,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.ADMIN,
    },
  ];

  const courses = [
    {
      id: 1,
      name: 'Node JS advanced course',
      description: faker.random.words(20),
      topics: [1, 5, 9],
      lector: 2,
      students: [1],
    },
    {
      id: 2,
      name: 'React advanced course',
      description: faker.random.words(10),
      topics: [2, 7],
      lector: 2,
      students: [],
    },
  ];

  await Promise.all(
    topics.map((topic) =>
      prisma.topic.upsert({
        where: { id: topic.id },
        update: {},
        create: {
          id: topic.id,
          name: topic.name,
        },
      }),
    ),
  );

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      }),
    ),
  );

  // Can not read property
  await Promise.all(
    courses.map((course) =>
      prisma.course.upsert({
        where: { id: course.id },
        update: {},
        create: {
          // id: course.id,
          name: course.name,
          description: course.description,
          topics: {
            connect: course.topics.map((t) => ({ id: t })),
          },
          lector: {
            connect: { id: course.lector },
          },
          students: {
            connect: course.students.map((c) => ({ id: c })),
          },
        },
      }),
    ),
  );
}

main();
