import db from "../db/db"
import { Product, Category } from "../components/product"
import { ProductNotFoundError, ProductAlreadyExistsError, ProductSoldError, EmptyProductStockError, LowProductStockError } from "../errors/productError"
import { Utility, DateError, FilterError } from "../utilities"
import dayjs from 'dayjs'
import ReviewDAO from "./reviewDAO"


class ProductDAO {

    async registerFirstArrival(model: string, category: string, quantity: number, details: string | null, sellingPrice: number, arrivalDate: string | null) :Promise<void>{ 
        let product=undefined;
        try{
            product = await Utility.checkProductDeleted(model);
        }
        catch{}
        if(product){            
            return new Promise<void>((resolve, reject) => {
                try {
                    if(!arrivalDate){
                    //  arrivalDate = dayjs().format("YYYY-MM-DD");
                     arrivalDate = new Date().toISOString().split("T")[0]
                    } else {
                        if (!Utility.checkDateAfter(arrivalDate, null)){
                            reject(new DateError());
                            return;
                        }
                    } 
                    
                    const sql = "UPDATE product SET category=?, quantity=?, details=?, sellingPrice=?, arrivalDate=?, deleted=0 WHERE model = ? "
                    db.run(sql, [category, quantity, details, sellingPrice, arrivalDate, model], (err: Error | null) => {
                        if (err) {
                            reject(err)
                            return;
                        }
                        resolve()
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }else{
            return new Promise<void>((resolve, reject) => {
                try {
                    if(!arrivalDate) {
                        // arrivalDate = dayjs().format("YYYY-MM-DD");
                        arrivalDate = new Date().toISOString().split("T")[0]
                    }
                    else {
                        if (!Utility.checkDateAfter(arrivalDate, null) ) {
                            reject(new DateError());
                            return;
                        }
                    } 
                    const sql = "INSERT INTO product(model, category, quantity, details, sellingPrice, arrivalDate, deleted) VALUES(?, ?, ?, ?, ?, ?, ?)"
                    db.run(sql, [model, category, quantity, details, sellingPrice, arrivalDate, 0], (err: Error | null) => {
                        if (err) {
                            if (err.message.includes("UNIQUE constraint failed: product.model")) reject(new ProductAlreadyExistsError());
                            reject(err)
                            return;
                        }
                        resolve()
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }

    registerQuantityUpdate(model: string, newQuantity: number, changeDate: string | null) : Promise<number>{
        return new Promise<number>((resolve, reject) => {
                let quantity:number;
                try { 
                    Utility.checkProductExists(model).then(res => {
                        if (changeDate) {
                            if (!Utility.checkDateAfter(changeDate, null) || !Utility.checkDateBefore(changeDate, res.arrivalDate)) {
                                reject(new DateError());
                                return;
                            }
                        }
                        quantity = res.quantity + newQuantity;
                        const sql = "UPDATE product SET quantity=? WHERE model=?"
                        db.run(sql, [quantity,model], (err: Error | null, row:any) => {
                            if (err) {
                                reject(err)
                                return;
                            }
                            resolve(quantity);
                        })
                    }).catch((err) => reject(err));
                } catch (error) {
                    reject(error)
                }
            })
    }

    sellProducts(model: string, quantity: number, sellingDate: string | null): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let new_quantity:number;
            try {  
                Utility.checkProductExists(model).then(res => {
                    if (sellingDate) {
                        if (!Utility.checkDateAfter(sellingDate, null) || !Utility.checkDateBefore(sellingDate, res.arrivalDate)) {
                            reject(new DateError());
                            return;
                        }
                    }
                    
                    if(res.quantity<1) {
                        reject(new EmptyProductStockError());
                    }

                    new_quantity = res.quantity - quantity;
                    if(new_quantity<0) {
                        reject(new LowProductStockError());
                    }

                    const sql = "UPDATE product SET quantity=? WHERE model=?"
                    db.run(sql, [new_quantity,model], (err: Error | null, row:any) => {
                        if (err) {
                            reject(err)
                            return;
                        }
                        resolve();
                    })
                }).catch((err) => reject(err));
            } catch (error) {
                reject(error);
            }
        })
    }
    
    async getAllProducts(grouping: string | null, category: string | null, model: string | null): Promise<Product[]> {
        try {
            if(grouping==='' && category ==='' && model===''){
                throw new FilterError;
            }
            let filter = " WHERE deleted=0";
    
            // Handle invalid combinations and return 422 errors
            if (grouping == null && (category != null || model != null)) {
                throw new FilterError;
            } else if (grouping === "category" && (category == null || model != null)) {
                throw new FilterError;
            } else if (grouping === "model") {
                if (model == null || category != null) {
                    throw new FilterError;
                }
    
                // Check if the model exists in the database
                const modelExists = await Utility.checkProductExists(model);
                if (!modelExists) {
                    throw new ProductNotFoundError;
                }
    
                filter = filter + " AND model='" + model + "'";
            } else if (grouping === "category" && category != null) {
                filter = filter + " AND category='" + category + "'";
            }
    
            return new Promise<Product[]>((resolve, reject) => {
                const sql = "SELECT * FROM product" + filter;
                db.all(sql, [], (err: Error | null, rows: Product[]) => {
                                        
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows.map(row => new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity)));
                    }
                });
            });
        } catch (error) {
            return new Promise<Product[]>((resolve, reject) => {
                reject(error);
            });
        }
    }
    
    async getAvailableProducts(grouping: string | null, category: string | null, model: string | null): Promise<Product[]> {
        try {

            if(grouping==='' && category ==='' && model===''){
                throw new FilterError;
            }

            let filter = " WHERE deleted=0";
    
            if (grouping == null && (category != null || model != null)) {
                throw new FilterError;
            } else if (grouping === "category" && (category == null || model != null)) {
                throw new FilterError;
            } else if (grouping === "model") {
                if (model == null || category != null) {
                    throw new FilterError;
                }
    
                const modelExists = await Utility.checkProductExists(model);
    
                filter = filter + " AND model='" + model + "'";
            } else if (grouping === "category" && category != null) {
                filter = filter + " AND category='" + category + "'";
            }
    
            return new Promise<Product[]>((resolve, reject) => {
                const sql = "SELECT * FROM product" + filter;
                db.all(sql, [], (err: Error | null, rows: Product[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(
                            rows
                                .map(row => new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity))
                                .filter(row => row.quantity > 0)
                        );
                    }
                });
            });
        } catch (error) {
            return new Promise<Product[]>((resolve, reject) => {
                reject(error);
            });
        }
    }

    async deleteAllProducts(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            db.run("BEGIN TRANSACTION", async (err: Error | null) => {
                if (err) {
                    reject(err);
                    return;
                }    

                try {
                    await (new ReviewDAO()).deleteAllReviews();
                    
                    await new Promise<void>((resolve, reject) => {
                        // const sql = "DELETE FROM product WHERE model=?";                
                        const sql = "UPDATE product SET deleted=1";
                        db.run(sql, [], (err: Error | null, row: any) => {
                            if (err) {
                                reject(err)
                                return;
                            }                    
                            resolve();
                        });
                    })

                    db.run("COMMIT", (err: Error | null) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                } catch (error) {
                    db.run("ROLLBACK", (rollbackErr: Error | null) => {
                        if (rollbackErr) {
                            reject(rollbackErr);
                            return;
                        }
                        reject(error);
                    });
                }
            });
        });
    }

    async deleteProduct(model:string): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            db.run("BEGIN TRANSACTION", async (err: Error | null) => {
                if (err) {
                    reject(err);
                    return;
                }    

                try {
                    let product = await Utility.checkProductExists(model);
                    await (new ReviewDAO()).deleteReviewsOfProduct(model);
                    
                    await new Promise<void>((resolve, reject) => {
                        // const sql = "DELETE FROM product WHERE model=?";                
                        const sql = "UPDATE product SET deleted=1 WHERE model=?";                
                        db.run(sql, [model], (err: Error | null, row: any) => {
                            if (err) {
                                reject(err)
                                return;
                            }                    
                            resolve();
                        });
                    })

                    db.run("COMMIT", (err: Error | null) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                } catch (error) {
                    db.run("ROLLBACK", (rollbackErr: Error | null) => {
                        if (rollbackErr) {
                            reject(rollbackErr);
                            return;
                        }
                        reject(error);
                    });
                }
            });
        });
    }
}

export default ProductDAO