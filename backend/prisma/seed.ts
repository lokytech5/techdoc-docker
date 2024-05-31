import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('password', 10);  // Hashing the password

    // Try to create a user without a transaction
    const newUser = await prisma.user.create({
        data: {
            username: 'testuser',
            email: 'test@gmail.com',
            password: passwordHash,  // Using the hashed password
            isAdmin: false,
        },
    });

    console.log(`Created new user: ${newUser.username}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

