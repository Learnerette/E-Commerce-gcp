export interface Product {
  id?: number; // Optional for creating new products
  name: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
}
