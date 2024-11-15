import { describe, test, expect, beforeAll, afterAll, jest, beforeEach, afterEach } from "@jest/globals"

import { DateError, Utility } from "../src/utilities"

import db from "../src/db/db"
import { Database } from "sqlite3"
import { Role, User } from "../src/components/user"
import { Category, Product } from "../src/components/product"
import { ProductNotFoundError } from "../src/errors/productError"
import { ProductReview } from "../src/components/review"
import { ExistingReviewError, NoReviewProductError } from "../src/errors/reviewError"

jest.mock("../src/db/db.ts")

beforeEach(() => {});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Utility unit Tests", () => {
    describe("isManager", () => {
        test("It should resolve to true", () => {
            const u = new User("username1", "name1", "surname1", Role.MANAGER, "C.so Duca", "2002-02-02");
            
            const result = Utility.isManager(u);
            expect(result).toBe(true);
        });

        test("It should resolve to false", () => {
            const u = new User("username1", "name1", "surname1", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            
            const result = Utility.isManager(u);
            expect(result).toBe(false);
        });
    });

    describe("isCustomer", () => {
        test("It should resolve to true", () => {
            const u = new User("username1", "name1", "surname1", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            
            const result = Utility.isCustomer(u);
            expect(result).toBe(true);
        });

        test("It should resolve to false", () => {
            const u = new User("username1", "name1", "surname1", Role.MANAGER, "C.so Duca", "2002-02-02");
            
            const result = Utility.isCustomer(u);
            expect(result).toBe(false);
        });
    });

    describe("isAdmin", () => {
        test("It should resolve to true", () => {
            const u = new User("username1", "name1", "surname1", Role.ADMIN, "C.so Duca", "2002-02-02");
            
            const result = Utility.isAdmin(u);
            expect(result).toBe(true);
        });

        test("It should resolve to false", () => {
            const u = new User("username1", "name1", "surname1", Role.MANAGER, "C.so Duca", "2002-02-02");
            
            const result = Utility.isAdmin(u);
            expect(result).toBe(false);
        });
    });

    describe("checkProductExists", () => {
        test("It should resolve to Product", async () => {
            const p = new Product(10, "product1", Category.LAPTOP, "2024-05-05", "", 10)

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                const result = {model: "product1", category: Category.LAPTOP, sellingPrice: 10, quantity: 10, arrivalDate: "2024-05-05", details: ""}
                callback(null, result)
                return {} as Database
            });
            
            const result = await Utility.checkProductExists(p.model);
            expect(result).toEqual(p);

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM product WHERE model = ?", [p.model], expect.any(Function));
        });

        test("It should resolve to ProductNotFoundError", async () => {
            const p = "product1"

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(new ProductNotFoundError());
                return {} as Database
            });
            
            await expect(Utility.checkProductExists(p)).rejects.toThrow();

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM product WHERE model = ?", [p], expect.any(Function));
        });

        test("It should resolve to DB error", async () => {
            const p = "product1"

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database
            });
            
            await expect(Utility.checkProductExists(p)).rejects.toThrow();

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM product WHERE model = ?", [p], expect.any(Function));
        });
    });

    describe("checkProductDeleted", () => {
        test("It should resolve to Product", async () => {
            const p = new Product(10, "product1", Category.LAPTOP, "2024-05-05", "", 10)

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                const result = {model: "product1", category: Category.LAPTOP, sellingPrice: 10, quantity: 10, arrivalDate: "2024-05-05", details: ""}
                callback(null, result)
                return {} as Database
            });
            
            const result = await Utility.checkProductDeleted(p.model);
            expect(result).toEqual(p);

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM product WHERE model = ? AND deleted=1", [p.model], expect.any(Function));
        });

        test("It should resolve to ProductNotFoundError", async () => {
            const p = "product1"

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(new ProductNotFoundError());
                return {} as Database
            });
            
            await expect(Utility.checkProductDeleted(p)).rejects.toThrow();

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM product WHERE model = ? AND deleted=1", [p], expect.any(Function));
        });

        test("It should resolve to DB error", async () => {
            const p = "product1"

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database
            });
            
            await expect(Utility.checkProductDeleted(p)).rejects.toThrow();

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM product WHERE model = ? AND deleted=1", [p], expect.any(Function));
        });
    });

    describe("checkReviewByUserExists", () => {
        test("It should resolve to true", async () => {
            const r = new ProductReview("product1", "username1", 4, "2024-05-10", "Good!!")

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null)
                return {} as Database
            });
            
            const result = await Utility.checkReviewByUserExists(r.model, r.user);
            expect(result).toEqual(true);

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM review WHERE model = ? and username = ?", [r.model, r.user], expect.any(Function));
        });

        test("It should resolve to ExistingReviewError", async () => {
            const r = new ProductReview("product1", "username1", 4, "2024-05-10", "Good!!")

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                const result = { model: "product1", user: "username1", score: 4, date: "2024-05-10", comment: "Good!!" };
                callback(null, result)
                return {} as Database
            });
            
            await expect(Utility.checkReviewByUserExists(r.model, r.user)).rejects.toThrow(new ExistingReviewError());

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM review WHERE model = ? and username = ?", [r.model, r.user], expect.any(Function));
        });

        test("It should resolve to DB error", async () => {
            const r = new ProductReview("product1", "username1", 4, "2024-05-10", "Good!!")

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"))
                return {} as Database
            });
            
            await expect(Utility.checkReviewByUserExists(r.model, r.user)).rejects.toThrow();

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM review WHERE model = ? and username = ?", [r.model, r.user], expect.any(Function));
        });
    });

    describe("checkNoReviewByUser", () => {
        test("It should resolve to true", async () => {
            const r = new ProductReview("product1", "username1", 4, "2024-05-10", "Good!!")

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                const result = { model: "product1", user: "username1", score: 4, date: "2024-05-10", comment: "Good!!" };
                callback(null, result)
                return {} as Database
            });
            
            const result = await Utility.checkNoReviewByUser(r.model, r.user);
            expect(result).toEqual(true);

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM review WHERE model = ? and username = ?", [r.model, r.user], expect.any(Function));
        });

        test("It should resolve to NoReviewProductError", async () => {
            const r = new ProductReview("product1", "username1", 4, "2024-05-10", "Good!!")

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null)
                return {} as Database
            });
            
            await expect(Utility.checkNoReviewByUser(r.model, r.user)).rejects.toThrow(new NoReviewProductError());

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM review WHERE model = ? and username = ?", [r.model, r.user], expect.any(Function));
        });

        test("It should resolve to DB error", async () => {
            const r = new ProductReview("product1", "username1", 4, "2024-05-10", "Good!!")

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"))
                return {} as Database
            });
            
            await expect(Utility.checkNoReviewByUser(r.model, r.user)).rejects.toThrow();

            expect(mockDBGet).toHaveBeenCalledTimes(1);
            expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM review WHERE model = ? and username = ?", [r.model, r.user], expect.any(Function));
        });
    });

    describe("checkDate", () => {
        test("It should resolve to true", () => {
            // "YYYY-MM-DD"
            const date = "2015-12-31"

            const result = Utility.checkDate(date)
            expect(result).toBe(true)
        });

        test("It should resolve to false", () => {
            // "YYYY-MM-DD"
            const date = "2030-12-31"

            const result = Utility.checkDate(date)
            expect(result).toBe(false)
        });

        test("It should resolve to false (error)", () => {
            const date = "Hello World!"

            const result = Utility.checkDate(date)
            expect(result).toBe(false)
        });
    });

    describe("checkDateBefore", () => {
        test("It should resolve to true (secondDate exists)", () => {
            // "YYYY-MM-DD"
            const date1 = "2024-06-10"
            const date2 = "2019-10-15"

            const result = Utility.checkDateBefore(date1, date2)
            expect(result).toBe(true)
        });

        test("It should resolve to false (secondDate exists)", () => {
            // "YYYY-MM-DD"
            const date1 = "2019-10-15"
            const date2 = "2024-06-10"

            const result = Utility.checkDateBefore(date1, date2)
            expect(result).toBe(false)
        });

        test("It should resolve to false (secondDate exists; error)", () => {
            // "YYYY-MM-DD"
            const date1 = "Hello World!"
            const date2 = "2024-06-10"

            const result = Utility.checkDateBefore(date1, date2)
            expect(result).toBe(false)
        });

        test("It should resolve to true (secondDate does not exist)", () => {
            // "YYYY-MM-DD"
            const date1 = "2030-12-31"

            const result = Utility.checkDateBefore(date1, null)
            expect(result).toBe(true)
        });

        test("It should resolve to false (secondDate does not exist)", () => {
            // "YYYY-MM-DD"
            const date1 = "2024-06-10"

            const result = Utility.checkDateBefore(date1, null)
            expect(result).toBe(false)
        });

        test("It should resolve to false (secondDate does not exist; error)", () => {
            // "YYYY-MM-DD"
            const date1 = "Hello World!"

            const result = Utility.checkDateBefore(date1, null)
            expect(result).toBe(false)
        });
    });

    describe("checkDateAfter", () => {
        test("It should resolve to true (secondDate exists)", () => {
            // "YYYY-MM-DD"
            const date1 = "2019-10-15"
            const date2 = "2024-06-10"

            const result = Utility.checkDateAfter(date1, date2)
            expect(result).toBe(true)
        });

        test("It should resolve to false (secondDate exists)", () => {
            // "YYYY-MM-DD"
            const date1 = "2024-06-10"
            const date2 = "2019-10-15"

            const result = Utility.checkDateAfter(date1, date2)
            expect(result).toBe(false)
        });

        test("It should resolve to false (secondDate exists; error)", () => {
            // "YYYY-MM-DD"
            const date1 = "Hello World!"
            const date2 = "2024-06-10"

            const result = Utility.checkDateAfter(date1, date2)
            expect(result).toBe(false)
        });

        test("It should resolve to true (secondDate does not exist)", () => {
            // "YYYY-MM-DD"
            const date1 = "2019-10-15"

            const result = Utility.checkDateAfter(date1, null)
            expect(result).toBe(true)
        });

        test("It should resolve to false (secondDate does not exist)", () => {
            // "YYYY-MM-DD"
            const date1 = "2030-12-31"

            const result = Utility.checkDateAfter(date1, null)
            expect(result).toBe(false)
        });

        test("It should resolve to false (secondDate does not exist; error)", () => {
            // "YYYY-MM-DD"
            const date1 = "Hello World!"

            const result = Utility.checkDateAfter(date1, null)
            expect(result).toBe(false)
        });
    });
});