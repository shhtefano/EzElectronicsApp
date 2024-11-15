"use strict"

import db from "../db/db";

/**
 * Deletes all data from the database.
 * This function must be called before any integration test, to ensure a clean database state for each test run.
 */


export function cleanup(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            db.run("DELETE FROM paid_cart_content", [], (err) => {
                if (err) return reject(err);         
                db.run("DELETE FROM cart_content", [], (err) => {
                    if (err) return reject(err);            
                    db.run("DELETE FROM users", [], (err) => {
                        if (err) return reject(err);
                        db.run("DELETE FROM product", [], (err) => {
                            if (err) return reject(err);
                            db.run("DELETE FROM cart", [], (err) => {
                                if (err) return reject(err);
                                db.run("DELETE FROM review", [], (err) => {
                                    if (err) return reject(err);
                                    resolve();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}