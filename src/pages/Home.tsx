import { Field, Form, Formik, FormikProps } from "formik"
import * as Yup from 'yup';
import { motion } from "framer-motion";

import CategoriesList from "../components/CategoriesList"
import Pagination from "../components/Pagination"
import ProductCard from "../components/ProductCard"
import { Product } from "../types"

const DUMMY_CATEGORIES = [
  "Electronics", "Clothing", "Home and Garden", "Sports and Outdoors", "Beauty and Personal Care", "Toys and Games", "Books", "Automotive", "Health and Wellness", "Jewelry", "Pet Supplies", "Food and Beverages", "Furniture", "Office Supplies", "Music and Movies", "Baby Products", "Travel and Luggage", "Fitness and Exercise", "Crafts and Hobbies", "Electrical Appliances"
]

const list = {
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

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

const HomePage: React.FC = () => {
  const categories = DUMMY_CATEGORIES
  const product: Product = {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }

  return (
    <div className="container py-8 grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-8">

      <CategoriesList categories={categories} />

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

        <h2 className="text-xl font-medium">20 Products</h2>

        <motion.div initial="hidden"
          animate="visible"
          variants={list} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {Array.from({ length: 20 }, (_, index) => (
            <motion.div variants={item} key={index}>
              <ProductCard product={product} />
            </motion.div>
          ))
          }
        </motion.div>

        <Pagination />

      </div>

    </div>
  )
}

export default HomePage