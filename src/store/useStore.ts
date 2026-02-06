import { create } from 'zustand';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    variants?: { id?: number; name: string; price: number }[];
    image: string;
}

interface UIState {
    isProductDrawerOpen: boolean;
    selectedProduct: Product | null;
    cart: { product: Product; quantity: number; variant?: { id?: number; name: string; price: number } }[];
    checkoutItem: { product: Product; quantity: number; variant?: { id?: number; name: string; price: number } } | null;
    addToCart: (item: { product: Product; quantity: number; variant?: { id?: number; name: string; price: number } }) => void;
    // ... other methods ...
    setCheckoutItem: (item: { product: Product; quantity: number; variant?: { id?: number; name: string; price: number } }) => void;
    openProductDrawer: (product: Product) => void;
    closeProductDrawer: () => void;
    heroVariant: { id?: number; name: string; price: number } | null;
    setHeroVariant: (variant: { id?: number; name: string; price: number }) => void;
}

export const useStore = create<UIState>((set) => ({
    heroVariant: null, // Will be initialized by Hero component
    setHeroVariant: (variant) => set({ heroVariant: variant }),
    isProductDrawerOpen: false,
    selectedProduct: null,
    checkoutItem: null,
    cart: [],
    openProductDrawer: (product) => set({ isProductDrawerOpen: true, selectedProduct: product }),
    closeProductDrawer: () => set({ isProductDrawerOpen: false, selectedProduct: null }),
    setCheckoutItem: (item) => set({ checkoutItem: item }),
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
}));
