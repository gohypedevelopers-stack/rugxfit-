import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    // 1. Shaker
    const shaker = await prisma.product.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'RugXFit Premium Shaker',
            description: 'The ultimate hydration companion. Leak-proof, durable, and designed for pros.',
            image: '/images/shaker-placeholder.png', // Will be replaced by frontend asset
            features: ['Leak-proof design', 'Built-in mixing ball', 'BPA-Free plastic'],
            variants: {
                create: [
                    { name: '300ml', price: 599, stock: 50 },
                    { name: '750ml', price: 699, stock: 50 }
                ]
            }
        }
    });

    // 2. Wrist Wraps
    const wraps = await prisma.product.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'RugXFit Heavy Duty Wraps',
            description: 'Superior wrist support for your heaviest lifts.',
            image: '/images/wraps-placeholder.png',
            features: ['Heavy duty elastic', 'Reinforced stitching', 'Thumb loop'],
            variants: {
                create: [
                    { name: 'Standard Pair', price: 799, stock: 100 }
                ]
            }
        }
    });

    console.log({ shaker, wraps });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
