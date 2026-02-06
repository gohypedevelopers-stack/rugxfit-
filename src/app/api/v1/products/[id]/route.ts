import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: {
                variants: true,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        // Convert Decimal to number for JSON serialization
        const serializedProduct = {
            ...product,
            variants: product.variants.map((variant: any) => ({
                ...variant,
                price: Number(variant.price),
            })),
        };

        return NextResponse.json(serializedProduct);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Error fetching product' },
            { status: 500 }
        );
    }
}
