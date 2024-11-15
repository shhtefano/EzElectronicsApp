import { describe, test, expect, beforeAll, afterAll, jest, beforeEach, afterEach } from "@jest/globals"

import ProductDAO from "../../src/dao/productDAO"

import db from "../../src/db/db"
import { Database } from "sqlite3"
import { Category, Product } from "../../src/components/product"
import { EmptyProductStockError, LowProductStockError, ProductAlreadyExistsError, ProductNotFoundError } from "../../src/errors/productError"

import { DateError, FilterError, Utility } from "../../src/utilities"
import ReviewDAO from "../../src/dao/reviewDAO"

jest.mock("../../src/db/db.ts")

let productDAO: ProductDAO;
let reviewDAO: ReviewDAO;

beforeEach(() => {
  productDAO = new ProductDAO();
  reviewDAO = new ReviewDAO();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ProductDAO unit Tests",  () => {
    describe("registerFirstArrival", () => {
      test("It should register a new product in database and resolve to void (product not in database) - ok", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
    
        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockRejectedValue(new ProductNotFoundError());
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            //const row = { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 }
            callback(null);
            return {} as Database;
        });
    
        const result = await productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate);
        expect(result).toBeUndefined();
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO product(model, category, quantity, details, sellingPrice, arrivalDate, deleted) VALUES(?, ?, ?, ?, ?, ?, ?)", 
            [p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate, 0], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to void (product in database, deleted) - ok", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
    
        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockResolvedValue(p);
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            //const row = { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 }
            callback(null);
            return {} as Database;
        });
    
        const result = await productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate);
        expect(result).toBeUndefined();
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET category=?, quantity=?, details=?, sellingPrice=?, arrivalDate=?, deleted=0 WHERE model = ? ", 
            [p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should reject with a DateError (arrivalDate is after current date)", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2030-05-05", "", 100);
        
        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockResolvedValue(p);
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValueOnce(false);
        await expect(productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate)).rejects.toThrow(new DateError());
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        
        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
      });

      test("It should reject with a DB error (checking product deleted)", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2030-05-05", "", 100);
        
        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockRejectedValue(new Error("DB error"));
        await expect(productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate)).rejects.toThrow();
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        
        mockCheckProductDeleted.mockRestore();
      });
    
      test("It should reject with a DateError (arrivalDate is after current date)", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2030-05-05", "", 100);
        
        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockResolvedValue(p);
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValueOnce(false);
        await expect(productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate)).rejects.toThrow(new DateError());
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        
        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
      });

      test("It should reject with a ProductAlreadyExists (product not in database)", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);

        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockRejectedValue(new ProductNotFoundError());
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            //const row = { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 }
            callback(new ProductAlreadyExistsError());
            return {} as Database;
        });
    
        await expect(productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate)).rejects.toThrow();
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO product(model, category, quantity, details, sellingPrice, arrivalDate, deleted) VALUES(?, ?, ?, ?, ?, ?, ?)", 
            [p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate, 0], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should reject with a DB error (product not in database)", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);

        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockRejectedValue(new ProductNotFoundError());
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            //const row = { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 }
            callback(new Error("DB error"));
            return {} as Database;
        });
    
        await expect(productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate)).rejects.toThrow();
        
        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO product(model, category, quantity, details, sellingPrice, arrivalDate, deleted) VALUES(?, ?, ?, ?, ?, ?, ?)", 
            [p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate, 0], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should reject with a DB error (product in database, deleted)", async () => {
        const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);

        const mockCheckProductDeleted = jest.spyOn(Utility, "checkProductDeleted").mockResolvedValue(p);
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            //const row = { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 }
            callback(new Error("DB error"));
            return {} as Database;
        });
    
        await expect(productDAO.registerFirstArrival(p.model, p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate)).rejects.toThrow();

        expect(mockCheckProductDeleted).toHaveBeenCalledTimes(1);
        expect(mockCheckProductDeleted).toHaveBeenCalledWith(p.model);
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(p.arrivalDate, null);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET category=?, quantity=?, details=?, sellingPrice=?, arrivalDate=?, deleted=0 WHERE model = ? ", 
            [p.category, p.quantity, p.details, p.sellingPrice, p.arrivalDate, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
        
        mockCheckProductDeleted.mockRestore();
        mockCheckDateAfter.mockRestore();
        mockDBRun.mockRestore();
      });
    });

    describe("registerQuantityUpdate", () => {
        test("It should return updated quantity and resolve to a number", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityIncreasing = 120;
            const newQuantity = 220;
            const changeDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null, newQuantity);
                return {} as Database;
            });
        
            const result = await productDAO.registerQuantityUpdate(p.model, quantityIncreasing, changeDate);
            expect(result).toBe(newQuantity);
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(changeDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(changeDate, p.arrivalDate);
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity=? WHERE model=?", 
                [newQuantity, p.model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(1);
        
            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const newQuantity = 120;
            const changeDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
        
            await expect(productDAO.registerQuantityUpdate(p.model, newQuantity, changeDate)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to DB error (checking product existing)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const newQuantity = 120;
            const changeDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
        
            await expect(productDAO.registerQuantityUpdate(p.model, newQuantity, changeDate)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to DateError (changeDate is after current date)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const newQuantity = 120;
            const changeDate = "2030-06-05";
        
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(false);
            
            await expect(productDAO.registerQuantityUpdate(p.model, newQuantity, changeDate)).rejects.toThrow(new DateError());
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(changeDate, null);
            
            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
        });

        test("It should resolve to DateError (changeData is before arrivalDate)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const newQuantity = 120;
            const changeDate = "2020-06-05";
        
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(false);
            
            await expect(productDAO.registerQuantityUpdate(p.model, newQuantity, changeDate)).rejects.toThrow(new DateError());
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(changeDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(changeDate, p.arrivalDate);

            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
        });

        test("It should resolve to DB error", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityIncreasing = 120;
            const newQuantity = 220;
            const changeDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database;
            });
        
            await expect(productDAO.registerQuantityUpdate(p.model, quantityIncreasing, changeDate)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(changeDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(changeDate, p.arrivalDate);
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity=? WHERE model=?", 
                [newQuantity, p.model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(1);
        
            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
            mockDBRun.mockRestore();
        });
    });

    describe("sellProducts", () => {
        test("It should register a physical sale and resolve to void", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 80;
            const newQuantity = 20;
            const sellingDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null, newQuantity);
                return {} as Database;
            });
        
            const result = await productDAO.sellProducts(p.model, quantityDecreasing, sellingDate);
            expect(result).toBeUndefined();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(sellingDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(sellingDate, p.arrivalDate);
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity=? WHERE model=?", 
                [newQuantity, p.model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(1);
        
            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 120;
            const sellingDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
        
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to DB error (checking product existing)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 120;
            const sellingDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
        
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to DateError (sellingDate is after current date)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 120;
            const sellingDate = "2030-06-05";
        
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(false);
            
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow(new DateError());
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(sellingDate, null);
            
            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
        });

        test("It should resolve to DateError (sellingDate is before arrivalDate)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 120;
            const sellingDate = "2020-06-05";
        
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(false);
            
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow(new DateError());
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(sellingDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(sellingDate, p.arrivalDate);

            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
        });

        test("It should resolve to EmptyProductStockError (product.quantity<1)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 0);
            const quantityDecreasing = 120;
            const sellingDate = "2024-06-05";
        
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(false);
            
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow(new EmptyProductStockError());
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(sellingDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(sellingDate, p.arrivalDate);

            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
        });

        test("It should resolve to LowProductStockError (newQuantity<1)", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 80;
            const sellingDate = "2024-06-05";
        
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(false);
            
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow(new LowProductStockError());
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(sellingDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(sellingDate, p.arrivalDate);

            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
        });

        test("It should resolve to DB error", async () => {
            const p = new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100);
            const quantityDecreasing = 80;
            const newQuantity = 20;
            const sellingDate = "2024-06-05";
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
            const mockCheckDateBefore = jest.spyOn(Utility, "checkDateBefore").mockReturnValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database;
            });
        
            await expect(productDAO.sellProducts(p.model, quantityDecreasing, sellingDate)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
            expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
            expect(mockCheckDateAfter).toHaveBeenCalledWith(sellingDate, null);
            expect(mockCheckDateBefore).toHaveBeenCalledTimes(1);
            expect(mockCheckDateBefore).toHaveBeenCalledWith(sellingDate, p.arrivalDate);
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity=? WHERE model=?", 
                [newQuantity, p.model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(1);
        
            mockCheckProductExists.mockRestore();
            mockCheckDateAfter.mockRestore();
            mockCheckDateBefore.mockRestore();
            mockDBRun.mockRestore();
        });
    });

    describe("getAllProducts", () => {
        test("It should return all products in database and resolve to Product[] (no grouping)", async () => {
            const p = [
                new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100),
                new Product(15, "product2", Category.LAPTOP, "2024-04-30", "", 150),
                new Product(20, "product3", Category.APPLIANCE, "2024-01-25", "", 0)
            ];
            let grouping = null
            let category = null
            let model = null
            const query = "SELECT * FROM product WHERE deleted=0"

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [
                    { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 },
                    { sellingPrice: 15, model: "product2", category: Category.LAPTOP, arrivalDate: "2024-04-30", details: "", quantity: 150 },
                    { sellingPrice: 20, model: "product3", category: Category.APPLIANCE, arrivalDate: "2024-01-25", details: "", quantity: 0 }
                ];
                callback(null, rows);
                return {} as Database;
            });
        
            const result = await productDAO.getAllProducts(grouping, category, model);
            expect(result).toEqual(p);
        
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockDBAll.mockRestore();
        });
        
        test("it should reject with a DB error", async () => {
            let grouping = null
            let category = null
            let model = null
            const query = "SELECT * FROM product WHERE deleted=0"

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"), null);
                return {} as Database;
            });
        
            await expect(productDAO.getAllProducts(grouping, category, model)).rejects.toThrow("DB error");
        
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockDBAll.mockRestore();
        });

        test("It should resolve to Product[] (grouping by category)", async () => {
            const p = [
                new Product(10, "product1", Category.LAPTOP, "2024-05-05", "", 100),
                new Product(15, "product2", Category.LAPTOP, "2024-04-30", "", 150),
                new Product(20, "product3", Category.LAPTOP, "2024-01-25", "", 0)
            ];
            let grouping = "category"
            let category = Category.LAPTOP
            let model = null
            const query = "SELECT * FROM product WHERE deleted=0 AND category='" + category + "'";

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [
                    { sellingPrice: 10, model: "product1", category: Category.LAPTOP, arrivalDate: "2024-05-05", details: "", quantity: 100 },
                    { sellingPrice: 15, model: "product2", category: Category.LAPTOP, arrivalDate: "2024-04-30", details: "", quantity: 150 },
                    { sellingPrice: 20, model: "product3", category: Category.LAPTOP, arrivalDate: "2024-01-25", details: "", quantity: 0 }
                ];
                callback(null, rows);
                return {} as Database;
            });
        
            const result = await productDAO.getAllProducts(grouping, category, model);
            expect(result).toEqual(p);
        
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockDBAll.mockRestore();
        });

        test("It should resolve to Product[] (grouping by model)", async () => {
            const p = [
                new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100),
            ];
            let grouping = "model"
            let category = null
            let model = "product1"
            const query = "SELECT * FROM product WHERE deleted=0 AND model='" + model + "'";

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p[0]);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [
                    { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 },
                ];
                callback(null, rows);
                return {} as Database;
            });
        
            const result = await productDAO.getAllProducts(grouping, category, model);
            expect(result).toEqual(p);
        
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockCheckProductExists.mockRestore();
            mockDBAll.mockRestore();
        });
        
        test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
            let grouping = "model"
            let category = null
            let model = "product1"
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
        
            await expect(productDAO.getAllProducts(grouping, category, model)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to DB error (checking product existing)", async () => {
            let grouping = "model"
            let category = null
            let model = "product1"
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
        
            await expect(productDAO.getAllProducts(grouping, category, model)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to FilterError (grouping is null, category or model are not null)", async () => {
            let grouping = null
            let category = null
            let model = "product1"
        
            await expect(productDAO.getAllProducts(grouping, category, model)).rejects.toThrow(new FilterError());
        });

        test("It should resolve to FilterError (grouping is equal to category, category is null or model is not null)", async () => {
            let grouping = "category"
            let category = null
            let model = "product1"
        
            await expect(productDAO.getAllProducts(grouping, category, model)).rejects.toThrow(new FilterError());
        });

        test("It should resolve to FilterError (grouping is equal to model, category is not null or model is null)", async () => {
            let grouping = "model"
            let category = Category.LAPTOP
            let model = null
        
            await expect(productDAO.getAllProducts(grouping, category, model)).rejects.toThrow(new FilterError());
        });
    })

    describe("getAvailableProducts", () => {
        test("It should resolve to Product[] (no grouping)", async () => {
            const p = [
                new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100),
                new Product(15, "product2", Category.LAPTOP, "2024-04-30", "", 150)
            ];
            let grouping = null
            let category = null
            let model = null
            const query = "SELECT * FROM product WHERE deleted=0"

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [
                    { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 },
                    { sellingPrice: 15, model: "product2", category: Category.LAPTOP, arrivalDate: "2024-04-30", details: "", quantity: 150 }
                ];
                callback(null, rows);
                return {} as Database;
            });
        
            const result = await productDAO.getAvailableProducts(grouping, category, model);
            expect(result).toEqual(p);
        
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockDBAll.mockRestore();
        });
        
        test("it should reject with a DB error", async () => {
            let grouping = null
            let category = null
            let model = null
            const query = "SELECT * FROM product WHERE deleted=0"

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"), null);
                return {} as Database;
            });
        
            await expect(productDAO.getAvailableProducts(grouping, category, model)).rejects.toThrow("DB error");
        
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockDBAll.mockRestore();
        });

        test("It should resolve to Product[] (grouping by category)", async () => {
            const p = [
                new Product(10, "product1", Category.LAPTOP, "2024-05-05", "", 100),
                new Product(15, "product2", Category.LAPTOP, "2024-04-30", "", 150)
            ];
            let grouping = "category"
            let category = Category.LAPTOP
            let model = null
            const query = "SELECT * FROM product WHERE deleted=0 AND category='" + category + "'";

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [
                    { sellingPrice: 10, model: "product1", category: Category.LAPTOP, arrivalDate: "2024-05-05", details: "", quantity: 100 },
                    { sellingPrice: 15, model: "product2", category: Category.LAPTOP, arrivalDate: "2024-04-30", details: "", quantity: 150 }
                ];
                callback(null, rows);
                return {} as Database;
            });
        
            const result = await productDAO.getAvailableProducts(grouping, category, model);
            expect(result).toEqual(p);
        
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockDBAll.mockRestore();
        });

        test("It should resolve to Product[] (grouping by model)", async () => {
            const p = [
                new Product(10, "product1", Category.SMARTPHONE, "2024-05-05", "", 100),
            ];
            let grouping = "model"
            let category = null
            let model = "product1"
            const query = "SELECT * FROM product WHERE deleted=0 AND model='" + model + "'";

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p[0]);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [
                    { sellingPrice: 10, model: "product1", category: Category.SMARTPHONE, arrivalDate: "2024-05-05", details: "", quantity: 100 },
                ];
                callback(null, rows);
                return {} as Database;
            });
        
            const result = await productDAO.getAvailableProducts(grouping, category, model);
            expect(result).toEqual(p);
        
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith(query, [], expect.any(Function));
        
            mockCheckProductExists.mockRestore();
            mockDBAll.mockRestore();
        });
        
        test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
            let grouping = "model"
            let category = null
            let model = "product1"
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
        
            await expect(productDAO.getAvailableProducts(grouping, category, model)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to DB error (checking product existing)", async () => {
            let grouping = "model"
            let category = null
            let model = "product1"
    
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
        
            await expect(productDAO.getAvailableProducts(grouping, category, model)).rejects.toThrow();
            
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
        
            mockCheckProductExists.mockRestore();
        });

        test("It should resolve to FilterError (grouping is null, category or model are not null)", async () => {
            let grouping = null
            let category = null
            let model = "product1"
        
            await expect(productDAO.getAvailableProducts(grouping, category, model)).rejects.toThrow(new FilterError());
        });

        test("It should resolve to FilterError (grouping is equal to category, category is null or model is not null)", async () => {
            let grouping = "category"
            let category = null
            let model = "product1"
        
            await expect(productDAO.getAvailableProducts(grouping, category, model)).rejects.toThrow(new FilterError());
        });

        test("It should resolve to FilterError (grouping is equal to model, category is not null or model is null)", async () => {
            let grouping = "model"
            let category = Category.LAPTOP
            let model = null
        
            await expect(productDAO.getAvailableProducts(grouping, category, model)).rejects.toThrow(new FilterError());
        });
    })

    describe("deleteAllProducts", () => {
        test("It should delete all products in database and resolve to void", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" || sql === "UPDATE product SET deleted=1" || sql === "DELETE FROM review") {
                    callback(null);
                }
                return {} as Database
            });
    
            const result = await productDAO.deleteAllProducts();
            expect(result).toBeUndefined();
            
            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1", [], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);

            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (starting transaction)", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "BEGIN TRANSACTION")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteAllProducts()).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(1);
        
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (deleting all reviews)", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "DELETE FROM review")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteAllProducts()).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(3);
        
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (updating database)", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "UPDATE product SET deleted=1")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteAllProducts()).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1", [], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);
        
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (committing transaction)", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "COMMIT")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteAllProducts()).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1", [], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);
        
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (rollbacking transaction)", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "UPDATE product SET deleted=1" || sql === "ROLLBACK")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteAllProducts()).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1", [], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);
        
            mockDBRun.mockRestore();
        });
    })

    describe("deleteProduct", () => {
        test("It should resolve to void", async () => {
            const p = new Product(15, "product1", Category.SMARTPHONE, "2024-06-05", "", 10);
            const model = "product1"

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" || sql === "UPDATE product SET deleted=1 WHERE model=?" || sql === "DELETE FROM review where model=?") {
                    callback(null);
                }
                return {} as Database
            });
    
            const result = await productDAO.deleteProduct(model);
            expect(result).toBeUndefined();
            
            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(2);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1 WHERE model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);

            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (starting transaction)", async () => {
            const model = "product1"

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "BEGIN TRANSACTION")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(1);
        
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (checking product existing)", async () => {
            const model = "product1"
            
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(2);
        
            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
            const model = "product1"
            
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(2);
        
            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (deleting reviews of product)", async () => {
            const p = new Product(15, "product1", Category.SMARTPHONE, "2024-06-05", "", 10);
            const model = "product1"
            
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "DELETE FROM review where model=?")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(2);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(3);
        
            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (updating product)", async () => {
            const p = new Product(15, "product1", Category.SMARTPHONE, "2024-06-05", "", 10);
            const model = "product1"

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "UPDATE product SET deleted=1 WHERE model=?")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(2);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1 WHERE model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);
        
            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (committing transaction)", async () => {
            const p = new Product(15, "product1", Category.SMARTPHONE, "2024-06-05", "", 10);
            const model = "product1"

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "COMMIT")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(2);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1 WHERE model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);
        
            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        test("It should resolve to DB error (rollbacking transaction)", async () => {
            const p = new Product(15, "product1", Category.SMARTPHONE, "2024-06-05", "", 10);
            const model = "product1"

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                if (typeof params === "function") {
                    callback = params;
                    params = [];
                }
                if (sql === "UPDATE product SET deleted=1 WHERE model=?" || sql === "ROLLBACK")
                    callback(new Error("DB error"))
                else
                    callback(null);
                return {} as Database;
            });
        
            await expect(productDAO.deleteProduct(model)).rejects.toThrow();

            expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
            expect(mockCheckProductExists).toHaveBeenCalledTimes(2);
            expect(mockCheckProductExists).toHaveBeenCalledWith(model);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET deleted=1 WHERE model=?", [model], expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
            expect(mockDBRun).toHaveBeenCalledTimes(4);
        
            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });
    });
});