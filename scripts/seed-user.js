const { PrismaClient } = require("../app/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "demo@example.com" },
    });

    if (existingUser) {
      console.log("✓ Demo user already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("demo123456", 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: "demo@example.com",
        password: hashedPassword,
        name: "Demo User",
        company: "Demo Company",
        phone: "+91 9876543210",
        country: "India",
      },
    });

    console.log("✓ Demo user created successfully!");
    console.log(`
Email: demo@example.com
Password: demo123456
Name: ${user.name}
Company: ${user.company}
    `);
  } catch (error) {
    console.error("Error creating demo user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
