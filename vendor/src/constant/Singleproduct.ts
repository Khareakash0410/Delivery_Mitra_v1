interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductData {
  name: string;
  price: number;
  discountedPrice: number;
  platformfees: number;
  description: string;
  stockAvailable: boolean;
  category: string;
  options: string[];
  images: ProductImage[];
}