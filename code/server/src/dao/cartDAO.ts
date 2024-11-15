import db from "../db/db";
import { User } from "../components/user";
import { Cart, ProductInCart } from "../components/cart";
import { Utility } from "../utilities";
import { EmptyProductStockError, LowProductStockError } from "../errors/productError";
import { CartNotFoundError, EmptyCartError, ProductNotInCartError } from "../errors/cartError";
import dayjs from "dayjs";

/**
 * A class that implements the interaction with the database for all cart-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */

class CartDAO {

    // async getCart(user:User): Promise<Cart>{
    //     return new Promise<Cart>((resolve, reject) => {
    //         try {
    //             const sql = "SELECT * FROM cart WHERE username=? AND paid=0";
    //             db.get(sql, [user.username], (err: Error | null, row:any) => {
    //                 if (err) {
    //                     reject(err)
    //                     return;
    //                 }
    //                 if(!row){
    //                     this.createCart(user).then((cart: any) => {
    //                         resolve(new Cart(cart.cart_id, cart.customer, cart.paid, cart.paymentDate, cart.total, []));
    //                         return;
    //                     }).catch(error => reject(error));
    //                 } else {                      
    //                     db.all('SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?', [row.cartId], (err: Error | null, res:ProductInCart[]) => {  
    //                         if (err) {
    //                             reject(err)
    //                             return;
    //                         } else {                            
    //                             if (!res) {
    //                                 // resolve(new Cart(row.cart_id, user.username, false, null, 0, []));
    //                                 resolve(new Cart(row.cart_id, user.username, row.paid, row.paymentDate, row.total, []));
    //                                 return;
    //                             } else {
    //                                 let products:any = res.map( prod => {
    //                                     return new ProductInCart(prod.cart_id, prod.model, prod.quantity, prod.category, prod.price);
    //                                 })
                                    
    //                                 // let total_price = products.reduce((acc:any, product:any) => acc + (product.price * product.quantity), 0);                                   
    //                                 // resolve(new Cart(row.cartId, row.username, row.paid, row.paymentDate, total_price, products));
    //                                 resolve(new Cart(row.cartId, row.username, row.paid, row.paymentDate, row.total, products));
    //                             }      
    //                         }
    //                     })
    //                 }
    //             })
    //         } catch (error) { 
    //             reject(error)
    //         }
    //     })
    // }

