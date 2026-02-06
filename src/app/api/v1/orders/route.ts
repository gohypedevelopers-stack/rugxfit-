import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';


export async function POST(req: NextRequest) {
    try {
        // Authenticate
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { items, total, address } = body;
        // items: [{ variantId, quantity }]
        // address: { line1, city, zip }

        // Create order in a transaction
        const order = await prisma.$transaction(async (tx: any) => {
            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    userId: user.userId,
                    total,
                    status: 'paid', // Simulating instant payment
                    addressLine1: address.line1,
                    city: address.city,
                    zip: address.zip,
                    items: {
                        create: await Promise.all(
                            items.map(async (item: any) => {
                                const variant = await tx.productVariant.findUnique({
                                    where: { id: item.variantId },
                                });
                                if (!variant) throw new Error('Variant not found');
                                return {
                                    variantId: item.variantId,
                                    quantity: item.quantity,
                                    price: variant.price,
                                };
                            })
                        ),
                    },
                },
                include: { items: true },
            });

            // Create Initial Shipment
            await tx.shipment.create({
                data: {
                    orderId: newOrder.id,
                    status: 'processing',
                    history: {
                        create: { status: 'processing', note: 'Order placed and paid' },
                    },
                },
            });

            return newOrder;
        });

        // Serialize Decimals
        const serializedOrder = {
            ...order,
            total: Number(order.total),
            items: order.items.map((item: any) => ({
                ...item,
                price: Number(item.price),
            })),
        };

        return NextResponse.json(serializedOrder);
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        // Authenticate
        const user = await getUserFromRequest(req);
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const orders = await prisma.order.findMany({
            where: { userId: user.userId },
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
                shipment: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        // Serialize Decimals
        const serializedOrders = orders.map((order: any) => ({
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
        }));

        return NextResponse.json(serializedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Error fetching orders' },
            { status: 500 }
        );
    }
}
