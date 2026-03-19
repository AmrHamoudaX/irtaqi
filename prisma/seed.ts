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
    name: "Sheikh Ahmed",
    email: "ahmed@awqaf.ae",
    emiratesId: "784198012345671",
    role: Role.TEACHER,
    teacher: {
      create: {
        // You can add specialization here if you want
      },
    },
  },
  {
    name: "Omar Hamdan",
    email: "omar@student.ae",
    emiratesId: "784201012345672",
    role: Role.STUDENT,
    student: {
      create: {
        currentJuz: 2,
      },
    },
  },
];

const mosqueData: Prisma.MosqueCreateInput[] = [
  {
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
    const mosque = await prisma.mosque.create({ data: m });
    console.log(`Created Mosque: ${mosque.nameEn}`);
  }

  // Seed Users (Teachers & Students)
  for (const u of userData) {
    const user = await prisma.user.create({ data: u });
    console.log(`Created User: ${user.name} with role ${user.role}`);
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
