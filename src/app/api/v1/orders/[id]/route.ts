import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Authenticate
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const order = await prisma.order.findUnique({
            where: { id: Number(id) },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                shipment: {
                    include: {
                        history: true,
                    },
                },
            },
        });

        if (!order || order.userId !== user.userId) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        // Serialize Decimals
        const serializedOrder = {
            ...order,
            total: Number(order.total),
            items: order.items.map((item: any) => ({
                ...item,
                price: Number(item.price),
                variant: {
                    ...item.variant,
                    price: Number(item.variant.price),
                },
            })),
        };

        return NextResponse.json(serializedOrder);
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { error: 'Error fetching order' },
            { status: 500 }
        );
    }
}
