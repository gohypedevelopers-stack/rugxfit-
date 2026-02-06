import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                variants: true,
            },
        });

        // Convert Decimal to number for JSON serialization
        const serializedProducts = products.map((product: any) => ({
            ...product,
            variants: product.variants.map((variant: any) => ({
                ...variant,
                price: Number(variant.price),
            })),
        }));

        return NextResponse.json(serializedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Error fetching products' },
            { status: 500 }
        );
    }
}
