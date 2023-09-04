class ProductService {
    static baseUrl = 'https://fakestoreapi.com'

    static fetchCategories = async () => {
        const response = await fetch(`${this.baseUrl}/products/categories`)

        return await response.json()
    }

    static fetchProducts = async () => {
        const url = `${this.baseUrl}/products`

        const response = await fetch(url)

        return await response.json()
    }

    static fetchProductsByCategory = async (category: string) => {
        const url = `${this.baseUrl}/products/category/${category}`

        const response = await fetch(url)

        return await response.json()
    }

    static fetchProduct = async (id: number) => {
        const url = `${this.baseUrl}/products/${id}`

        const response = await fetch(url)

        return await response.json()
    }
}

export default ProductService