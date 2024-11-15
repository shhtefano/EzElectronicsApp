import { describe, test, expect, jest, beforeAll, afterAll, beforeEach, afterEach } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import { cleanup } from "../src/db/cleanup"

// timeout increased for Gitlab tests with pipeline
jest.setTimeout(60000);

const routePath = "/ezelectronics" //Base route path for the API

//Default user information. We use them to create users and evaluate the returned values
const customer = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const admin = { username: "admin", name: "admin", surname: "admin", password: "admin", role: "Admin", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const manager = { username: "manager", name: "manager", surname: "manager", password: "manager", role: "Manager", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const customer2 = {username: "customer2", name: "customer2", surname: "customer2", password: "customer2", role: "Customer" , birthdate:"2000-12-20", address:"corso castelfidardo 17"}

//Default products information. We use them to create products and evaluate the returned values
const product_1 = {sellingPrice: 1000.00, model: 'iphone13' , category: 'Smartphone', arrivalDate: '2020-12-10' , details : 'nice', quantity:100 }
const product_2 = {sellingPrice: 2000.00, model: 'iphone15' , category: 'Smartphone', arrivalDate: '2020-12-12'  , details : 'nice', quantity:200 }

//Cookies for the users. We use them to keep users logged in. Creating them once and saving them in a variables outside of the tests will make cookies reusable
let customer2Cookie: string
let customerCookie: string
let adminCookie: string
let managerCookie: string

//Helper function that creates a new user in the database.
//Can be used to create a user before the tests or in the tests
//Is an implicit test because it checks if the return code is successful
const postUser = async (userInfo: any) => {
    await request(app)
        .post(`${routePath}/users`)
        .send(userInfo)
        .expect(200)
}

const postProduct = async (product: any) => {
    await request(app)
        .post(`${routePath}/products`)
        .send(product)
        .set("Cookie", adminCookie) 
        .expect(200)
}

const checkout = async (user: any) => {
    await request(app)
        .patch(`${routePath}/carts`)
        .send(user)
        .set("Cookie", customer2Cookie) 
        .expect(200)
}

const addToCart = async (product:any) => {
    await request(app)
        .post(`${routePath}/carts`)
        .send({model:product})
        .set("Cookie", customer2Cookie) 
        .expect(200)
}


//Helper function that logs in a user and returns the cookie
//Can be used to log in a user before the tests or in the testsf
const login = async (userInfo: any) => {
    
    let req = await request(app)
    .post(`${routePath}/sessions`)
    .send(userInfo) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
    .expect(200) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation
    
    return req.headers['set-cookie'][0];
}


beforeAll(async () => {
    await cleanup();
})

afterAll(async () => {
    await cleanup();
})

describe("Review routes integration tests", () => {
    
    describe("POST ezelectronics/reviews:model", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postUser(customer2)
            customer2Cookie = await login(customer2)

            await postProduct(product_1)
            await addToCart(product_1.model)
            await checkout(customer2)
            await postProduct(product_2)
            await addToCart(product_2.model)

            await checkout(customer2)
        })

        test("It returns 200 success code and adds a review. - Customer case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
        })

        test("It returns 401 error code. - Admin case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", adminCookie)
            .expect(401);
        })

        test("It returns 401 error code. - Manager case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", managerCookie)
            .expect(401);
        })
            
        test("It should return a 404 error code if model does not represent an existing product in the database", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+'invalid_model')
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(404);
        })

        test("It should return a 409 error code if there is an existing review for the product made by the customer", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);

            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(409);
        })
    })

    describe("GET ezelectronics/reviews/:model", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postUser(customer2)
            customer2Cookie = await login(customer2)

            await postProduct(product_1)
            await addToCart(product_1.model)
            await checkout(customer2)
            await postProduct(product_2)
            await addToCart(product_2.model)

            await checkout(customer2)
        })

        test("It should return a 200 success code and return all reviews of a product model. - Customer case", async () => {
            await request(app)
            .get(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", customer2Cookie)
            .expect(200);
        })

        test("It should return a 200 success code and return all reviews of a product. - Manager case", async () => {
            
            await request(app)
            .get(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", managerCookie)
            .expect(200);
            
        })

        test("It should return a 200 success code and return all reviews of a product. - Admin case", async () => {
            
            await request(app)
            .get(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", adminCookie)
            .expect(200);
            
        })

        test("It should return a 404 error code if product model does not exists.", async () => {
            
            await request(app)
            .get(`${routePath}/reviews/`+"invalid_model")
            .set("Cookie", adminCookie)
            .expect(404);
            
        })

    });

    describe(`DELETE ezelectronics/reviews/:model`, () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postUser(customer2)
            customer2Cookie = await login(customer2)

            await postProduct(product_1)
            await addToCart(product_1.model)
            await checkout(customer2)
            await postProduct(product_2)
            await addToCart(product_2.model)
            await checkout(customer2)
        })

        test("It returns 200 success code and eeletes the review made by the current user for a specific product. - customer case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);

            await request(app)
            .delete(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", customer2Cookie)
            .expect(200);
        })

        test("It returns 401 error code. - manager case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);

            await request(app)
            .delete(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", managerCookie)
            .expect(401);
        })

        test("It returns 401 error code. - admin case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);

            await request(app)
            .delete(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", adminCookie)
            .expect(401);
        })

        test("It should return a 404 error code if model does not represent an existing product", async () => {

            await request(app)
            .delete(`${routePath}/reviews/`+"invalid_model")
            .set("Cookie", customer2Cookie)
            .expect(404);
        })

        test("It should return a 404 error code if the current user does not have a review for the product identified by model", async () => {

            await request(app)
            .delete(`${routePath}/reviews/`+product_1.model)
            .set("Cookie", customer2Cookie)
            .expect(404);
        })

    
    });

    describe(`DELETE ezelectronics/reviews/:model/all`, () => {

        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);
            await postUser(manager);
            managerCookie = await login(manager);

            await postUser(customer2);
            customer2Cookie = await login(customer2);

            await postProduct(product_1);
            await addToCart(product_1.model);
            await checkout(customer);

            await addToCart(product_1.model);
            await checkout(customer2);

        });

        test("It returns 200 success code and deletes all reviews of a specific model. - admin case", async () => {
            
            await request(app)
                .post(`${routePath}/reviews/`+product_1.model)
                .send({score:4, comment:'perfect.'})
                .set("Cookie", customerCookie)
                .expect(200);
            
            await request(app)
                .post(`${routePath}/reviews/`+product_1.model)
                .send({score:1, comment:'very good!'})
                .set("Cookie", customer2Cookie)
                .expect(200);

            await request(app)
                .delete(`${routePath}/reviews/`+product_1.model+`/all`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It returns 200 success code and deletes all reviews of a specific model. - manager case", async () => {
            await request(app)
                .post(`${routePath}/reviews/`+product_1.model)
                .send({score:4, comment:'perfect.'})
                .set("Cookie", customerCookie)
                .expect(200);
            
            await request(app)
                .post(`${routePath}/reviews/`+product_1.model)
                .send({score:1, comment:'very good!'})
                .set("Cookie", customer2Cookie)
                .expect(200);

            await request(app)
                .delete(`${routePath}/reviews/`+product_1.model+`/all`)
                .set("Cookie", managerCookie)
                .expect(200);
        })

        test("It returns 401 error code. - customer case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);

            await request(app)
            .delete(`${routePath}/reviews/`+product_1.model+`/all`)
            .set("Cookie", customer2Cookie)
            .expect(401);
        })

        test("It should return a 404 error if model does not represent an existing product", async () => {

            await request(app)
            .delete(`${routePath}/reviews/`+"invalid_model"+"/all")
            .set("Cookie", adminCookie)
            .expect(404);
        })


    
    });

    describe("DELETE ezelectronics/reviews`", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postUser(customer2)
            customer2Cookie = await login(customer2)

            await postProduct(product_1)
            await addToCart(product_1.model)
            await checkout(customer2)
            await postProduct(product_2)
            await addToCart(product_2.model)

            await checkout(customer2)
        })

        test("It returns 200 success code and deletes all reviews of all existing products. - Admin case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
            
            await request(app)
            .post(`${routePath}/reviews/`+product_2.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
            
            await request(app)
            .delete(`${routePath}/reviews/`)
            .set("Cookie", adminCookie)
            .expect(200);
        })

        test("It returns 200 success code and deletes all reviews of all existing products. - Manager case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
            
            await request(app)
            .post(`${routePath}/reviews/`+product_2.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
            
            await request(app)
            .delete(`${routePath}/reviews/`)
            .set("Cookie", managerCookie)
            .expect(200);
        })

        test("It returns 401 error code. - Customer case", async () => {
            await request(app)
            .post(`${routePath}/reviews/`+product_1.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
            
            await request(app)
            .post(`${routePath}/reviews/`+product_2.model)
            .send({score:1, comment:'very good!'})
            .set("Cookie", customer2Cookie)
            .expect(200);
            
            await request(app)
            .delete(`${routePath}/reviews/`)
            .set("Cookie", customer2Cookie)
            .expect(401);
        })
    });
})  