    async getCart(user:User): Promise<Cart>{
        return new Promise<Cart>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM cart WHERE username=? AND paid=0";
                db.get(sql, [user.username], async (err: Error | null, row:any) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    if(!row){
                        let cartId : number;
                        try {
                            cartId = await this.getCartID();
                        } catch(err) {
                            reject(err);
                        }
                        resolve(new Cart(cartId, user.username, false, "", 0, []));
                        return;
                        // this.createCart(user).then((cart: any) => {
                        //     resolve(new Cart(cart.cart_id, cart.customer, cart.paid, cart.paymentDate, cart.total, []));
                        //     return;
                        // }).catch(error => reject(error));
                    } else {
                        let products;
                        try {
                            products = await this.getCartProducts(row.cartId);
                        } catch(err) {
                            reject(err);
                        }
                        resolve(new Cart(row.cartId, row.username, row.paid, row.paymentDate, row.total, products));
                        return;
                    }
                })
            } catch (error) { 
                reject(error)
            }
        })
    }

    // async addToCart(user:User, product:string) : Promise<Boolean>{
    //     let cart = await this.getCart(user);
    //     let productFromDB = await Utility.checkProductExists(product);
    //     if (productFromDB.quantity < 1) {
    //         return Promise.reject(new EmptyProductStockError());
    //     } 

    //     let product_in_cart = cart.products.filter(res => res.model === productFromDB.model);
        
    //     if (product_in_cart.length>0) {

    //         return new Promise<Boolean>((resolve, reject) => {
    //             try {
    //                 const sql = "UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ";
    //                 db.run(sql, [product_in_cart[0].quantity+1, product_in_cart[0].cart_id, product_in_cart[0].model], async (err: Error | null, row:any) => {
    //                     if (err) {
    //                         reject(err)
    //                         return;
    //                     }

    //                     try {
    //                         // const new_total = cart.total + productFromDB.sellingPrice;
    //                         // round to 2 decimal positions before storing in db
    //                         const new_total = Number((Number(cart.total.toFixed(2)) + Number(productFromDB.sellingPrice.toFixed(2))).toFixed(2));
    //                         const sql_total = "UPDATE cart SET total = ? WHERE cartId = ?"
    //                         await new Promise<void>((resolve, reject) => {
    //                             db.run(sql_total, [new_total, cart.cart_id], (err: Error | null, row:any) => {
    //                                 if (err) {
    //                                     reject(err)
    //                                     return;
    //                                 }
    //                                 resolve();
    //                             })
    //                         })
    //                         resolve(true);
    //                     } catch (error) {
    //                         reject(error);
    //                     }
    //                 })
    //             } catch (error) {
    //                 reject(error)
    //             }
    //         })
    //     } else {
    //         return new Promise<Boolean>((resolve, reject) => {
    //             try {
    //                 const sql = "INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)";            
    //                 db.run(sql,[cart.cart_id, product, 1], async (err: Error | null, row:any) => {
    //                     if (err) {
    //                         reject(err)
    //                         return;
    //                     }

    //                     const new_total = Number((Number(cart.total.toFixed(2)) + Number(productFromDB.sellingPrice.toFixed(2))).toFixed(2));

    //                     try {
    //                         // const new_total = cart.total + productFromDB.sellingPrice;
    //                         const sql_total = "UPDATE cart SET total = ? WHERE cartId = ?"
    //                         await new Promise<void>((resolve, reject) => {
    //                             db.run(sql_total, [new_total, cart.cart_id], (err: Error | null, row:any) => {
    //                                 if (err) {
    //                                     reject(err)
    //                                     return;
    //                                 }
    //                                 resolve();
    //                             })
    //                         })
    //                         resolve(true);
    //                     } catch (error) {
    //                         reject(error)
    //                     }
    //                 })
                    
    //             } catch (error) {
    //                 reject(error)
    //             }  
    //         })
    //     }
    // }

    async addToCart(user:User, product:string) : Promise<Boolean>{
        let cart : Cart;

        try {
            cart = await this.getCurrentCart(user);
        } catch (error) {
            if (error instanceof CartNotFoundError) {
                try {
                    cart = await this.createCart(user);
                } catch (error) {
                    return new Promise<Boolean> ((resolve, reject) => {
                        reject(error);
                        return;
                    });
                }
                // console.log("hey2");
            } else {
                return new Promise<Boolean> ((resolve, reject) => {
                    reject(error);
                    return;
                });
            }
        }

        // try {
        //     cart = await this.getCurrentCart(user);
        // } catch (error) {
        //     return new Promise<Boolean> ((resolve, reject) => {
        //         reject(error);
        //         return;
        //     });
        // }

        let productFromDB = await Utility.checkProductExists(product);
        if (productFromDB.quantity < 1) {
            return Promise.reject(new EmptyProductStockError());
        } 

        let product_in_cart = cart.products.filter(res => res.model === productFromDB.model);
        
        if (product_in_cart.length>0) {

            return new Promise<Boolean>((resolve, reject) => {
                try {
                    const sql = "UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ";
                    db.run(sql, [product_in_cart[0].quantity+1, product_in_cart[0].cart_id, product_in_cart[0].model], async (err: Error | null, row:any) => {
                        if (err) {
                            reject(err)
                            return;
                        }

                        try {
                            // const new_total = cart.total + productFromDB.sellingPrice;
                            // round to 2 decimal positions before storing in db
                            const new_total = Number((Number(cart.total.toFixed(2)) + Number(productFromDB.sellingPrice.toFixed(2))).toFixed(2));
                            const sql_total = "UPDATE cart SET total = ? WHERE cartId = ?"
                            await new Promise<void>((resolve, reject) => {
                                db.run(sql_total, [new_total, cart.cart_id], (err: Error | null, row:any) => {
                                    if (err) {
                                        reject(err)
                                        return;
                                    }
                                    resolve();
                                })
                            })
                            resolve(true);
                        } catch (error) {
                            reject(error);
                        }
                    })
                } catch (error) {
                    reject(error)
                }
            })
        } else {
            return new Promise<Boolean>((resolve, reject) => {
                try {
                    const sql = "INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)";            
                    db.run(sql,[cart.cart_id, product, 1], async (err: Error | null, row:any) => {
                        if (err) {
                            reject(err)
                            return;
                        }

                        const new_total = Number((Number(cart.total.toFixed(2)) + Number(productFromDB.sellingPrice.toFixed(2))).toFixed(2));

                        try {
                            // const new_total = cart.total + productFromDB.sellingPrice;
                            const sql_total = "UPDATE cart SET total = ? WHERE cartId = ?"
                            await new Promise<void>((resolve, reject) => {
                                db.run(sql_total, [new_total, cart.cart_id], (err: Error | null, row:any) => {
                                    if (err) {
                                        reject(err)
                                        return;
                                    }
                                    resolve();
                                })
                            })
                            resolve(true);
                        } catch (error) {
                            reject(error)
                        }
                    })
                    
                } catch (error) {
                    reject(error)
                }  
            })
        }
    }

    async createCart(user:User): Promise<Cart>{   
        let cart_id: number;
        try {
            cart_id = await this.getCartID();
        } catch (error) {
            return new Promise<Cart>((resolve, reject) => {
                reject(error);
                return;
            })
        }
        return new Promise<Cart>((resolve, reject) => {
            try {
                const sql = "INSERT INTO cart(cartId, username, total, paymentDate, paid) VALUES(?, ?, ?, ?, ?)"
                db.run(sql, [cart_id, user.username, 0, null, 0], (err: Error | null) => {
                    if (err){
                        reject(err)
                        return;
                    }
                    // resolve(new Cart(cart_id, user.username, false, null, 0, null ));
                    resolve(new Cart(cart_id, user.username, false, null, 0, [] ));
                    return;
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    async getCartID() : Promise<number>{
        return new Promise<number>((resolve, reject)=>{
            try {
                db.get('SELECT MAX(cartId) AS max FROM cart', (err:Error|null, row:any) => {
                    if (err){
                        reject(err);
                    }
                    if(row.max === undefined) { 
                        resolve(0);
                        return;
                    } else { 
                        resolve(row.max+1);
                        return;
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    async checkoutCart(user: User): Promise<void> {
        let cart = await this.getCurrentCart(user);
        if (cart.products.length === 0) {
            return Promise.reject(new EmptyCartError());
        }
        
        return new Promise<void>((resolve, reject) => {
            db.run("BEGIN TRANSACTION", async (err: Error | null) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    // Controlla se la quantità di ogni prodotto nel carrello è disponibile nel database e aggiorna la quantita' nella tabella product
                    for (let product of cart.products) {
                        let productFromDB = await Utility.checkProductExists(product.model);
                        if (productFromDB.quantity < 1) {
                            throw new EmptyProductStockError();
                        } else if (product.quantity > productFromDB.quantity) {
                            throw new LowProductStockError();
                        }

                        let newQuantity = productFromDB.quantity - product.quantity;
                        const updateProductSql = "UPDATE product SET quantity = ? WHERE model = ?";
                        await new Promise<void>((resolve, reject) => {
                            db.run(updateProductSql, [newQuantity, product.model], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        });
                    }
                    
                    // Aggiorna la tabella cart impostando paid a true e aggiornando paymentDate
                    const updateCartSql = "UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?";
                    // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
                    let paymentDate = new Date().toISOString().split("T")[0]

                    await new Promise<void>((resolve, reject) => {
                        db.run(updateCartSql, [1, paymentDate,cart.cart_id], (err: Error | null) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve();
                        });
                    });

                    for(let product of cart.products){
                       const updatePaidCartContentSql = "INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)";
                       await new Promise<void>((resolve, reject) => {
                        db.run(updatePaidCartContentSql, [cart.cart_id, product.model, product.category, product.price, product.quantity], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        }); 

                        const updateCartContentSql = "DELETE FROM cart_content WHERE cartId=? AND model=?"
                        await new Promise<void>((resolve, reject) => {
                            db.run(updateCartContentSql, [cart.cart_id, product.model], (err: Error | null) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve();
                                });
                            }); 
                    }

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

    async getCartHistory(user: User): Promise<Cart[]>{
        try {
            
            let cartFromDB: Cart[] = await this.getPaidCarts(user)
            
            let new_carts: Cart[] = [];
            for(let cart of cartFromDB){
                let new_cart = await this.getCartContent(cart)
                new_carts.push(new_cart);
            }

            return new Promise((resolve, reject) => {
                resolve(new_carts);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    async getPaidCarts(user: User): Promise<Cart[]>{
        return new Promise<Cart[]>((resolve, reject) => {
            let cartFromDB:Cart[];
                const sql = "SELECT cartId as cart_id, paid, paymentDate, total, username as customer FROM cart WHERE username=? AND paid=1";
                
                db.all(sql, [user.username], (err: Error | null, rows:Cart[]) => {
                    
                    if (err) {
                        // if (err.message.includes("UNIQUE constraint failed: product.model")) reject(new ProductAlreadyExistsError);
                        reject(err)
                        //throw new CartNotFoundError;
                        return;
                    }
                    if(!rows){
                        resolve([]);
                        return;
                    }else{
                        cartFromDB = rows.map(row => {return (new Cart(row.cart_id , row.customer, true, row.paymentDate, row.total, []));})
                        resolve(cartFromDB);
                    }
                })
        })
    }

    async getCartContent(cart: Cart): Promise<Cart>{
        return new Promise<Cart>((resolve, reject) => {
            // let products: ProductInCart[];

            db.all('SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?', 
                [cart.cart_id], (err: Error | null, res:ProductInCart[]) => {  
                    
                if (err) {
                    reject(err)
                    return;
                }else{                
                    if(!res){
                        reject(new EmptyProductStockError);
                        return;
                    }else{
                        for (let row of res) {
                            let product_temp = new ProductInCart(row.cart_id, row.model, row.quantity, row.category, row.price)
                            cart.products.push(product_temp);
                        }
                        resolve(cart);
                    }   
                }   
            })
        })
    }  

    async removeProductFromCart(user: User, model: string): Promise<Boolean>{
        let cart = await this.getCurrentCart(user);
        //let cart:Cart = await this.getCart(user);
        let product_in_cart = cart.products.find(product => product.model === model);

        if (!product_in_cart) {
            return Promise.reject(new ProductNotInCartError());
        }

        return new Promise<Boolean>((resolve, reject) => {
            db.run("BEGIN TRANSACTION", async (err: Error | null) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                try {
                    await new Promise<void> ((resolve, reject) => {
                        if (product_in_cart.quantity > 1) {
                            const sql = "UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?";
                            db.run(sql, [product_in_cart.quantity - 1, cart.cart_id, model], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }                    
                                resolve();
                            });
                        } else {
                            const sql = "DELETE FROM cart_content WHERE cartId=? AND model=?";
                            db.run(sql, [cart.cart_id, model], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        }
                    }); 
            
                    let new_total = Number((Number(cart.total.toFixed(2)) - Number(product_in_cart.price.toFixed(2))).toFixed(2));
                    new_total < 0 ? new_total = 0 : new_total;

                    const updateCartTotalSql = "UPDATE cart SET total=? WHERE cartId=?";
                    await new Promise<void>((resolve, reject) => {
                        db.run(updateCartTotalSql, [new_total, cart.cart_id], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        }); 

                        db.run("COMMIT", (err: Error | null) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(true);
                        });

                } catch(error){
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

    async clearCart(user:User): Promise<Boolean>{
        let current_cart : Cart;
        try {
            current_cart = await this.getCurrentCart(user);
        } catch (error) {
            return new Promise<Boolean>((resolve, reject) => {
                reject(error);
            });
        }

        return new Promise<Boolean>((resolve, reject) => {
            db.run("BEGIN TRANSACTION", async (err: Error | null) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                try {
                    const sql = "DELETE FROM cart_content WHERE cartId = ?";
                    await new Promise<void>((resolve, reject) => {
                        db.run(sql, [current_cart.cart_id], (err: Error | null) => {
                            if (err) {
                                reject(err);
                                return;
                            }                    
                            resolve();
                        });
                    });


                    const updateCartTotalSql = "UPDATE cart SET total=? WHERE cartId=?";
                    await new Promise<void>((resolve, reject) => {
                        db.run(updateCartTotalSql, [0, current_cart.cart_id], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve();
                            });
                        });

                    db.run("COMMIT", (err: Error | null) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(true);
                    });

                } catch(error){
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


    async getCurrentCart(user: User) : Promise<Cart> {
        return new Promise<Cart> ((resolve, reject) => {
            try {
                const sql = "SELECT * FROM cart WHERE username=? AND paid=0";
                db.get(sql, [user.username], async (err: Error | null, row:any) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    if(!row){
                        reject(new CartNotFoundError());
                        return;
                    }

                    try {
                        let cartProducts = await this.getCartProducts(row.cartId);
                        resolve(new Cart(row.cartId, row.username, row.paid, row.paymentDate, row.total, cartProducts));
                    } catch (error) {
                        reject(error)
                    }
                })
            } catch (error) { 
                reject(error);
            }
        })
    }


    async deleteAllCarts(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                const deleteCartSql = "DELETE FROM cart";
                db.run(deleteCartSql, (err: Error | null) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    async getAllCarts(): Promise<Cart[]> {
        return new Promise<Cart[]>((resolve, reject) => {
            const sql = "SELECT * FROM cart";
            db.all(sql, [], async (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!rows || rows.length === 0) {
                    resolve([]);
                    return;
                }

                try {
                    let carts: Cart[] = [];

                    for (let row of rows) {
                        const cart = new Cart(row.cartId, row.username, row.paid, row.paymentDate, row.total, []);
                        if(!cart.paid){
                            cart.products = await this.getCartProducts(cart.cart_id);
                        }else{
                            cart.products = await this.getPaidCartProducts(cart.cart_id);
                        }
                        // paid_carts = await this.getPaidCartProduct(cart.cart_id);
                        carts.push(cart);
                    }

                    resolve(carts);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async getCartProducts(cartId: number): Promise<ProductInCart[]> {
        return new Promise<ProductInCart[]>((resolve, reject) => {
            const sql = "SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?";
            db.all(sql, [cartId], (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                    return;
                }
                // if (!rows) {
                //     resolve([]);
                //     return;
                // }

                const products = rows.map(row => new ProductInCart(row.cart_id, row.model, row.quantity, row.category, row.price));
                resolve(products);
            });
        });
    }

    async getPaidCartProducts(cartId:number): Promise<ProductInCart[]> {
        return new Promise<ProductInCart[]>((resolve, reject) => {
            const sql = "SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?";
            db.all(sql, [cartId], (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                    return;
                }
                // if (!rows) {
                //     resolve([]);
                //     return;
                // }

                const products = rows.map(row => new ProductInCart(row.cart_id, row.model, row.quantity, row.category, row.price));
                resolve(products);
            });
        });
    }
    
}

export default CartDAO;
