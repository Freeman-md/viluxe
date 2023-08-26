export type Product = {
    id?: number,
    title: string;
    image: string;
    price: number;
    category: string;
    rating: {
        rate: number,
        count: number
    };
    description?: string;
  }