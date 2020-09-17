export default (products) => {
    return products.reduce( (sum, product) => sum + product.price * product.quantity, 0)
}
