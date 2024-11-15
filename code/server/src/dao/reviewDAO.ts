import db from "../db/db";
import { User } from "../components/user";
import { Product } from "../components/product";
import { ProductReview } from "../components/review";
import { Utility } from "../utilities";
import dayjs from "dayjs";


/**
 * A class that implements the interaction with the database for all review-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class ReviewDAO {

    /**
     * Adds a new review for a product
     * @param model The model of the product to review
     * @param user The username of the user who made the review
     * @param score The score assigned to the product, in the range [1, 5]
     * @param comment The comment made by the user
     * @returns A Promise that resolves to nothing
     */
    async addReview(model: string, user: User, score: number, comment: string) : Promise<void> {
        try {
            const p : Product = await Utility.checkProductExists(model);
            const r : boolean = await Utility.checkReviewByUserExists(model, user.username);
            return new Promise<void>((resolve, reject) => {    
                // const date = dayjs().format("YYYY-MM-DD").toString();
                let date = new Date().toISOString().split("T")[0]

                const sql = "INSERT INTO review(model, username, score, date, comment) VALUES(?, ?, ?, ?, ?)";
                db.run(sql, [model, user.username, score, date, comment], (err: Error | null) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        } catch (error) {
            return new Promise<void>((resolve, reject) => {
                reject(error);
            })
        }
    }

    
    /**
     * Returns all reviews for a product
     * @param model The model of the product to get reviews from
     * @returns A Promise that resolves to an array of ProductReview objects
     */
    async getProductReviews(model: string) :Promise<ProductReview[]> {
        try {
            const p : Product = await Utility.checkProductExists(model);
            return new Promise<ProductReview[]>((resolve, reject) => {
                const sql = "SELECT * FROM review WHERE model=?";
                db.all(sql, [model], (err : Error | null, rows: ProductReview[]) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve( rows.map((row:any) => new ProductReview(row.model, row.username, row.score, row.date, row.comment)));
                    return;                  
                });
            });
        } catch (error) {
            return new Promise<ProductReview[]>((resolve, reject) => {
                reject(error);
            })
        }
    }


    /**
     * Deletes the review made by a user for a product
     * @param model The model of the product to delete the review from
     * @param user The user who made the review to delete
     * @returns A Promise that resolves to nothing
     */
    async deleteReview(model: string, user: User) :Promise<void> {
        try {
            const p : Product = await Utility.checkProductExists(model);
            const r : boolean = await Utility.checkNoReviewByUser(model, user.username);
            return new Promise<void>((resolve, reject) => {    
                const sql = "DELETE FROM review where model=? AND username=?";
                db.run(sql, [model, user.username], (err: Error | null) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        } catch (error) {
            return new Promise<void>((resolve, reject) => {
                reject(error);
            })
        }
    }


    /**
     * Deletes all reviews for a product
     * @param model The model of the product to delete the reviews from
     * @returns A Promise that resolves to nothing
     */
    async deleteReviewsOfProduct(model: string) :Promise<void> {
        try {
            const p : Product = await Utility.checkProductExists(model);
            return new Promise<void>((resolve, reject) => {    
                const sql = "DELETE FROM review where model=?";
                db.run(sql, [model], (err: Error | null) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        } catch (error) {
            return new Promise<void>((resolve, reject) => {
                reject(error);
            })
        }
    }


     /**
     * Deletes all reviews of all products
     * @returns A Promise that resolves to nothing
     */
     async deleteAllReviews() :Promise<void> {
        return new Promise<void>((resolve, reject) => {    
            const sql = "DELETE FROM review";
            db.run(sql, (err: Error | null) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
     }
}

export default ReviewDAO;