import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"

import ProductController from "../../src/controllers/productController"
import { Category, Product } from "../../src/components/product"
import ErrorHandler from "../../src/helper"
import Authenticator from "../../src/routers/auth"
import { DateError, FilterError } from "../../src/utilities"
import { EmptyProductStockError, LowProductStockError, ProductAlreadyExistsError, ProductNotFoundError } from "../../src/errors/productError"

jest.mock("../../src/routers/auth")
jest.mock("../../src/controllers/productController")

const baseURL = "/ezelectronics"

beforeEach(() => {
    jest.clearAllMocks();  // Pulisce tutti i mock prima di ogni test
});

// afterEach(() => {
//     jest.clearAllMocks();  
// });

describe("Product route unit tests", () => {

    describe("POST ezelectronics/products", () => {

        test("It should return a 200 success code (product)", async () => {
            const inputProduct = {model:'iphone 13', category:'Smartphone', quantity:10, details:'details', sellingPrice:100, arrivalDate:''};

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                    isInt: () => ({ isLength: () => ({}) }),
                    isFloat: () => ( { isLength: () => ({}) }),
                    isDate: () => ({ isLength: () => ({}) }),
                }))
            }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "registerProducts").mockResolvedValueOnce();

            const response = await request(app).post(baseURL + "/products").send(inputProduct);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.registerProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.registerProducts).toHaveBeenCalledWith(inputProduct.model, inputProduct.category, inputProduct.quantity, inputProduct.details, inputProduct.sellingPrice, inputProduct.arrivalDate);
        });


        test("It should return a 409 fail code (product)", async () => {
            const inputProduct = {model:'iphone 14', category:'Smartphone', quantity:10, details:'details', sellingPrice:100, arrivalDate:'2020-10-10'};

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                    isInt: () => ({ isLength: () => ({}) }),
                    isFloat: () => ( { isLength: () => ({}) }),
                    isDate: () => ({ isLength: () => ({}) }),
                }))
            }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "registerProducts").mockRejectedValueOnce(new ProductAlreadyExistsError());

            const response = await request(app).post(baseURL + "/products").send(inputProduct);
            
            expect(response.status).toBe(409);
            expect(ProductController.prototype.registerProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.registerProducts).toHaveBeenCalledWith(inputProduct.model, inputProduct.category, inputProduct.quantity, inputProduct.details, inputProduct.sellingPrice, inputProduct.arrivalDate);

        });

        test("It should return a 400 fail code (product)", async () => {
            const inputProduct = {model:'iphone 140', category:'Smartphone', quantity:10, details:'details', sellingPrice:100, arrivalDate:'2030-10-10'};

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                    isInt: () => ({ isLength: () => ({}) }),
                    isFloat: () => ( { isLength: () => ({}) }),
                    isDate: () => ({ isLength: () => ({}) }),
                }))
            }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "registerProducts").mockRejectedValueOnce(new DateError());

            const response = await request(app).post(baseURL + "/products").send(inputProduct);
            
            expect(response.status).toBe(400);
            expect(ProductController.prototype.registerProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.registerProducts).toHaveBeenCalledWith(inputProduct.model, inputProduct.category, inputProduct.quantity, inputProduct.details, inputProduct.sellingPrice, inputProduct.arrivalDate);

        });
    });

    describe("PATCH ezelectronics/products/:model", () => {

        test("It should return a 200 success code (product)", async () => {
            const inputProduct = {model:'iphone 13', quantity:20, changeDate:'2024-06-06'};
            let model = 'iphone 13';
            // jest.mock('express-validator', () => ({
            //     body: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //         isInt: () => ({ isLength: () => ({}) }),
            //         isDate: () => ({ isLength: () => ({}) }),
            //     }))
            // }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockResolvedValueOnce(100);

            const response = await request(app).patch(baseURL + "/products/" + inputProduct.model).send(inputProduct);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledWith(inputProduct.model, inputProduct.quantity, inputProduct.changeDate);

        });

        test("It should return a 404 fail code (product)", async () => {
            const inputProduct = {model:'iphone 13', quantity:20, changeDate:'2024-06-06'};
            let model = 'iphone 13';

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).patch(baseURL + "/products/" + inputProduct.model).send(inputProduct);
            expect(response.status).toBe(404);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledWith(inputProduct.model, inputProduct.quantity, inputProduct.changeDate);

        });

        test("It should return a 400 fail code (product)", async () => {
            const inputProduct = {model:'iphone 13', quantity:20, changeDate:'2030-06-06'};
            let model = 'iphone 13';

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockRejectedValueOnce(new DateError());

            const response = await request(app).patch(baseURL + "/products/" + inputProduct.model).send(inputProduct);
            expect(response.status).toBe(400);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledWith(inputProduct.model, inputProduct.quantity, inputProduct.changeDate);

        });

        test("It should return a 400 fail code (product)", async () => {
            const inputProduct = {model:'iphone 13', quantity:20, changeDate:'2030-06-06'};
            let model = 'iphone 13';

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockRejectedValueOnce(new DateError());

            const response = await request(app).patch(baseURL + "/products/" + inputProduct.model).send(inputProduct);
            expect(response.status).toBe(400);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.changeProductQuantity).toHaveBeenCalledWith(inputProduct.model, inputProduct.quantity, inputProduct.changeDate);

        });
    });

    describe("PATCH ezelectronics/products/:model/sell", () => {

        test("It should return a 200 success code (product)", async () => {
            const inputSale = {model:'iphone 13', quantity:20, sellingDate:'2024-06-06'};

            // jest.mock('express-validator', () => ({
            //     body: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //         isInt: () => ({ isLength: () => ({}) }),
            //         isDate: () => ({ isLength: () => ({}) }),
            //     }))
            // }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "sellProduct").mockResolvedValueOnce();

            const response = await request(app).patch(baseURL + "/products/" +inputSale.model+"/sell").send(inputSale);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledWith(inputSale.model, inputSale.quantity, inputSale.sellingDate);

        });

        test("It should return a 404 fail code (product)", async () => {
            const inputSale = {model:'iphone 13', quantity:20, sellingDate:'2024-06-06'};

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "sellProduct").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).patch(baseURL + "/products/" +inputSale.model+"/sell").send(inputSale);
            expect(response.status).toBe(404);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledWith(inputSale.model, inputSale.quantity, inputSale.sellingDate);

        });

        test("It should return a 400 fail code (product)", async () => {
            const inputSale = {model:'iphone 13', quantity:20, sellingDate:'2024-06-06'};

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "sellProduct").mockRejectedValueOnce(new DateError());

            const response = await request(app).patch(baseURL + "/products/" +inputSale.model+"/sell").send(inputSale);
            expect(response.status).toBe(400);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledWith(inputSale.model, inputSale.quantity, inputSale.sellingDate);

        });

        test("It should return a 400 fail code (product)", async () => {
            const inputSale = {model:'iphone 13', quantity:20, sellingDate:'2024-06-06'};

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "sellProduct").mockRejectedValueOnce(new DateError());

            const response = await request(app).patch(baseURL + "/products/" +inputSale.model+"/sell").send(inputSale);
            expect(response.status).toBe(400);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledWith(inputSale.model, inputSale.quantity, inputSale.sellingDate);

        });

        test("It should return a 409 fail code (EmptyProductStockError)", async () => {
            const inputSale = {model:'iphone 13', quantity:20, sellingDate:'2024-06-06'};

            // jest.mock('express-validator', () => ({
            //     body: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //         isInt: () => ({ isLength: () => ({}) }),
            //         isDate: () => ({ isLength: () => ({}) }),
            //     }))
            // }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "sellProduct").mockRejectedValueOnce(new EmptyProductStockError());

            const response = await request(app).patch(baseURL + "/products/" +inputSale.model+"/sell").send(inputSale);
            expect(response.status).toBe(409);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledWith(inputSale.model, inputSale.quantity, inputSale.sellingDate);

        });

        test("It should return a 409 fail code (LowStockError - product)", async () => {
            const inputSale = {model:'iphone 13', quantity:20, sellingDate:'2024-06-06'};

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isInt: () => ({ isLength: () => ({}) }),
                    isDate: () => ({ isLength: () => ({}) }),
                }))
            }));

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "sellProduct").mockRejectedValueOnce(new LowProductStockError());

            const response = await request(app).patch(baseURL + "/products/" +inputSale.model+"/sell").send(inputSale);
            expect(response.status).toBe(409);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.sellProduct).toHaveBeenCalledWith(inputSale.model, inputSale.quantity, inputSale.sellingDate);

        });
    });

    describe("GET ezelectronics/products", () => {

        test("It should return a 200 success code (product, grouping-category)", async () => {
            let grouping = "category"
            let category = Category.LAPTOP

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getProducts").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/products?grouping=" + grouping + "&category=" + category);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(grouping, category, undefined);
        });

        test("It should return a 200 success code (product, grouping-model)", async () => {
            let grouping = "model"
            let model = "product1"

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getProducts").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/products?grouping=" + grouping + "&model=" + model);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(grouping, undefined, model);
        });

        test("It should return a 200 success code (product, no grouping)", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getProducts").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/products/");
            expect(response.status).toBe(200);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(undefined, undefined, undefined);
        });

        test("It should return a 422 fail code (product)", async () => {
            // It should return a 422 error if grouping is null and any of category or model is not null
            let grouping = undefined;
            let category = Category.LAPTOP;
            let model = undefined;

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getProducts").mockRejectedValueOnce(new FilterError());

            const response = await request(app).get(baseURL + "/products?category=" + category);
            expect(response.status).toBe(422);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(grouping, category, model);
        });

        test("It should return a 422 fail code (product)", async () => {
            let grouping = "category";
            let category = undefined;
            let model = "product1";
            // It should return a 422 error if grouping is category and category is null OR model is not null

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getProducts").mockRejectedValueOnce(new FilterError());

            const response = await request(app).get(baseURL + "/products?grouping=" + grouping + "&model=" + model);
            expect(response.status).toBe(422);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(grouping, category, model);
        });

        test("It should return a 422 fail code (product)", async () => {
            // It should return a 422 error if grouping is model and model is null OR category is not null
            let grouping = "model";
            let category = Category.LAPTOP;
            let model = undefined;

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getProducts").mockRejectedValueOnce(new FilterError());

            const response = await request(app).get(baseURL + "/products?grouping=" + grouping + "&category=" + category);
            expect(response.status).toBe(422);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(grouping, category, model);
        });

        test("It should return a 404 fail code (product)", async () => {
            let grouping = "model"
            let model = "product4"
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });
    
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });
    
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });
    
            jest.spyOn(ProductController.prototype, "getProducts").mockRejectedValueOnce(new ProductNotFoundError());
    
            const response = await request(app).get(baseURL + "/products?grouping=" + grouping + "&model=" + model);
    
            expect(response.status).toBe(404);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getProducts).toHaveBeenCalledWith(grouping, undefined, model);
        });
    });

    describe("GET ezelectronics/products/available", () => {     

        test("It should return a 200 success code (product, grouping-category)", async () => {
            let grouping = "category"
            let category = Category.LAPTOP

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/products/available?grouping=" + grouping + "&category=" + category);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, category, undefined);
        });

        test("It should return a 200 success code (product, grouping-model)", async () => {
            let grouping = "model"
            let model = "product1"

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/products/available?grouping=" + grouping + "&model=" + model);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, undefined, model);
        });

        test("It should return a 200 success code (product, no grouping)", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/products/available");
            expect(response.status).toBe(200);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(undefined, undefined, undefined);
        });

        test("It should return a 422 error code (product)", async () => {
            // It should return a 422 error if grouping is null and any of category or model is not null
            let grouping = undefined;
            let category = Category.LAPTOP;
            let model = undefined;

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockRejectedValueOnce(new FilterError());

            const response = await request(app).get(baseURL + "/products/available?category=" + category);
            expect(response.status).toBe(422);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, category, model);
        });

        test("It should return a 422 error code (product)", async () => {
            let grouping = "category";
            let category = undefined;
            let model = "product1";
            // It should return a 422 error if grouping is category and category is null OR model is not null

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockRejectedValueOnce(new FilterError());

            const response = await request(app).get(baseURL + "/products/available?grouping=" + grouping + "&model=" + model);
            expect(response.status).toBe(422);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, category, model);
        });

        test("It should return a 422 error code (product)", async () => {
            // It should return a 422 error if grouping is model and model is null OR category is not null
            let grouping = "model";
            let category = Category.LAPTOP;
            let model = undefined;

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockRejectedValueOnce(new FilterError());

            const response = await request(app).get(baseURL + "/products/available?grouping=" + grouping + "&category=" + category);
            expect(response.status).toBe(422);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, category, model);
        });

        test("It should return a 404 error code (product)", async () => {
            let grouping = "model"
            let model = "product4"
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });
    
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });
    
            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockRejectedValueOnce(new ProductNotFoundError());
    
            const response = await request(app).get(baseURL + "/products/available?grouping=" + grouping + "&model=" + model);
    
            expect(response.status).toBe(404);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, undefined, model);
        });    
    });
    
    describe("DELETE ezelectronics/products/:model", () => {
        let model = "product1";
        
        test("It should return a 200 success code (product)", async () => {
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "deleteProduct").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/products/" + model);
            expect(response.status).toBe(200);
            expect(ProductController.prototype.deleteProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.deleteProduct).toHaveBeenCalledWith(model);

        });

        test("It should return a 404 error code (product)", async () => {
            let model = "product4";

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "deleteProduct").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).delete(baseURL + "/products/" + model);
            expect(response.status).toBe(404);
            expect(ProductController.prototype.deleteProduct).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.deleteProduct).toHaveBeenCalledWith(model);

        }); 
    });


    describe("DELETE ezelectronics/products", () => {
        test("It should return a 200 success code (product)", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ProductController.prototype, "deleteAllProducts").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/products/");
            expect(response.status).toBe(200);
            expect(ProductController.prototype.deleteAllProducts).toHaveBeenCalledTimes(1);
            expect(ProductController.prototype.deleteAllProducts).toHaveBeenCalledWith();
        });   
    });
});