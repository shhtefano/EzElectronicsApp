import { Category } from "./product"

/**
 * Represents a shopping cart.
 */
class Cart {
    cart_id: number
    customer: string
    paid: boolean
    paymentDate: string
    total: number
    products: ProductInCart[]

    /**
     * Creates a new instance of the Cart class.
     * @param cart_id - The identifier of the cart object in the database
     * @param customer - The username of the customer who owns the cart.
     * @param paid - A boolean value indicating whether the cart has been paid for.
     * @param paymentDate - The date the cart was paid for. This is null if the cart has not been paid for.
     * @param total - The total amount of the cart. It corresponds to the sum of the prices of all the products in the cart, computed as price * quantity.
     * @param products - The products in the cart.
     */
    constructor(cart_id: number, customer: string, paid: boolean, paymentDate: string | null, total: number, products: ProductInCart[] | null) {
        this.cart_id = cart_id
        this.customer = customer
        this.paid = paid
        this.paymentDate = paymentDate
        this.total = total
        this.products = products
    }
}

/**
 * Represents a product in a shopping cart.
 */
class ProductInCart {
    cart_id: number
    model: string
    quantity: number
    category: Category
    price: number

    /**
     * Creates a new instance of the ProductInCart class.
     * @param cart_id - The identifier of the cart object in the database
     * @param model - The model of the product.
     * @param quantity - The quantity (number of units) of the product in the cart.
     * @param category - The category of the product.
     * @param price - The price of a single product unit.
     */
    constructor(cart_id: number, model: string, quantity: number, category: Category, price: number) {
        this.cart_id = cart_id
        this.model = model
        this.quantity = quantity
        this.category = category
        this.price = price
    }
}

export { Cart, ProductInCart }
