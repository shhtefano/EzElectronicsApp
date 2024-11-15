import { describe, test, expect, jest, beforeAll, afterAll, beforeEach, afterEach } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import { cleanup } from "../src/db/cleanup"

// timeout increased for Gitlab tests with pipeline
jest.setTimeout(60000);

const routePath = "/ezelectronics" //Base route path for the API

//Default user information. We use them to create users and evaluate the returned values
const customer = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const customer2 = { username: "customer2", name: "customer2", surname: "customer2", password: "customer2", role: "Customer", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const admin = { username: "admin", name: "admin", surname: "admin", password: "admin", role: "Admin", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const manager = { username: "manager", name: "manager", surname: "manager", password: "manager", role: "Manager", birthdate:"2000-12-20", address:"corso castelfidardo 17" }
const admin2 = { username: "admin2", name: "admin2", surname: "admin2", password: "admin2", role: "Admin" , birthdate:"2000-12-20", address:"corso castelfidardo 17"}


//Default products information. We use them to create products and evaluate the returned values
const product_1 = {sellingPrice: 1000.00, model: 'iphone13' , category: 'Smartphone', arrivalDate: '2020-12-10' , details : 'nice', quantity:100 }
const product_2 = {sellingPrice: 2000.00, model: 'iphone15' , category: 'Smartphone', arrivalDate: '2020-12-12'  , details : 'nice', quantity:200 }
const product_3 = {sellingPrice: 3000.00, model: 'Dell'      , category: 'Laptop'    , arrivalDate: '2020-12-16' , details : 'bad' , quantity:1 }
const product_4 = {sellingPrice: 4000.00, model: 'Bosch'     , category: 'Appliance' , arrivalDate: '2020-12-17'  , details : 'good', quantity:150 }


//Cookies for the users. We use them to keep users logged in. Creating them once and saving them in a variables outside of the tests will make cookies reusable
let customerCookie: string
let customer2Cookie: string
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
        .expect(200);
}

const addToCart = async (product:any, userCookie:any) => {
    await request(app)
        .post(`${routePath}/carts`)
        .send({model:product})
        .set("Cookie", userCookie) 
        .expect(200)
}


const checkout = async (user: any, userCookie: any) => {
    await request(app)
        .patch(`${routePath}/carts`)
        .set("Cookie", userCookie) 
        .expect(200)
}

const removeFromCart = async (model: any, userCookie: any) => {
    await request(app)
        .delete(`${routePath}/carts/products/`+model)
        .set("Cookie", userCookie) 
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


//Before executing tests, we remove everything from our test database, create an Admin user and log in as Admin, saving the cookie in the corresponding variable
beforeAll(async () => {
    await cleanup();
})

//After executing tests, we remove everything from our test database
afterAll(async () => {
    await cleanup();
})

describe("Cart routes integration tests", () => {

    
    describe("GET ezelectronics/carts", () => {

        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);
            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);

        })

        test("It return 200 success code and returns the current cart of the logged in user. - customer case", async () => {
            await addToCart(product_1.model, customerCookie);
            
            await request(app)
            .get(`${routePath}/carts/`)
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 200 success code and returns the (empty) current cart of the logged in user. - customer case", async () => {
            await request(app)
            .get(`${routePath}/carts/`)
            .set("Cookie", customerCookie)
            .expect(200);            
        })

        test("It return 401 error code and tries to return the current cart of the logged in user. - admin case", async () => {
            await request(app)
            .get(`${routePath}/carts/`)
            .set("Cookie", adminCookie)
            .expect(401);            
        })

        test("It return 401 error code and tries to return the current cart of the logged in user. - manager case", async () => {
            await request(app)
            .get(`${routePath}/carts/`)
            .set("Cookie", managerCookie)
            .expect(401);            
        })

    });

    describe("POST ezelectronics/carts", () => {

        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);
            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);
            
        })

        test("It return 200 success code and adds a product instance, to the current cart of the logged in user - customer case", async () => {
            
            await request(app)
            .post(`${routePath}/carts/`)
            .send({model:product_1.model})
            .set("Cookie", customerCookie)
            .expect(200);
            
            await request(app)
            .post(`${routePath}/carts/`)
            .send({model:product_1.model})
            .set("Cookie", customerCookie)
            .expect(200);

            await request(app)
            .post(`${routePath}/carts`)
            .send({model:product_2.model})
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 200 success code and adds a product instance, to the current cart of the logged in user that does not have any information about cart. - customer case", async () => {
            
            // cart does not exits
            await request(app)
            .post(`${routePath}/carts`)
            .send({model:product_1.model})
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 401 error code and tries to add a product instance, to the current cart of the logged in user - manager case", async () => {
            
            // cart does not exits
            await request(app)
            .post(`${routePath}/carts`)
            .send({model:product_1.model})
            .set("Cookie", managerCookie)
            .expect(401);
        })

        test("It return 401 error code and tries to add a product instance, to the current cart of the logged in user - admin case", async () => {
            
            // cart does not exits
            await request(app)
            .post(`${routePath}/carts`)
            .send({model:product_1.model})
            .set("Cookie", adminCookie)
            .expect(401);
        })

        test("It should return a 404 error code if model does not represent an existing product", async () => {
            
            // cart does not exits
            await request(app)
            .post(`${routePath}/carts`)
            .send({model:"invalid_model"})
            .set("Cookie", customerCookie)
            .expect(404);
        })

        test("It should return a 409 error code if model represents a product whose available quantity is 0", async () => {
            await addToCart(product_3.model, customerCookie);
            await checkout(customer, customerCookie);

            // cart does not exits
            await request(app)
            .post(`${routePath}/carts`)
            .send({model:product_3.model})
            .set("Cookie", customerCookie)
            .expect(409);
        })



    });

    describe("PATCH ezelectronics/carts", () => {

        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);

            await postUser(customer2);
            customer2Cookie = await login(customer2);


            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);
            
        })

        test("It return 200 success code and simulates payment for the current cart of the logged in user. - customer case", async () => {     
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);

            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 401 error code and tries to simulate payment for the current cart of the logged in user. - manager case", async () => {     
            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", managerCookie)
            .expect(401);
        })

        test("It return 401 error code and tries to simulate payment for the current cart of the logged in user. - admin case", async () => {     
            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", adminCookie)
            .expect(401);
        })

        test("It should return a 404 error code if there is no information about an unpaid cart in the database", async () => {     
            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", customerCookie)
            .expect(404);
        })

        test("It should return a 400 error code if there is information about an unpaid cart but the cart contains no product", async () => {     
            await addToCart(product_1.model, customerCookie);
            await removeFromCart(product_1.model, customerCookie);

            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", customerCookie)
            .expect(400);
        })

        test("It should return a 409 error code if there is at least one product in the cart whose available quantity in the stock is 0", async () => {     
            await addToCart(product_3.model, customerCookie);
            await addToCart(product_3.model, customer2Cookie);
            await checkout(customer, customerCookie);

            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", customer2Cookie)
            .expect(409);
        })

        test("It should return a 409 error code if there is at least one product in the cart whose quantity is higher than the available quantity in the stock", async () => {     
            await addToCart(product_3.model, customerCookie);
            await addToCart(product_3.model, customerCookie);
            await addToCart(product_3.model, customerCookie);

            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", customerCookie)
            .expect(409);
        })

        test("It should return a 404 error code if cart does not exists", async () => {     

            await request(app)
            .patch(`${routePath}/carts`)
            .set("Cookie", customerCookie)
            .expect(404);
        })

    });

    describe("GET ezelectronics/carts/history", () => {
        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);

            await postUser(customer2);
            customer2Cookie = await login(customer2);


            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);

            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await checkout(customer, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);
            await checkout(customer, customerCookie);

        })

        test("It return 200 success code and returns the history of the carts that have been paid for by the current user. - customer case", async () => {     

            await request(app)
            .get(`${routePath}/carts/history`)
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 401 error code and tries to return the history of the carts that have been paid for by the current user. - manager case", async () => {     

            await request(app)
            .get(`${routePath}/carts/history`)
            .set("Cookie", managerCookie)
            .expect(401);
        })

        test("It return 401 error code and tries to return the history of the carts that have been paid for by the current user. - admin case", async () => {     

            await request(app)
            .get(`${routePath}/carts/history`)
            .set("Cookie", adminCookie)
            .expect(401);
        })
    });

    describe("DELETE ezelectronics/carts/products/:model", () => {
        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);

            await postUser(customer2);
            customer2Cookie = await login(customer2);


            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);
        })

        test("It return 200 success code and remove product from cart - customer case", async () => {     
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);

            await request(app)
            .delete(`${routePath}/carts/products/`+product_1.model)
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 401 error code. - manager case", async () => {  
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);
   
            await request(app)
            .delete(`${routePath}/carts/products/`+product_1.model)
            .set("Cookie", managerCookie)
            .expect(401);
        })

        test("It return 401 error code. - admin case", async () => {     
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);

            await request(app)
            .delete(`${routePath}/carts/products/`+product_1.model)
            .set("Cookie", adminCookie)
            .expect(401);
        })

        test("It should return a 404 error code if model represents a product that is not in the cart", async () => {
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);

            await request(app)
            .delete(`${routePath}/carts/products/`+product_3.model)
            .set("Cookie", customerCookie)
            .expect(404);
        })

        test("It should return a 404 error code if model represents a product that is not in the cart", async () => {
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);
            
            await request(app)
            .delete(`${routePath}/carts/products/`+product_3.model)
            .set("Cookie", customer2Cookie)
            .expect(404);
        })

        test("It should return a 404 error code if model does not represent an existing product", async () => {     
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);
            
            await request(app)
            .delete(`${routePath}/carts/products/`+'invalid_model')
            .set("Cookie", customer2Cookie)
            .expect(404);
        })

        test("It should return a 404 error code if cart does not exist", async () => {     
            await request(app)
            .delete(`${routePath}/carts/products/`+product_1.model)
            .set("Cookie", customer2Cookie)
            .expect(404);
        })
    });

    describe("DELETE ezelectronics/carts/current", () => {
        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);

            await postUser(customer2);
            customer2Cookie = await login(customer2);


            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);

            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customerCookie);

        })

        test("It return 200 success code and empties the current cart by deleting all of its products. - customer case", async () => {     
            await request(app)
            .delete(`${routePath}/carts/current`)
            .set("Cookie", customerCookie)
            .expect(200);
        })

        test("It return 401 error code and tries to empty the current cart by deleting all of its products. - manager case", async () => {     
            await request(app)
            .delete(`${routePath}/carts/current`)
            .set("Cookie", managerCookie)
            .expect(401);
        })

        test("It return 401 error code and tries to empty the current cart by deleting all of its products. - admin case", async () => {     
            await request(app)
            .delete(`${routePath}/carts/current`)
            .set("Cookie", adminCookie)
            .expect(401);
        })

        test("It should return a 404 error code if there is no information about an unpaid cart for the user", async () => {     
            await request(app)
            .delete(`${routePath}/carts/current`)
            .set("Cookie", customer2Cookie)
            .expect(404);
        })

    });
    
    describe("DELETE ezelectronics/carts", () => {
        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);

            await postUser(customer2);
            customer2Cookie = await login(customer2);


            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);

            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customer2Cookie);

        })

        
        test("It return 200 success code and deletes all existing carts of all users, both current and past. - manager case", async () => {     
            await request(app)
            .delete(`${routePath}/carts`)
            .set("Cookie", managerCookie)
            .expect(200);
            })
            
        test("It return 200 success code deletes all existing carts of all users, both current and past. - admin case", async () => {     
            await request(app)
            .delete(`${routePath}/carts`)
            .set("Cookie", adminCookie)
            .expect(200);
            })
                
        test("It return 401 error code tries to delete all existing carts of all users, both current and past. - customer case", async () => {     
            await request(app)
            .delete(`${routePath}/carts`)
            .set("Cookie", customerCookie)
            .expect(401);
        })

    });

    describe("GET ezelectronics/carts/all", () => {
        beforeEach(async () => {
            await cleanup();
            await postUser(admin);
            adminCookie = await login(admin);
            await postUser(customer);
            customerCookie = await login(customer);

            await postUser(customer2);
            customer2Cookie = await login(customer2);


            await postUser(manager);
            managerCookie = await login(manager);
                
            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);

            await addToCart(product_1.model, customerCookie);
            await addToCart(product_1.model, customerCookie);
            await addToCart(product_2.model, customer2Cookie);

        })

        
        test("It return 200 success code and returns all carts of all users, both current and past - manager case", async () => {     
            await request(app)
            .get(`${routePath}/carts/all`)
            .set("Cookie", managerCookie)
            .expect(200);
            })
            
        test("It return 200 success code and returns all carts of all users, both current and past - admin case", async () => {     
            await request(app)
            .get(`${routePath}/carts/all`)
            .set("Cookie", adminCookie)
            .expect(200);
            })
                
        test("It return 401 error code and triesm to return all carts of all users, both current and past - customer case", async () => {     
            await request(app)
            .get(`${routePath}/carts/all`)
            .set("Cookie", customerCookie)
            .expect(401);
        })

    });
});
