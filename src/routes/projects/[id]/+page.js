export const load = async ({ fetch }) => {
    const fetchProducts = async () =>{
        const productRes = await fetch('https://dummyjson.com/products?limit=5')
        const productData = await productRes.json()
        const products = productData.products

        return productData.products
    }

    return {
        products: fetchProducts()
    }
}