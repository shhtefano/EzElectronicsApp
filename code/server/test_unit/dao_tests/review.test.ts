import { describe, test, expect, beforeAll, afterAll, jest, beforeEach, afterEach } from "@jest/globals"

import ReviewDAO from "../../src/dao/reviewDAO"

import db from "../../src/db/db"
import { Database } from "sqlite3"
import { ProductReview } from "../../src/components/review"
import { ExistingReviewError, NoReviewProductError } from "../../src/errors/reviewError"

import { DateError, Utility } from "../../src/utilities"
import { Role, User } from "../../src/components/user"
import { Category, Product } from "../../src/components/product"
import { ProductNotFoundError } from "../../src/errors/productError"
import dayjs from "dayjs"

jest.mock("../../src/db/db.ts")

let reviewDAO: ReviewDAO;

beforeEach(() => {
  reviewDAO = new ReviewDAO();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ReviewDAO unit Tests",  () => {

    describe("addReview", () => {

        // check product exists - ok, check no review by user exists - ok, db.run - ok
        test("It should add a review to a specific product and resolve to void", async () => {
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            const modelVal : string = "iphone 13";
            const scoreVal : number = 3;
            const commentVal : string = "very nice";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);
            // const date = dayjs().format("YYYY-MM-DD").toString();
            const date = new Date().toISOString().split("T")[0];


            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckReviewByUserExists = jest.spyOn(Utility, "checkReviewByUserExists").mockResolvedValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const result = await reviewDAO.addReview(modelVal, u, scoreVal, commentVal);
            expect(result).toBeUndefined();

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledTimes(1);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledWith(modelVal, u.username);
            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO review(model, username, score, date, comment) VALUES(?, ?, ?, ?, ?)",
                [modelVal, u.username, scoreVal, date, commentVal],
                expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockCheckReviewByUserExists.mockRestore();
            mockDBRun.mockRestore();            
        });

        // check product exists - ProductNotFoundError
        test("It should reject with ProductNotFoundError", async () => {
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            const modelVal : string = "iphone 13";
            const scoreVal : number = 3;
            const commentVal : string = "very nice";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());

            await expect(reviewDAO.addReview(modelVal, u, scoreVal, commentVal)).rejects.toThrow(new ProductNotFoundError());

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);

            mockCheckProductExists.mockRestore();
        });

        // check product exists - db error
        test("It should reject with DB error when doing check if product exists", async () => {
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            const modelVal : string = "iphone 13";
            const scoreVal : number = 3;
            const commentVal : string = "very nice";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));

            await expect(reviewDAO.addReview(modelVal, u, scoreVal, commentVal)).rejects.toThrow(new Error("DB error"));

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);

            mockCheckProductExists.mockRestore();
        });

        // check product exists - ok, check no review by user exists - ExistingReviewError
        test("It should reject with ExistingReviewError when doing check if product review already exists", async () => {
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            const modelVal : string = "iphone 13";
            const scoreVal : number = 3;
            const commentVal : string = "very nice";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckReviewByUserExists = jest.spyOn(Utility, "checkReviewByUserExists").mockRejectedValue(new ExistingReviewError());

            await expect(reviewDAO.addReview(modelVal, u, scoreVal, commentVal)).rejects.toThrow(new ExistingReviewError());

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledTimes(1);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledWith(modelVal, u.username);

            mockCheckProductExists.mockRestore();
            mockCheckReviewByUserExists.mockRestore();
        });


        // check product exists - ok, check no review by user exists - db error
        test("It should reject with DB error when doing check if product review already exists", async () => {
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            const modelVal : string = "iphone 13";
            const scoreVal : number = 3;
            const commentVal : string = "very nice";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckReviewByUserExists = jest.spyOn(Utility, "checkReviewByUserExists").mockRejectedValue(new Error("DB error"));

            await expect(reviewDAO.addReview(modelVal, u, scoreVal, commentVal)).rejects.toThrow(new Error("DB error"));

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledTimes(1);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledWith(modelVal, u.username);

            mockCheckProductExists.mockRestore();
            mockCheckReviewByUserExists.mockRestore();
        });


        // check product exists - ok, check no review by user exists - ok, db.run - db error
        test("It should reject with DB error when inserting the product review", async () => {
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2002-02-02");
            const modelVal : string = "iphone 13";
            const scoreVal : number = 3;
            const commentVal : string = "very nice";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);
            // const date = dayjs().format("YYYY-MM-DD").toString();
            const date = new Date().toISOString().split("T")[0];


            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckReviewByUserExists = jest.spyOn(Utility, "checkReviewByUserExists").mockResolvedValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database;
            });

            // const result = await reviewDAO.addReview(modelVal, u, scoreVal, commentVal);
            // expect(result).toBeUndefined();

            await expect(reviewDAO.addReview(modelVal, u, scoreVal, commentVal)).rejects.toThrow(new Error("DB error"));

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledTimes(1);
            expect(mockCheckReviewByUserExists).toHaveBeenCalledWith(modelVal, u.username);
            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO review(model, username, score, date, comment) VALUES(?, ?, ?, ?, ?)",
                [modelVal, u.username, scoreVal, date, commentVal],
                expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockCheckReviewByUserExists.mockRestore();
            mockDBRun.mockRestore();            
        }); 
    });

    describe("getProductReviews", () => {
        // check product exists - ok, db.all - ok
        test("It should return all reviews of a specific product and resolve to ProductReview[]", async () => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);
            const reviewArray : ProductReview[] = [ new ProductReview("iphone 13", "customer01", 4, "2024-06-08", "no cmt"), 
                                                    new ProductReview("iphone 13", "customer02", 2, "2024-06-01", "not good") ];

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                const rows = [ 
                    {model: "iphone 13", username: "customer01", score: 4, date: "2024-06-08", comment: "no cmt"}, 
                    {model: "iphone 13", username: "customer02", score: 2, date: "2024-06-01", comment: "not good"}
                ];
                callback(null, rows);
                return {} as Database;
            });

            const result = await reviewDAO.getProductReviews(modelVal);
            expect(result).toEqual(reviewArray);

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM review WHERE model=?",
                                                    [modelVal],
                                                    expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockDBAll.mockRestore(); 
        });
        
        // check product exists - ProductNotFoundError
        test("It should reject with ProductNotFoundError", async () => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);
            
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
           

            await expect(reviewDAO.getProductReviews(modelVal)).rejects.toThrow(new ProductNotFoundError());

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);

            mockCheckProductExists.mockRestore();
        });

        // check product exists - DB error
        test("It should reject with DB error when doing check if product exists", async () => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);
            
            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
           

            await expect(reviewDAO.getProductReviews(modelVal)).rejects.toThrow(new Error("DB error"));

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);

            mockCheckProductExists.mockRestore();
        });

        // check product exists - ok, db.all - DB error
        test("It should reject with DB error when retrieving all reviews for product", async () => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"), null);
                return {} as Database;
            });

            await expect(reviewDAO.getProductReviews(modelVal)).rejects.toThrow(new Error("DB error"));

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockDBAll).toHaveBeenCalledTimes(1);
            expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM review WHERE model=?",
                                                    [modelVal],
                                                    expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockDBAll.mockRestore(); 
        });
    });


    describe("deleteReview", () => {

        // checkProductExists- ok, checkNoReviewByUser - ok, db.run - ok
        test("It should delete a review of a specific product (published by the same user) and resolve to void", async () => {
            const modelVal : string = "iphone 13";
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2000-02-02");
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckNoReviewByUser = jest.spyOn(Utility, "checkNoReviewByUser").mockResolvedValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const result = await reviewDAO.deleteReview(modelVal, u);
            expect(result).toBeUndefined();

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledTimes(1);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledWith(modelVal, u.username);
            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=? AND username=?",
                                                    [modelVal, u.username],
                                                     expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockCheckNoReviewByUser.mockRestore();
            mockDBRun.mockRestore();
        });

        // checkProductExists- ProductNotFoundError
        test("It should reject with ProductNotFoundError when doinf check if product exists", async () => {
            const modelVal : string = "iphone 13";
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2000-02-02");
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());

            await expect(reviewDAO.deleteReview(modelVal, u)).rejects.toThrow(new ProductNotFoundError());

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            
            mockCheckProductExists.mockRestore();
        });

        // checkProductExists- DB error
        test("It should reject with DB error when doing check if product exists", async () => {
            const modelVal : string = "iphone 13";
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2000-02-02");
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));

            await expect(reviewDAO.deleteReview(modelVal, u)).rejects.toThrow(new Error("DB error"));

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            
            mockCheckProductExists.mockRestore();
        });

        // checkProductExists- ok, checkNoReviewByUser - NoReviewProductError
        test("It should reject with NoReviewProductError when doing check for a review by a user", async () => {
            const modelVal : string = "iphone 13";
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2000-02-02");
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckNoReviewByUser = jest.spyOn(Utility, "checkNoReviewByUser").mockRejectedValue(new NoReviewProductError());
            
            await expect(reviewDAO.deleteReview(modelVal, u)).rejects.toThrow(new NoReviewProductError());            

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledTimes(1);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledWith(modelVal, u.username);
            
            mockCheckProductExists.mockRestore();
            mockCheckNoReviewByUser.mockRestore();
        });

        // checkProductExists- ok, checkNoReviewByUser - DB error
        test("It should reject with DB error when doing check for a review by a user", async () => {
            const modelVal : string = "iphone 13";
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2000-02-02");
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckNoReviewByUser = jest.spyOn(Utility, "checkNoReviewByUser").mockRejectedValue(new Error("DB error"));
            
            await expect(reviewDAO.deleteReview(modelVal, u)).rejects.toThrow(new Error("DB error"));            

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledTimes(1);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledWith(modelVal, u.username);
            
            mockCheckProductExists.mockRestore();
            mockCheckNoReviewByUser.mockRestore();
        });

        // checkProductExists- ok, checkNoReviewByUser - ok, db.run - DB error
        test("It should reject with DB error when doing delete of user review", async () => {
            const modelVal : string = "iphone 13";
            const u : User = new User("customer", "customerName", "customerSurname", Role.CUSTOMER, "C.so Duca", "2000-02-02");
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockCheckNoReviewByUser = jest.spyOn(Utility, "checkNoReviewByUser").mockResolvedValue(true);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database;
            });

            await expect(reviewDAO.deleteReview(modelVal, u)).rejects.toThrow(new Error("DB error"));            


            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledTimes(1);
            expect(mockCheckNoReviewByUser).toHaveBeenCalledWith(modelVal, u.username);
            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=? AND username=?",
                                                    [modelVal, u.username],
                                                     expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockCheckNoReviewByUser.mockRestore();
            mockDBRun.mockRestore();
        });
    });


    describe("deleteReviewsOfProduct", () => {
        // checkProductExists - ok, db.run - ok
        test("It should delete all reviews of a specific product and resolve to void", async () =>{
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const result = await reviewDAO.deleteReviewsOfProduct(modelVal);
            expect(result).toBeUndefined();

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?",
                                                    [modelVal],
                                                     expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });

        // checkProductExists - ProductNotFoundError
        test("It should reject with ProductNotFoundError when doing check if product exists", async() => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
            
            await expect(reviewDAO.deleteReviewsOfProduct(modelVal)).rejects.toThrow(new ProductNotFoundError());            

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);

            mockCheckProductExists.mockRestore();
        });

        // checkProductExists - DB error
        test("It should reject with DB error when doing check if product exists", async () => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
            
            await expect(reviewDAO.deleteReviewsOfProduct(modelVal)).rejects.toThrow(new Error("DB error"));            

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);

            mockCheckProductExists.mockRestore();
        });

        // checkProductExists - ok, db.run - DB error
        test("It should reject with DB error when doing delete of product reviews", async() => {
            const modelVal : string = "iphone 13";
            const p : Product = new Product(1500, "iphone 13", Category.SMARTPHONE, "2024-03-03", "no info", 10);

            const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("DB error"));
                return {} as Database;
            });

            await expect(reviewDAO.deleteReviewsOfProduct(modelVal)).rejects.toThrow(new Error("DB error"));            

            expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
            expect(mockCheckProductExists).toHaveBeenCalledWith(modelVal);
            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review where model=?",
                                                    [modelVal],
                                                     expect.any(Function)
            );

            mockCheckProductExists.mockRestore();
            mockDBRun.mockRestore();
        });
    });

    describe("deleteAllReviews", () => {
        // db.run - ok
        test("It should delete all reviews present in database and resolves to void", async() => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                callback(null);
                return {} as Database;
            });

            const result = await reviewDAO.deleteAllReviews();
            expect(result).toBeUndefined();

            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review",
                                                    expect.any(Function)
            );

            mockDBRun.mockRestore();
        });

        // db.run - DB error
        test("It rejects with DB error when doing delete of all reviews", async() => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                callback(new Error("DB error"));
                return {} as Database;
            });

            await expect(reviewDAO.deleteAllReviews()).rejects.toThrow(new Error("DB error"));            

            expect(mockDBRun).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM review",
                                                    expect.any(Function)
            );

            mockDBRun.mockRestore();
        });
    });
});