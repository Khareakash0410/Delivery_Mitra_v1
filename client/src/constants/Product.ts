import type { ProductImage } from "../types/Product";

 export const product = {
    id: 1,
    name: 'Oh My Bod! Sunscreen Lotion',
    brand: 'EVERYDAY HUMANS',
    rating: 4.8,
    reviewCount: 214,
    currentPrice: 16.00,
    originalPrice: 20.00,
    discount: '20%',
    description: 'A reliable bodyguard for your skin, with secret uses. This lightweight, long lasting SPF50 sunscreen lotion will save you from the harshest midday sun, while also protecting dry skin, discoloured tattoos, darker scars, gel manicures UV exposures and more.',
    category: 'Sunscreen',
    sizes: ['50ml', '100ml'],
    inStock: true,
    shippingInfo: 'Ships for free this week of February 14th'
  };

  export  const productImages: ProductImage[] = [
      { id: 1, src: '/Product.jpg', alt: 'Main product image' },
      { id: 2, src: '/Product.jpg', alt: 'Product texture' },
      { id: 3, src: '/Product.jpg', alt: 'Product application' },
      { id: 4, src: '/Product.jpg', alt: 'Product packaging' }
    ];