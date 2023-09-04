import { ChangeEvent, Suspense, useEffect, useReducer, useRef, useState } from "react";
import { Await, LoaderFunctionArgs, defer, json, useFetcher, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import CategoriesList from "../components/CategoriesList"
import ProductCard from "../components/ProductCard"
import { FiltersAction, FiltersState, Product } from "../types"
import ProductService from "../api/product-service";
import LoadingSpinner from "../components/LoadingSpinner";

type HomeLoaderDataProps = {
  categories: Array<string>,
  products: Product[]
}

const animatedProductList = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}

const animatedProductItem = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

const filtersState: FiltersState = {
  selectedCategory: null,
  searchText: null,
  sortOption: null,
}

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
      }
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload.searchText,
      }
    case 'SET_SORT_OPTION':
      return {
        ...state,
        sortOption: action.payload.sortOption,
      }

    default:
      return state
  }
}

const sortOptions = [
  {
    text: 'Alphabetical (A - Z)',
    value: 'asc'
  },
  {
    text: 'Alphabetical (Z - A)',
    value: 'desc'
  },
  {
    text: 'Price (High to Low)',
    value: 'price'
  },
  {
    text: 'Price (Low to High)',
    value: '-price'
  },
]

const HomePage: React.FC = () => {
  const fetcher = useFetcher()

  const { categories, products } = useLoaderData() as HomeLoaderDataProps
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, dispatchFilters] = useReducer(filtersReducer, filtersState)

  let prevSelectedCategory = useRef<string | null>(null);

  const selectCategoryHandler = (category: string) => {
    dispatchFilters({
      type: 'SET_CATEGORY',
      payload: {
        ...filters,
        selectedCategory: category
      }
    })
  }

  const searchTextOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchFilters({
      type: 'SET_SEARCH_TEXT',
      payload: {
        ...filters,
        searchText: e.target.value
      }
    })
  }

  const sortOptionOnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchFilters({
      type: 'SET_SORT_OPTION',
      payload: {
        ...filters,
        sortOption: e.target.value
      }
    })
  }

  useEffect(() => {
    const { selectedCategory, searchText, sortOption } = filters;
  
    // Check if selectedCategory changed
    if (selectedCategory !== prevSelectedCategory.current) {
      const params = new URLSearchParams();
      if (selectedCategory) params.set('category', selectedCategory);
  
      const url = `/?${params.toString()}`;
      prevSelectedCategory.current = selectedCategory;
  
      if (fetcher.state === 'idle' && params.size !== 0) {
        fetcher.load(url);
      }
    }
  
    // Combine and apply filters and sorting
    let modifiedProducts = [...products]; // Create a copy to avoid mutating the original array
  
    if (fetcher.data?.products) {
      modifiedProducts = fetcher.data?.products;
    }
  
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      modifiedProducts = modifiedProducts.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseSearchText)
      );
    }
  
    if (sortOption) {
      switch (sortOption) {
        case 'asc':
          modifiedProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'desc':
          modifiedProducts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case '-price':
          modifiedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price':
          modifiedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }
  
    // Set the filtered products
    setFilteredProducts(modifiedProducts);
  }, [filters, fetcher, prevSelectedCategory, products]);
  
  

  return (
    <div className="container py-8 grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-8">

      <Suspense fallback={<LoadingSpinner text="Loading categories..." />}>
        <Await resolve={categories}>
          <CategoriesList categories={categories} selectCategory={selectCategoryHandler} selectedCategory={filters.selectedCategory} />
        </Await>
      </Suspense>

      <div className="sm:col-span-2 lg:col-span-3 space-y-4">

        <div className="flex justify-between items-center space-x-4">

          <div id="search-container">
            <input type="search" name="searchText" className="form-control" placeholder="Search products..." onChange={searchTextOnChangeHandler} />
          </div>

          <div id="sort-options-container">
            <select name="sortOptions" className="form-control" onChange={sortOptionOnChangeHandler}>
              <option value="">-- Sort by --</option>
              {sortOptions.map(sortOption => <option key={sortOption.value} value={sortOption.value}>{sortOption.text}</option>)}
            </select>
          </div>

        </div>

        <h2 className="text-xl font-medium">{filteredProducts.length} Products</h2>

        <motion.div initial="hidden"
          animate="visible"
          variants={animatedProductList} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
          <Suspense fallback={<LoadingSpinner text="Loading products..." />}>
            <Await resolve={products}>
              {filteredProducts?.map((product: Product) => (
                <motion.div variants={animatedProductItem} key={product.id} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </Await>
          </Suspense>
        </motion.div>

      </div>

    </div>
  )
}

export default HomePage

async function getCategories() {
  try {
    return await ProductService.fetchCategories()
  } catch (e) {
    throw json(
      { message: 'Could not fetch categories.' },
      {
        status: 500,
      }
    );
  }
}

async function getProducts(category: string) {
  try {
    return !category
      ? await ProductService.fetchProducts()
      : await ProductService.fetchProductsByCategory(category)
  } catch (e) {
    throw json(
      { message: 'Could not fetch products.' },
      {
        status: 500,
      }
    );
  }
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  const queryParams = new URL(request.url).searchParams

  const category = queryParams.get('category')!

  const products = await getProducts(category)

  return defer({
    categories: await getCategories(),
    products
  })
}