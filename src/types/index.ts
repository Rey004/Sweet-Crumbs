export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'cakes' | 'pastries' | 'cookies' | 'breads' | 'specials';
  limitQuantity?: number;
  availableQuantity?: number;
  badge?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'product' | 'custom_cake';
  description?: string;
  details?: {
    flavor?: string;
    size?: string;
    frosting?: string;
    occasion?: string;
    date?: string;
    referenceImageName?: string;
  };
}
