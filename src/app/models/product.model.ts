export interface Product {
  items: Item[];
  totalCount: number;
}

export interface Item {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  sizes: string[];
  views: number;
  colors: string[];
  brand: string;
  raiting: number;
  category: string;
}
