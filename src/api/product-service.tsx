class ProductService {
    static baseUrl = 'https://fakestoreapi.com'

    static fetchCategories = async () => {
        const response = await fetch(`${this.baseUrl}/products/categories`)

        return await response.json()
    }

    static fetchProducts = async () => {
        const response = await fetch(`${this.baseUrl}/products`)

        return await response.json()
    }
}

export default ProductService