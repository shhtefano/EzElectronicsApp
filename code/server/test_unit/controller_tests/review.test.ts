import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import ReviewController from "../../src/controllers/reviewController"
import ReviewDAO from "../../src/dao/reviewDAO"
import { ProductReview } from "../../src/components/review"
import { Role, User } from "../../src/components/user"

jest.mock("../../src/dao/reviewDAO")

let reviewController: ReviewController;

// Before each test, create a new instance of UserController
beforeEach(() => {
    reviewController = new ReviewController();
});

// After each test, clear all mocks to avoid test interdependence
afterEach(() => {
    jest.clearAllMocks();
});

// Define a describe block for grouping related tests
describe("ReviewController Tests", () => {

    test("addReview - It should add a review for a specific product and return nothing", async () => {

        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testReview = { model: "test", user: testUser, score: 5, date:"", comment: "test" };

        jest.spyOn(ReviewDAO.prototype, "addReview").mockResolvedValueOnce(); 

        const response = await reviewController.addReview(testReview.model, testReview.user, testReview.score, testReview.comment);

        expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(1);
        expect(ReviewDAO.prototype.addReview).toHaveBeenCalledWith(testReview.model, testReview.user, testReview.score, testReview.comment);
        // expect(response).toBe(void); //Check if the response is true
    });

 
   test("getProductReviews - It should return an array of Review of a specific product", async () => {
   
       const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
       const testReview1 = new ProductReview("model1", testUser.username, 5, "", "nice");
       const testReview2 = new ProductReview("model1", testUser.username, 5, "", "bad");
    
       jest.spyOn(ReviewDAO.prototype, 'getProductReviews').mockResolvedValueOnce([testReview1, testReview2]);

       const response = await reviewController.getProductReviews(testReview1.model);

       expect(ReviewDAO.prototype.getProductReviews).toHaveBeenCalledTimes(1);
       
       expect(response).toEqual([testReview1, testReview2]);
   });

   test("deleteReview - It should delete a review published by the customer and return nothing", async () => {
   
    const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
    const testReview = new ProductReview("model1", testUser.username, 5, "", "nice");
 
    jest.spyOn(ReviewDAO.prototype, 'deleteReview').mockResolvedValueOnce();

    const response = await reviewController.deleteReview(testReview.model, testUser);

    expect(ReviewDAO.prototype.deleteReview).toHaveBeenCalledTimes(1);
    expect(ReviewDAO.prototype.deleteReview).toHaveBeenCalledWith(testReview.model, testUser);
    // expect(response).toBe(void); //Check if the response is true
    });

    test("deleteReviewsOfProduct - It should delete all review of a specific product and return nothing", async () => {
   
    const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
    const testReview = new ProductReview("model1", testUser.username, 5, "", "nice");
 
    jest.spyOn(ReviewDAO.prototype, 'deleteReviewsOfProduct').mockResolvedValueOnce();

    const response = await reviewController.deleteReviewsOfProduct(testReview.model);

    expect(ReviewDAO.prototype.deleteReviewsOfProduct).toHaveBeenCalledTimes(1);
    expect(ReviewDAO.prototype.deleteReviewsOfProduct).toHaveBeenCalledWith(testReview.model);
    // expect(response).toBe(void); //Check if the response is true
    });

    test("deleteAllReviews - It should delete all reviews of all products present in the database and return nothing", async () => {
   
    const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
    const testReview = new ProductReview("model1", testUser.username, 5, "", "nice");
 
    jest.spyOn(ReviewDAO.prototype, 'deleteAllReviews').mockResolvedValueOnce();

    const response = await reviewController.deleteAllReviews();

    expect(ReviewDAO.prototype.deleteAllReviews).toHaveBeenCalledTimes(1);
    expect(ReviewDAO.prototype.deleteAllReviews).toHaveBeenCalledWith();
    // expect(response).toBe(void); //Check if the response is true
    });
});


