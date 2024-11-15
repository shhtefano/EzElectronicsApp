import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import productController from "../../src/controllers/productController"
import ProductDAO from "../../src/dao/productDAO"
import { Role, User } from "../../src/components/user"
import { Product, Category } from "../../src/components/product"

jest.mock("../../src/dao/userDAO")


let ProductController: productController;


// Before each test, create a new instance of UserController
beforeEach(() => {
    ProductController = new productController();
});

// After each test, clear all mocks to avoid test interdependence
afterEach(() => {
    jest.clearAllMocks();
});

describe("ProductController unit Tests", () => {

    test("registerProducts - It should register a new product in database and return nothing", async () => {
        const product = { model:"iphone 13", category:"Smartphone", quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        jest.spyOn(ProductDAO.prototype, "registerFirstArrival").mockResolvedValueOnce();

        const response = await ProductController.registerProducts(product.model, product.category, product.quantity, product.details, product.sellingPrice, product.arrivalDate );

        expect(ProductDAO.prototype.registerFirstArrival).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.registerFirstArrival).toHaveBeenCalledWith(product.model, product.category, product.quantity, product.details, product.sellingPrice, product.arrivalDate );

    });

    test("changeProductQuantity - It should update quantity of a product and return updated quantity.", async () => {
        const product = { model:"iphone 13", category:"Smartphone", quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        let new_quantity = 100;

        jest.spyOn(ProductDAO.prototype, "registerQuantityUpdate").mockResolvedValueOnce(new_quantity);

        const response = await ProductController.changeProductQuantity(product.model, new_quantity, '2024-06-08');

        expect(ProductDAO.prototype.registerQuantityUpdate).toHaveBeenCalledTimes(1);
        // expect(ProductDAO.prototype.registerQuantityUpdate).toHaveBeenCalledWith(product.model, new_quantity, '');
        expect(ProductDAO.prototype.registerQuantityUpdate).toHaveBeenCalledWith(product.model, new_quantity, '2024-06-08');
        expect(response).toBe(new_quantity); 

    });

    test("sellProduct - It registers a physical sale and should return nothing.", async () => {
        const product = { model:"iphone 13", category:"Smartphone", quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}


        jest.spyOn(ProductDAO.prototype, "sellProducts").mockResolvedValueOnce();

        const response = await ProductController.sellProduct(product.model, product.quantity, '2024-06-08');

        expect(ProductDAO.prototype.sellProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.sellProducts).toHaveBeenCalledWith(product.model, product.quantity, '2024-06-08');
    });

    test("getProducts - It should return an array of products. (no grouping)", async () => {
        const product1 = { model:"iphone 13", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        const product2 = { model:"Asus rog premium 14", category:Category.LAPTOP, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        const product3 = { model:"iphone 15", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}


        jest.spyOn(ProductDAO.prototype, "getAllProducts").mockResolvedValueOnce([product1, product2, product3 ]);

        const response = await ProductController.getProducts(null, null, null);

        expect(ProductDAO.prototype.getAllProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.getAllProducts).toHaveBeenCalledWith(null, null, null);
        expect(response).toEqual([product1, product2, product3]);

    });

    test("getProducts - It should return an array of products. (grouping by category)", async () => {
        const product1 = { model:"Dell latitude", category:Category.LAPTOP, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        const product2 = { model:"Asus rog premium 14", category:Category.LAPTOP, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}

        jest.spyOn(ProductDAO.prototype, "getAllProducts").mockResolvedValueOnce([product1, product2]);

        const response = await ProductController.getProducts("category", Category.LAPTOP, null);

        expect(ProductDAO.prototype.getAllProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.getAllProducts).toHaveBeenCalledWith("category", Category.LAPTOP, null);
        expect(response).toEqual([product1, product2]);

    });

    test("getProducts - It should return an array of products. (grouping by model)", async () => {
        const product1 = { model:"iphone 13", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}

        jest.spyOn(ProductDAO.prototype, "getAllProducts").mockResolvedValueOnce([product1]);

        const response = await ProductController.getProducts("model", null, "iphone 13");

        expect(ProductDAO.prototype.getAllProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.getAllProducts).toHaveBeenCalledWith("model", null, "iphone 13");
        expect(response).toEqual([product1]);

    });

    test("getAvailableProducts - It should return an array of available products. (no grouping)", async () => {
        const product1 = { model:"iphone 13", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        const product2 = { model:"Asus rog premium 14", category:Category.LAPTOP, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        const product3 = { model:"iphone 15", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}

        jest.spyOn(ProductDAO.prototype, "getAvailableProducts").mockResolvedValueOnce([product1, product2, product3 ]);

        const response = await ProductController.getAvailableProducts(null, null, null);

        expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledWith(null, null, null);
        expect(response).toEqual([product1, product2, product3]);
    });

    test("getAvailableProducts - It should return an array of available products. (grouping by category)", async () => {
        const product1 = { model:"Dell latitude", category:Category.LAPTOP, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}
        const product2 = { model:"Asus rog premium 14", category:Category.LAPTOP, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}

        jest.spyOn(ProductDAO.prototype, "getAvailableProducts").mockResolvedValueOnce([product1, product2]);

        const response = await ProductController.getAvailableProducts(null, null, null);

        expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledWith(null, null, null);
        expect(response).toEqual([product1, product2]);
    });

    test("getAvailableProducts - It should return an array of available products. (grouping by model)", async () => {
        const product1 = { model:"iphone 13", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}

        jest.spyOn(ProductDAO.prototype, "getAvailableProducts").mockResolvedValueOnce([product1]);

        const response = await ProductController.getAvailableProducts("model", null, "iphone 13");

        expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledWith("model", null, "iphone 13");
        expect(response).toEqual([product1]);
    });
    
    test("deleteAllProducts - It should delete all products present in in database and return nothing.", async () => {

        jest.spyOn(ProductDAO.prototype, "deleteAllProducts").mockResolvedValueOnce();

        const response = await ProductController.deleteAllProducts();

        expect(ProductDAO.prototype.deleteAllProducts).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.deleteAllProducts).toHaveBeenCalledWith();
    });

    test("deleteProduct - It should delete a specific product and return nothing.", async () => {
        const product1 = { model:"iphone 13", category:Category.SMARTPHONE, quantity:50, details:"", sellingPrice:100.00, arrivalDate:""}

        jest.spyOn(ProductDAO.prototype, "deleteProduct").mockResolvedValueOnce();

        const response = await ProductController.deleteProduct(product1.model);

        expect(ProductDAO.prototype.deleteProduct).toHaveBeenCalledTimes(1);
        expect(ProductDAO.prototype.deleteProduct).toHaveBeenCalledWith(product1.model);
    });
});