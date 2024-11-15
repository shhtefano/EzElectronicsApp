import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"

import ReviewController from "../../src/controllers/reviewController"
import { ProductReview } from "../../src/components/review"
import ErrorHandler from "../../src/helper"
import Authenticator from "../../src/routers/auth"
import { ExistingReviewError, NoReviewProductError } from "../../src/errors/reviewError"
import { ProductNotFoundError } from "../../src/errors/productError"

jest.mock("../../src/routers/auth")
jest.mock("../../src/controllers/reviewController")

const baseURL = "/ezelectronics"

beforeEach(() => {
    jest.clearAllMocks();  // Pulisce tutti i mock prima di ogni test
});

// afterEach(() => {
//     jest.clearAllMocks();  // Pulisce tutti i mock dopo ogni test
// });

describe("Review route unit tests", () => {

    describe("POST ezelectronics/reviews/:model", () => {
        test("It should return a 200 success code", async () => {
            const inputReview = { score: 5, comment: "A very cool smartphone!" }
            const inputModel = "product1"
        
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "addReview").mockResolvedValueOnce();

            const response = await request(app).post(baseURL + "/reviews/" + inputModel).send(inputReview)
            expect(response.status).toBe(200)
            expect(ReviewController.prototype.addReview).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.addReview).toHaveBeenCalledWith(inputModel, undefined, inputReview.score, inputReview.comment)
        });

        test("It should return a 404 error code", async () => {
            const inputReview = { score: 5, comment: "A very cool smartphone!" }
            const inputModel = "product2"

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "addReview").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).post(baseURL + "/reviews/" + inputModel).send(inputReview)
            expect(response.status).toBe(404)
            expect(ReviewController.prototype.addReview).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.addReview).toHaveBeenCalledWith(inputModel, undefined, inputReview.score, inputReview.comment)
        });

        test("It should return a 409 error code", async () => {
            const inputReview = { score: 5, comment: "A very cool smartphone!" }
            const inputModel = "product1"

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "addReview").mockRejectedValueOnce(new ExistingReviewError());

            const response = await request(app).post(baseURL + "/reviews/" + inputModel).send(inputReview)
            expect(response.status).toBe(409)
            expect(ReviewController.prototype.addReview).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.addReview).toHaveBeenCalledWith(inputModel, undefined, inputReview.score, inputReview.comment)
        });
    });

    describe("GET ezelectronics/reviews/:model", () => { 
        test("It should return a 200 success code", async () => {   
            let inputModel = "product2"
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "getProductReviews").mockResolvedValueOnce([]);

            const response = await request(app).get(baseURL + "/reviews/" + inputModel)
            expect(response.status).toBe(200)
            expect(ReviewController.prototype.getProductReviews).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.getProductReviews).toHaveBeenCalledWith(inputModel)
        });
    });

    describe("DELETE ezelectronics/reviews/:model", () => {
        test("It should return a 200 success code", async () => {
            const inputModel = "product1";

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "deleteReview").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/reviews/" + inputModel);
            expect(response.status).toBe(200);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledWith(inputModel, undefined);
            // expect(response).toEqual();
        });

        test("It should return a 404 error code", async () => {
            const inputModel = "product3";

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "deleteReview").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).delete(baseURL + "/reviews/" + inputModel);
            expect(response.status).toBe(404);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledWith(inputModel, undefined);
            // expect(response).toEqual();
        });

        test("It should return a 404 error code", async () => {
            const inputModel = "product1";

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "deleteReview").mockRejectedValueOnce(new NoReviewProductError());

            const response = await request(app).delete(baseURL + "/reviews/" + inputModel);
            expect(response.status).toBe(404);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledWith(inputModel, undefined);
            // expect(response).toEqual();
        });
    });
    
    describe("DELETE ezelectronics/reviews/:model/all", () => { 

        test("It should return a 200 success code", async () => {      
            const inputModel = "product1";

            // jest.mock('express-validator', () => ({
            //     param: jest.fn().mockImplementation(() => ({
            //         isString: () => ({ isLength: () => ({}) }),
            //     })),
            // }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "deleteReviewsOfProduct").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/reviews/" + inputModel + "/all/");
            expect(response.status).toBe(200);
            expect(ReviewController.prototype.deleteReviewsOfProduct).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.deleteReviewsOfProduct).toHaveBeenCalledWith(inputModel);
        });

        test("It should return a 404 error code", async () => {  
            const inputModel = "product2";

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ReviewController.prototype, "deleteReviewsOfProduct").mockRejectedValueOnce(new ProductNotFoundError());

            const response = await request(app).delete(baseURL + "/reviews/" + inputModel + "/all/");
            expect(response.status).toBe(404);
            expect(ReviewController.prototype.deleteReviewsOfProduct).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.deleteReviewsOfProduct).toHaveBeenCalledWith(inputModel);
        });
    });

    describe("DELETE ezelectronics/reviews", () => { 

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

            jest.spyOn(ReviewController.prototype, "deleteAllReviews").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/reviews/");
            expect(response.status).toBe(200);
            expect(ReviewController.prototype.deleteAllReviews).toHaveBeenCalledTimes(1);
            expect(ReviewController.prototype.deleteAllReviews).toHaveBeenCalledWith();
        });
    });
});