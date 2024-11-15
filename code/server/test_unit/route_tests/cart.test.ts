import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"

import CartController from "../../src/controllers/cartController"
import { Cart, ProductInCart } from "../../src/components/cart"

import ProductController from "../../src/controllers/productController"
import { Product, Category } from "../../src/components/product"
// import { afterEach, beforeEach, describe } from "node:test"
import ErrorHandler from "../../src/helper"
import Authenticator from "../../src/routers/auth"
import { UnauthorizedUserError, UserAlreadyExistsError, UserNotFoundError } from "../../src/errors/userError"
import { EmptyProductStockError, LowProductStockError, ProductNotFoundError } from "../../src/errors/productError"
import { CartNotFoundError, EmptyCartError, ProductNotInCartError } from "../../src/errors/cartError"
// import { Server } from 'http'  // Importa il tipo Server da http

jest.mock("../../src/routers/auth")
jest.mock("../../src/controllers/cartController")

const baseURL = "/ezelectronics"
let testSmartphoneInCart = new ProductInCart(8, "modelSmartphone", 14, Category.SMARTPHONE, 7)
let testLaptopInCart = new ProductInCart(8, "modelLaptop", 14, Category.LAPTOP, 7)
let testApplianceInCart = new ProductInCart(8, "modelAppliance", 14, Category.APPLIANCE, 7)
let testCart = new Cart(5, "testCustomer", true, "2024-06-07", 1000, [testSmartphoneInCart, testLaptopInCart, testApplianceInCart])

beforeEach(() => {
    jest.clearAllMocks();  // Pulisce tutti i mock prima di ogni test
});

afterEach(() => {
    jest.clearAllMocks();  // Pulisce tutti i mock dopo ogni test
});

