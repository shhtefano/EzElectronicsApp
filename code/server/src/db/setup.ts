"use strict"

import db from "./db";

export async function createTables(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            db.run(`
            CREATE TABLE "REVIEW" (    "model" TEXT NOT NULL,
            "username" TEXT NOT NULL,    "score" INTEGER NOT NULL,
            "date" TEXT NOT NULL,    "comment" TEXT NOT NULL,
            PRIMARY KEY ("model", "username"));            
            `, (err: Error | null) => {
                if (err) return reject(err);
            });

            db.run(`CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                title TEXT NOT NULL,
                content TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );`, (err: Error | null) => {
                if (err) return reject(err);
            });

            resolve();
        });
    });
}

export async function insertInitialData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            db.run(`INSERT INTO users (name, email) VALUES 
                ('Alice', 'alice@example.com'),
                ('Bob', 'bob@example.com');`, (err: Error | null) => {
                if (err) return reject(err);
            });

            db.run(`INSERT INTO posts (user_id, title, content) VALUES 
                (1, 'First Post', 'This is the first post content.'),
                (2, 'Second Post', 'This is the second post content.');`, (err: Error | null) => {
                if (err) return reject(err);
            });

            resolve();
        });
    });
}

export async function initializeDatabase(): Promise<void> {
    try {
        await createTables();
        // await insertInitialData();
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing database: ", error);
    }
}

// Run the initialization if this script is executed directly
// if (require.main === module) {
//     initializeDatabase();
// }
