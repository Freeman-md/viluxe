import store from "../store";

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

export type Order = {
  id: number;
  date: string;
  items: Product[];
  total: number;
}

export type FiltersState = {
  selectedCategory: string | null,
  searchText: string | null,
  sortOption: string | null,
}

export type FiltersAction = {
  type: string,
  payload: FiltersState,
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch