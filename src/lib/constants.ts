export const PRODUCTS = {
    SHAKER: {
        id: 1,
        name: "RugXFit Premium Shaker",
        price: 599, // Base price
        description: "The ultimate hydration companion. Leak-proof, durable, and designed for pros.",
        image: "/shaker.png",
        variants: [
            { id: 1, name: "300ml", price: 599 },
            { id: 2, name: "750ml", price: 699 }
        ]
    },
    WRAPS: {
        id: 2,
        name: "RugXFit Heavy Duty Wraps",
        price: 799,
        description: "Superior wrist support for heavy lifting. Engineered for stability and comfort.",
        image: "/wraps.png",
        variants: [
            { id: 3, name: "Standard", price: 799 }
        ]
    }
};
