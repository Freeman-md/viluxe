class ProductService {
    static baseUrl = 'https://fakestoreapi.com/'

    static fetchCategories = async () => {
        const response = await fetch(`${this.baseUrl}/products/categories`)

        console.log(response)
    }
}

export default ProductService