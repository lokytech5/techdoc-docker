import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('test123', 10);

    
    const newUser = await prisma.user.create({
        data: {
            username: 'test123',
            email: 'test123@gmail.com',
            password: passwordHash,
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
