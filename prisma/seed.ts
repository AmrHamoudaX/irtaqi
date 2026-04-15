// prisma/seed.ts
import { PrismaClient, Prisma, Role, Emirate} from "../lib/generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({adapter})

const userData: Prisma.UserCreateInput[] = [
  {
    id: "3509664f-3110-4790-95fd-0f9fb2b189c5",
    name: "Sheikh Ahmed",
    email: "teacher@test.com",
    emiratesId: "784198012345671",
    role: Role.TEACHER,
    teacher: {
      connectOrCreate: {
      where: {userId: "3509664f-3110-4790-95fd-0f9fb2b189c5"},
      create: {},
      },
    },
  },
  {
    id: "62884412-560f-4882-8a30-cf2f7f99e422",
    name: "Omar Hamdan",
    email: "student@test.com",
    emiratesId: "784201012345672",
    role: Role.STUDENT,
    student: {
      connectOrCreate: {
      where: {userId: "62884412-560f-4882-8a30-cf2f7f99e422"},
      create: {},
      }
    },
  },
  {
    id: "5e8accb8-2299-4746-ac35-98aeedc0ca91",
    name: "Amr Osama",
    email: "admin@test.com",
    role: Role.ADMIN,
  },
];

const mosqueData: Prisma.MosqueCreateInput[] = [
  {
    id: "grand-mosque-abudhabi",
    nameAr: "جامع الشيخ زايد الكبير",
    nameEn: "Sheikh Zayed Grand Mosque",
    emirate: Emirate.ABU_DHABI,
    address: "Al Rawdah, Abu Dhabi",
  },
];

// 3. The Seed Function
async function main() {
  console.log("Start seeding...");

  // Seed Mosques
  for (const m of mosqueData) {
    const mosque = await prisma.mosque.upsert({
      where: {id: m.id},
      update: m,
      create: m
    });
    console.log(`Synced Mosque: ${mosque.nameEn}`);
  }

  // Seed Users (Teachers & Students)
  for (const u of userData) {
    const user = await prisma.user.upsert({
      where: {id: u.id},
      update: {
        name: u.name,
        emiratesId: u.emiratesId,
        role: u.role,
        teacher: u.teacher,
        student: u.student
      },
      create: u
    });
    console.log(`Synced User: ${user.name} with role ${user.role}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
