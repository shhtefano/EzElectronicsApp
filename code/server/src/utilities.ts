import { User, Role } from "./components/user"
import { Product } from "./components/product"
import { ProductReview } from "./components/review"
import db from "./db/db"
import { ProductNotFoundError } from "./errors/productError"
import { ExistingReviewError, NoReviewProductError } from "./errors/reviewError";
const DATE_ERROR = "Input date is not compatible with the current date"
const FILTER_ERROR = "Invalid filter parameters"
import dayjs from 'dayjs'

/**
 * Represents a utility class.
 */
class Utility {
    /**
     * Checks if a user is a manager.
     * @param {User} user - The user to check.
     * @returns True if the user is a manager, false otherwise.
     */
    static isManager(user: User): boolean {
        return user.role === Role.MANAGER
    }
    /**
     * Checks if a user is a customer.
     * @param {User} user - The user to check.
     * @returns True if the user is a customer, false otherwise.
     */
    static isCustomer(user: User): boolean {
        return user.role === Role.CUSTOMER
    }

    static isAdmin(user: User): boolean {
        return user.role === Role.ADMIN
    }

    static checkProductExists(model: string): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM product WHERE model = ?"
                db.get(sql, [model], (err: Error | null, row: any) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    if (!row) {
                        reject(new ProductNotFoundError())
                        return
                    }
                    const product: Product = new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity)
                    resolve(product)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    static checkProductDeleted(model: string): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM product WHERE model = ? AND deleted=1"
                db.get(sql, [model], (err: Error | null, row: any) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    if (!row) {
                        reject(new ProductNotFoundError())
                        return
                    }
                    const product: Product = new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity)
                    resolve(product)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // utility func to check if there is already a review for a product model by a user
    // returns true, if no review exists
    // raises an ExistingReviewError, if review already exists
    static checkReviewByUserExists(model: string, username: string) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM review WHERE model = ? and username = ?"
                db.get(sql, [model, username], (err: Error | null, row: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!row) {
                        resolve(true);
                        return;
                    } else {
                        reject(new ExistingReviewError());
                        return;
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    // utility func to check if there is no review for a product model by a user
    // returns true, if a review exists
    // raises a NoReviewProductError, if review does not exist
    static checkNoReviewByUser(model: string, username: string) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM review WHERE model = ? and username = ?"
                db.get(sql, [model, username], (err: Error | null, row: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!row) {
                        reject(new NoReviewProductError());
                        return;
                    } else {
                        resolve(true);
                        return;
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    static checkDate(date: string) : Boolean {
        try {
            if (!dayjs(date).isValid()) throw Error;
            if (dayjs(date).isAfter(dayjs().format("YYYY-MM-DD"))) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    static checkDateBefore(firstDate: string, secondDate: string | null) : Boolean {
        try {
            if (!secondDate) {
                if (!dayjs(firstDate).isValid()) throw Error;
                if (dayjs(firstDate).isBefore(dayjs().format("YYYY-MM-DD"))) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if (!dayjs(firstDate).isValid() || !dayjs(secondDate).isValid()) throw Error;
                if (dayjs(firstDate).isBefore(dayjs(secondDate))) {
                    return false;
                } else {
                    return true;
                }
            }   
        } catch (error) {
            return false;
        }
    }

    static checkDateAfter(firstDate: string, secondDate: string | null) : Boolean {
        try {
            if (!secondDate) {
                if (!dayjs(firstDate).isValid()) throw Error;
                if (dayjs(firstDate).isAfter(dayjs().format("YYYY-MM-DD"))) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if (!dayjs(firstDate).isValid() || !dayjs(secondDate).isValid()) throw Error;
                if (dayjs(firstDate).isAfter(dayjs(secondDate))) {
                    return false;
                } else {
                    return true;
                }
            }   
        } catch (error) {
            return false;
        }
    }
}

class DateError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = DATE_ERROR
        this.customCode = 400
    }
}


class FilterError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = FILTER_ERROR
        this.customCode = 422
    }
}

export { Utility, DateError, FilterError }