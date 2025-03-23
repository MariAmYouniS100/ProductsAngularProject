export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[]; // ✅ Array of image URLs
  description: string;
  category: string;
  brand: string;
  rating: number;
  stock: number;
}