describe("Cart route unit tests", () => {

    describe("GET ezelectronics/carts", () => { 
        test("It should return a 200 success code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "getCart").mockResolvedValueOnce(testCart);

            // const response = await request(app).get(baseURL + "/users").send();
            const response = await request(app).get(baseURL + "/carts");
            expect(response.status).toBe(200);
            expect(CartController.prototype.getCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.getCart).toHaveBeenCalledWith(undefined);
            // expect(response).toEqual();
        });
    });


    describe("POST ezelectronics/carts", () => { 

        test("It should return a 200 success code", async () => {    
            const inputProduct = {model: testSmartphoneInCart.model };

            // jest.mock('express-validator', () => ({
            //     body: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //         notEmpty: () => ({ isLength: () => ({}) })
            //     })),
            // }));
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "addToCart").mockResolvedValueOnce(true);

            const response = await request(app).post(baseURL + "/carts").send(inputProduct);
            expect(response.status).toBe(200);
            expect(CartController.prototype.addToCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.addToCart).toHaveBeenCalledWith(undefined, testSmartphoneInCart.model);
        });

        test("It should return a 404 error code", async () => { 
            const inputProduct = {model: testSmartphoneInCart.model };

            // jest.mock('express-validator', () => ({
            //     body: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //         notEmpty: () => ({ isLength: () => ({}) })
            //     })),
            // }));
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "addToCart").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).post(baseURL + "/carts").send(inputProduct);
            expect(response.status).toBe(404);
            expect(CartController.prototype.addToCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.addToCart).toHaveBeenCalledWith(undefined, testSmartphoneInCart.model);
        });

        test("It should return a 409 error code", async () => { 
            const inputProduct = {model: testSmartphoneInCart.model };

            // jest.mock('express-validator', () => ({
            //     body: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //         notEmpty: () => ({ isLength: () => ({}) })
            //     })),
            // }));
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "addToCart").mockRejectedValueOnce(new EmptyProductStockError());

            const response = await request(app).post(baseURL + "/carts").send(inputProduct);
            expect(response.status).toBe(409);
            expect(CartController.prototype.addToCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.addToCart).toHaveBeenCalledWith(undefined, testSmartphoneInCart.model);
        });
    });

    describe("PATCH ezelectronics/carts", () => { 

        test("It should return a 200 success code", async () => {    
                        
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "checkoutCart").mockResolvedValueOnce();

            const response = await request(app).patch(baseURL + "/carts").send();
            expect(response.status).toBe(200);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(undefined);
        });

        test("It should return a 404 error code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "checkoutCart").mockRejectedValueOnce(new CartNotFoundError());

            const response = await request(app).patch(baseURL + "/carts");
            expect(response.status).toBe(404);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(undefined);
        });

        test("It should return a 400 error code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "checkoutCart").mockRejectedValueOnce(new EmptyCartError());

            const response = await request(app).patch(baseURL + "/carts");
            expect(response.status).toBe(400);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(undefined);
        });

        test("It should return a 409 error code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "checkoutCart").mockRejectedValueOnce(new EmptyProductStockError());

            const response = await request(app).patch(baseURL + "/carts");
            expect(response.status).toBe(409);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(undefined);
        });


        test("It should return a 409 error code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "checkoutCart").mockRejectedValueOnce(new LowProductStockError());

            const response = await request(app).patch(baseURL + "/carts");
            expect(response.status).toBe(409);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(undefined);
        });

    });

    describe("GET ezelectronics/carts/history", () => { 

        test("It should return a 200 success code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "getCustomerCarts").mockResolvedValueOnce([testCart]);

            const response = await request(app).get(baseURL + "/carts/history");
            expect(response.status).toBe(200);
            expect(CartController.prototype.getCustomerCarts).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.getCustomerCarts).toHaveBeenCalledWith(undefined);
        });
    });

    describe("DELETE ezelectronics/carts/products/:model", () => { 

        test("It should return a 200 success code", async () => { 
            
            const inputProduct = {model: testSmartphoneInCart.model };

            // jest.mock('express-validator', () => ({
            //     param: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //     })),
            // }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "removeProductFromCart").mockResolvedValueOnce(true);

            const response = await request(app).delete(baseURL + "/carts/products/" + inputProduct.model);
            expect(response.status).toBe(200);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledWith(undefined, inputProduct.model);
        });

        test("It should return a 404 error code", async () => {  
            const inputProduct = {model: testSmartphoneInCart.model };

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "removeProductFromCart").mockRejectedValueOnce(new ProductNotInCartError());

            const response = await request(app).delete(baseURL + "/carts/products/" + inputProduct.model);
            expect(response.status).toBe(404);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledWith(undefined, inputProduct.model);
        });

        test("It should return a 404 error code", async () => {  
            const inputProduct = {model: testSmartphoneInCart.model };

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "removeProductFromCart").mockRejectedValueOnce(new CartNotFoundError());

            const response = await request(app).delete(baseURL + "/carts/products/" + inputProduct.model);
            expect(response.status).toBe(404);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledWith(undefined, inputProduct.model);
        });

        test("It should return a 404 error code", async () => {  
            const inputProduct = {model: testSmartphoneInCart.model };

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "removeProductFromCart").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).delete(baseURL + "/carts/products/" + inputProduct.model);
            expect(response.status).toBe(404);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledWith(undefined, inputProduct.model);
        });

        
    });

    describe("DELETE ezelectronics/carts/current", () => { 

        test("It should return a 200 success code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "clearCart").mockResolvedValueOnce(true);

            const response = await request(app).delete(baseURL + "/carts/current");
            expect(response.status).toBe(200);
            expect(CartController.prototype.clearCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.clearCart).toHaveBeenCalledWith(undefined);          
        });

        test("It should return a 404 error code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "clearCart").mockRejectedValueOnce(new CartNotFoundError());

            const response = await request(app).delete(baseURL + "/carts/current");
            expect(response.status).toBe(404);
            expect(CartController.prototype.clearCart).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.clearCart).toHaveBeenCalledWith(undefined);       
        });
    });

    describe("DELETE ezelectronics/carts", () => { 

        test("It should return a 200 success code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "deleteAllCarts").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/carts");
            expect(response.status).toBe(200);
            expect(CartController.prototype.deleteAllCarts).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.deleteAllCarts).toHaveBeenCalledWith();
        });
    });

    describe("GET ezelectronics/carts/all", () => { 

        test("It should return a 200 success code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(CartController.prototype, "getAllCarts").mockResolvedValueOnce([testCart]);

            const response = await request(app).get(baseURL + "/carts/all");
            expect(response.status).toBe(200);
            expect(CartController.prototype.getAllCarts).toHaveBeenCalledTimes(1);
            expect(CartController.prototype.getAllCarts).toHaveBeenCalledWith();        
        });
    });
});