import store from "../store";

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