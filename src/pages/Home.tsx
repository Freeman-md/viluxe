import { Field, Form, Formik, FormikProps } from "formik"
import * as Yup from 'yup';
import { motion } from "framer-motion";

import CategoriesList from "../components/CategoriesList"
import Pagination from "../components/Pagination"
import ProductCard from "../components/ProductCard"
import { Product } from "../types"
import { Await, defer, json, useLoaderData } from "react-router-dom";
import ProductService from "../api/product-service";
import { Suspense } from "react";
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

const HomePage: React.FC = () => {
  const { categories, products } = useLoaderData() as HomeLoaderDataProps

  return (
    <div className="container py-8 grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-8">

      <Suspense fallback={<LoadingSpinner text="Loading categories..." />}>
        <Await resolve={categories}>
          <CategoriesList categories={categories} />
        </Await>
      </Suspense>

      <div className="sm:col-span-2 lg:col-span-3 space-y-4">

        <Formik
          initialValues={
            {
              searchText: '',
              sortOption: ''
            }
          }
          validationSchema={
            Yup.object({
              searchText: Yup.string().min(2, 'Must be 2 characters or more')
            })
          }
          onSubmit={(values, actions) => {
            // handle form submission
          }}>
          {(props: FormikProps<any>) => (
            <Form className="flex justify-between items-center space-x-4">
              <Field name="searchText" placeholder="Search products..." className="form-control" />
              <Field as="select" name="sortOption" className="form-control">
                <option value="">-- Sort by --</option>
                <option value="asc">Alphabetical (A - Z)</option>
                <option value="desc">Alphabetical (Z - A)</option>
                <option value="price">Price (High to Low)</option>
                <option value="-price">Price (Low to High)</option>
              </Field>
            </Form>
          )}
        </Formik>

        <h2 className="text-xl font-medium">{products.length} Products</h2>

        <motion.div initial="hidden"
          animate="visible"
          variants={animatedProductList} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
          <Suspense fallback={<LoadingSpinner text="Loading products..." />}>
            <Await resolve={products}>
              {products.map((product, index) => (
                <motion.div variants={animatedProductItem} key={product.id} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </Await>
          </Suspense>
        </motion.div>

        <Pagination />

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

async function getProducts() {
  try {
    return await ProductService.fetchProducts()
  } catch (e) {
    throw json(
      { message: 'Could not fetch categories.' },
      {
        status: 500,
      }
    );
  }
}

export const loader = async () => {
  return defer({
    categories: await getCategories(),
    products: await getProducts(),
  })
}