import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import CartController from "../../src/controllers/cartController"
import CartDAO from "../../src/dao/cartDAO"
import {Cart, ProductInCart} from "../../src/components/cart"
import { Role, User } from "../../src/components/user"
import { Category } from "../../src/components/product"

jest.mock("../../src/dao/reviewDAO")

let cartController: CartController;

// Before each test, create a new instance of UserController
beforeEach(() => {
    cartController = new CartController();
});

// After each test, clear all mocks to avoid test interdependence
afterEach(() => {
    jest.clearAllMocks();
});

// Define a describe block for grouping related tests
describe("CartController Unit Tests", () => {

    test("getCart - It should return current cart owned by the user.", async () => {

        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testProductInCart = [{cart_id: 7, model: "iphone 13", quantity: 16, category: Category.SMARTPHONE, price: 1000.00}]

        const testCart = new Cart( 7, testUser.username, false, "", 1000.00, testProductInCart);
        
        jest.spyOn(CartDAO.prototype, "getCart").mockResolvedValueOnce(testCart); 

        const response = await cartController.getCart(testUser);

        expect(CartDAO.prototype.getCart).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.getCart).toHaveBeenCalledWith(testUser);
        expect(response).toEqual(testCart);
    });

    test("addToCart - It should add a product to a cart and return true.", async () => {
    
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        
        jest.spyOn(CartDAO.prototype, 'addToCart').mockResolvedValueOnce(true);

        const response = await cartController.addToCart(testUser, "iphone 13");

        expect(CartDAO.prototype.addToCart).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.addToCart).toBeCalledWith(testUser, "iphone 13");
        expect(response).toBe(true);
    });

    test("checkoutCart - It should checkout current cart and return nothing.", async () => {
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");

        jest.spyOn(CartDAO.prototype, 'checkoutCart').mockResolvedValueOnce();

        const response = await cartController.checkoutCart(testUser);

        expect(CartDAO.prototype.checkoutCart).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.checkoutCart).toHaveBeenCalledWith(testUser);
    });

    test("getCustomerCarts - It should return carts that have been checked out.", async () => {
    
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testProductInCart = [{cart_id: 7, model: "iphone 13", quantity: 16, category: Category.SMARTPHONE, price: 1000.00}]
        const testProductInCart2 = [{cart_id: 8, model: "iphone 13", quantity: 16, category: Category.SMARTPHONE, price: 1000.00}]
        const testCart1 = new Cart( 7, testUser.username, false, "", 1000.00, testProductInCart);
        const testCart2 = new Cart( 8, testUser.username, true, "", 1000.00, testProductInCart2);
        
        jest.spyOn(CartDAO.prototype, 'getCartHistory').mockResolvedValueOnce([testCart1, testCart2]);

        const response = await cartController.getCustomerCarts(testUser);

        expect(CartDAO.prototype.getCartHistory).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.getCartHistory).toHaveBeenCalledWith(testUser);
        // expect(response).toBe(void); //Check if the response is true
    });

    test("removeProductFromCart - It should remove a product from cart and return true", async () => {
   
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
    
        jest.spyOn(CartDAO.prototype, 'removeProductFromCart').mockResolvedValueOnce(true);

        const response = await cartController.removeProductFromCart(testUser, "iphone 13");

        expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledWith(testUser, "iphone 13");
        expect(response).toBe(true);
    });

    test("clearCart - It should empty the current cart and return true.", async () => {
   
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
     
        jest.spyOn(CartDAO.prototype, 'clearCart').mockResolvedValueOnce(true);
    
        const response = await cartController.clearCart(testUser);
    
        expect(CartDAO.prototype.clearCart).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.clearCart).toHaveBeenCalledWith(testUser);
        expect(response).toBe(true);
    });
    
    test("deleteAllCarts - It should delete all carts present in database and return nothing.", async () => {
                
        jest.spyOn(CartDAO.prototype, 'deleteAllCarts').mockResolvedValueOnce();

        const response = await cartController.deleteAllCarts();

        expect(CartDAO.prototype.deleteAllCarts).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.deleteAllCarts).toHaveBeenCalledWith();
    });

    test("getAllCarts - It should return an array of carts of all users, both past and current carts.", async () => {
        const testUser1 = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testUser2 = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testProductInCart = [{cart_id: 7, model: "iphone 13", quantity: 16, category: Category.SMARTPHONE, price: 1000.00}]

        const testCart1 = new Cart( 7, testUser1.username, false, "", 1000.00, []);
        const testCart2 = new Cart( 7, testUser1.username, false, "", 1000.00, []);
        const testCart3 = new Cart( 7, testUser2.username, false, "", 1000.00, testProductInCart);

        
        jest.spyOn(CartDAO.prototype, 'getAllCarts').mockResolvedValueOnce([testCart1, testCart2, testCart3]);

        const response = await cartController.getAllCarts();

        expect(CartDAO.prototype.getAllCarts).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.getAllCarts).toHaveBeenCalledWith();
        expect(response).toEqual([testCart1, testCart2, testCart3]);

    });
});


