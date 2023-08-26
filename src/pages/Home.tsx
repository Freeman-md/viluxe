import CategoriesList from "../components/CategoriesList"
import Pagination from "../components/Pagination"
import ProductCard from "../components/ProductCard"
import { Product } from "../types"

const DUMMY_CATEGORIES = [
  "Electronics", "Clothing", "Home and Garden", "Sports and Outdoors", "Beauty and Personal Care", "Toys and Games", "Books", "Automotive", "Health and Wellness", "Jewelry", "Pet Supplies", "Food and Beverages", "Furniture", "Office Supplies", "Music and Movies", "Baby Products", "Travel and Luggage", "Fitness and Exercise", "Crafts and Hobbies", "Electrical Appliances"
]

const Home: React.FC = () => {
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
    <div className="container py-8 grid grid-cols-4 gap-8 relative">

      <CategoriesList categories={categories} />

      <div className="col-span-3 space-y-4">

        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 20 }, (_, index) => (
            <ProductCard product={product} key={index} />
          ))
          }
        </div>

        <Pagination />

      </div>

    </div>
  )
}

export default Home