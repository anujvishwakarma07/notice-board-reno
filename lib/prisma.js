import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';


let prisma;

if (process.env.NODE_ENV === 'production') {
    const adapter = new PrismaNeon({
        connectionString: process.env.DATABASE_URL
    });

    prisma = new PrismaClient({ adapter });
} else {
    if (!global.prisma) {
        const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
        global.prisma = new PrismaClient({ adapter });
    }

    prisma = global.prisma;
}

export default prisma;