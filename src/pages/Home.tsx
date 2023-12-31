import { Suspense, useEffect, useRef, useState } from "react";
import { Await, LoaderFunctionArgs, defer, json, useFetcher, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

import CategoriesList from "../components/CategoriesList"
import ProductCard from "../components/ProductCard"
import ProductService from "../api/product-service";
import LoadingSpinner from "../components/LoadingSpinner";
import useProductFilters from "../hooks/useProductFilters";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";
import { toggleItemInCart, toggleItemInWishlist } from "../store/shopping/shopping-slice";
import { ReactComponent as ShoppingCart } from '../assets/svgs/shopping-cart.svg'
import { ReactComponent as Check } from '../assets/svgs/check.svg'
import { Product } from "../models/product";

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

const HomePage: React.FC = () => {
  const fetcher = useFetcher()
  const dispatch = useAppDispatch()

  const cartItems = useAppSelector(state => state.shopping.cart)
  const wishlistItems = useAppSelector(state => state.shopping.wishlist)

  const { categories, products } = useLoaderData() as HomeLoaderDataProps
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const { filters, sortOptions, selectCategoryHandler, searchTextOnChangeHandler, sortOptionOnChangeHandler } = useProductFilters()

  let prevSelectedCategory = useRef<string | null>(null);

  useEffect(() => {
    const { selectedCategory, searchText, sortOption } = filters;

    // Check if selectedCategory changed
    if (selectedCategory !== prevSelectedCategory.current) {
      prevSelectedCategory.current = selectedCategory;

      const params = new URLSearchParams();

      if (selectedCategory !== '') {
        params.set('category', selectedCategory!);
      }

      const queryParams = params.toString();
      const url = queryParams ? `/?${queryParams}` : '/';

      if (fetcher.state === 'idle') {
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
          modifiedProducts.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
          break;
        case 'desc':
          modifiedProducts.sort((a, b) => b.title < a.title ? -1 : b.title > a.title ? 1 : 0);
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

  const isItemInCart = (product: Product): boolean => cartItems.some(item => item.id === product.id)
  const isItemInWishlist = (product: Product): boolean => wishlistItems.some(item => item.id === product.id)

  const toggleFavouriteHandler = (product: Product) => {
    dispatch(
      toggleItemInWishlist({
        item: product
      })
    )
  }

  const toggleItemInCartHandler = (product: Product) => {
    dispatch(
      toggleItemInCart({
        item: product
      })
    )
  }

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
          variants={animatedProductList} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items3-stretch">
          <Suspense fallback={<LoadingSpinner text="Loading products..." />}>
            <Await resolve={products}>
              {filteredProducts?.map((product: Product) => (
                <motion.div variants={animatedProductItem} key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    isItemInWishlist={isItemInWishlist(product)} // Pass the boolean value directly
                    onToggleFavorite={toggleFavouriteHandler.bind(null, product)}
                    addToCartButton={(() => {
                      const isProductInCart = isItemInCart(product);
                      return (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className={`absolute z-10 w-14 h-14 p-2 !rounded-full top-[50%] right-2 bg-primary text-white`}
                          onClick={() => toggleItemInCartHandler(product)}
                        >
                          {
                            !isProductInCart
                              ? <div className="flex flex-col items-center justify-center">
                                <ShoppingCart className="w-6" />
                                <span className="text-xs">Add</span>
                              </div>
                              : <div className="flex flex-col items-center justify-center">
                                <Check className="w-6" />
                                <span className="text-xs">Added</span>
                              </div>
                          }
                        </motion.button>
                      );
                    })()}
                  />
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

  return defer({
    categories: await getCategories(),
    products: await getProducts(category)
  })
}