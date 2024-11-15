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
const admin2 = { username: "admin2", name: "admin2", surname: "admin2", password: "admin2", role: "Admin" , birthdate:"2000-12-20", address:"corso castelfidardo 17"}


//Default products information. We use them to create products and evaluate the returned values
const product_1 = {sellingPrice: 1000.00, model: 'iphone13' , category: 'Smartphone', arrivalDate: '2020-12-10' , details : 'nice', quantity:100 }
const product_2 = {sellingPrice: 2000.00, model: 'iphone15' , category: 'Smartphone', arrivalDate: '2020-12-12'  , details : 'nice', quantity:200 }
const product_3 = {sellingPrice: 3000.00, model: 'Dell'      , category: 'Laptop'    , arrivalDate: '2020-12-16' , details : 'bad' , quantity:100 }
const product_4 = {sellingPrice: 4000.00, model: 'Bosch'     , category: 'Appliance' , arrivalDate: '2020-12-17'  , details : 'good', quantity:150 }


//Cookies for the users. We use them to keep users logged in. Creating them once and saving them in a variables outside of the tests will make cookies reusable
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
        .expect(200);
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

describe("Product routes integration tests", () => {

    describe("POST /ezelectronics/products", () => {
        
        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(manager)
            managerCookie = await login(manager)
            await postUser(customer)
            customerCookie = await login(customer)
        })

        test("It should return a 200 success code and register a new product - Admin case", async () => {
            await request(app)
                .post(`${routePath}/products`)
                .send({model:product_1.model,category:product_1.category, quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: product_1.arrivalDate} )
                .set("Cookie", adminCookie) 
                .expect(200)
            
            let res = await request(app).get(`${routePath}/products/available`).set("Cookie", adminCookie).expect(200);
            let product = res.body.find((product: any) => product.model === product_1.model) 
            expect(product.model).toBe(product_1.model);
        });

        test("It should return a 200 success code and register a new product - Manager case", async () => {
            await request(app)
                .post(`${routePath}/products`)
                .send({model:product_1.model,category:product_1.category, quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: product_1.arrivalDate} )
                .set("Cookie", managerCookie) 
                .expect(200)

                let res = await request(app).get(`${routePath}/products/available`).set("Cookie", managerCookie).expect(200);
                let product = res.body.find((product: any) => product.model === product_1.model) 
    
                expect(product.model).toBe(product_1.model);
        });

        test("It should return a 401 error code - Customer case", async () => {
            await request(app)
                .post(`${routePath}/products`)
                .send({model:product_1.model,category:product_1.category, quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: product_1.arrivalDate} )
                .set("Cookie", customerCookie) 
                .expect(401)
        });

        test("It should return a 409 error if model represents an already existing set of products in the database", async () => {
            
            await postProduct(product_1);
            
            await request(app)
                .post(`${routePath}/products`)
                .set("Cookie", adminCookie)
                .send({model:product_1.model,category:product_1.category, quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: product_1.arrivalDate} )
                .expect(409);
        })

        test("It should return a 400 error when arrivalDate is after the current date", async () => {

            await request(app)
                .post(`${routePath}/products`)
                .send({model:product_1.model,category:product_1.category, quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: "2030-12-12"} )
                .set("Cookie", adminCookie)
                .expect(400);
        })

        test("It should return a 422 error when model string is empty", async () => {
            await request(app)
                .post(`${routePath}/products`)
                .send({model:'',category:product_1.category, quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: "2030-12-12"} )
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error when cateogory is not 'Smartphone', 'Laptop' or 'Appliance'", async () => {
            await request(app)
                .post(`${routePath}/products`)
                .send({model:product_1.model,category:'Videogames', quantity: product_1.quantity, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: "2030-12-12"} )
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error when quantity is 0", async () => {
            await request(app)
                .post(`${routePath}/products`)
                .send({model:product_1.model,category:product_1.category, quantity:0, details: product_1.details, sellingPrice: product_1.sellingPrice, arrivalDate: "2030-12-12"} )
                .set("Cookie", adminCookie)
                .expect(422);
        })
    })

    describe("PATCH ezelectronics/products/:model", () => {
        
        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postProduct(product_1);
        })

        test("It should return a 200 success code and increases the available quantity of a set of products - Admin case", async () => {
            const res = await request(app)
                .patch(`${routePath}/products/`+product_1.model)
                .send({quantity: product_1.quantity+100, changeDate: '2021-12-01'} )
                .set("Cookie", adminCookie) 
                .expect(200)

                let product_updated = await request(app).get(`${routePath}/products/available`).set("Cookie", adminCookie).expect(200);
                let product = product_updated.body.find((product: any) => product.model === product_1.model) 
    
            expect(res.body.quantity).toBe(product.quantity);

        })

        test("It should return a 200 success code and increases the available quantity of a set of products - Manager case", async () => {
            const res = await request(app)
                .patch(`${routePath}/products/`+product_1.model)
                .send({quantity: product_1.quantity+100, changeDate: '2021-12-01'} )
                .set("Cookie", managerCookie) 
                .expect(200)

                let product_updated = await request(app).get(`${routePath}/products/available`).set("Cookie", managerCookie).expect(200);
                let product = product_updated.body.find((product: any) => product.model === product_1.model) 

            expect(res.body.quantity).toBe(product.quantity);
        })

        test("It should return a 401 error code - Customer case", async () => {
            await request(app)
                .patch(`${routePath}/products/`+product_1.model)
                .send({quantity: product_1.quantity+100, changeDate: '2021-12-01'} )
                .set("Cookie", customerCookie) 
                .expect(401)
        })

        test("It should return a 404 error if model does not represent a product in the database", async () => {

            await request(app)
                .patch(`${routePath}/products/`+"invalid_model")
                .send({quantity: product_1.quantity+100, changeDate: '2021-12-01'} )
                .set("Cookie", adminCookie) 
                .expect(404)
        })
        
        test("It should return a 400 error when changeDate is after the current date", async () => {

            await request(app)
                .patch(`${routePath}/products/`+product_1.model)
                .send({quantity: product_1.quantity+100, changeDate: '2031-12-01'} )
                .set("Cookie", adminCookie)
                .expect(400);
        })

        test("It should return a 400 error when changeDate is before the product's arrivalDate", async () => {

            await request(app)
                .patch(`${routePath}/products/`+product_1.model)
                .send({quantity: product_1.quantity+100, changeDate: '2001-12-01'} )
                .set("Cookie", adminCookie)
                .expect(400);
        })

    });

    describe("PATCH ezelectronics/products/:model/sell", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)
            await postProduct(product_1);

        })

        
        test("It should return a 200 success code and record a product's sale successfully - Admin case", async () => {

            let res = await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2022-04-12", quantity:2 } )
                .set("Cookie", adminCookie)
                .expect(200);
            
            let product_updated = await request(app).get(`${routePath}/products/available`).set("Cookie", adminCookie).expect(200);
            let product = product_updated.body.find((product: any) => product.model === product_1.model) 
            expect(product.quantity).toBe(product_1.quantity-2)
        })
        
        test("It should return a 200 success code and record a product's sale successfully - Manager case", async () => {

            let res = await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2022-04-12", quantity:2 } )
                .set("Cookie", managerCookie)
                .expect(200);
            
            let product_updated = await request(app).get(`${routePath}/products/available`).set("Cookie", managerCookie).expect(200);
            let product = product_updated.body.find((product: any) => product.model === product_1.model) 
            expect(product.quantity).toBe(product_1.quantity-2)
        })

        test("It should return a 401 error code - Customer case", async () => {
            await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2022-04-12", quantity:2 } )
                .set("Cookie", customerCookie) 
                .expect(401)
        })

        test("It should return a 404 error if model does not represent a product in the database", async () => {
            await request(app)
                .patch(`${routePath}/products/`+'invalid_product'+`/sell` )
                .send({model:'invalid_product', sellingDate: "2022-04-12", quantity:2 } )
                .set("Cookie", adminCookie) 
                .expect(404)
        })

        test("It should return a 400 error if sellingDate is after the current date", async () => {

            await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2030-04-12", quantity:2 } )
                .set("Cookie", adminCookie)
                .expect(400);
        })
        
        test("It should return a 400 error if sellingDate is before the product's arrivalDate", async () => {
            await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2000-04-12", quantity:2 } )
                .set("Cookie", adminCookie) 
                .expect(400)
        })
        
        test("It should return a 409 error if model represents a product whose available quantity is 0", async () => {
            await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2021-04-12", quantity:100 } )
                .set("Cookie", adminCookie)
                .expect(200);

            await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell`)
                .send({model:product_1.model, sellingDate: "2022-04-12", quantity:2 } )
                .set("Cookie", adminCookie)
                .expect(409);
        })

        test("It should return a 409 error if the available quantity of model is lower than the requested quantity", async () => {

            await request(app)
                .patch(`${routePath}/products/`+product_1.model+`/sell` )
                .send({model:product_1.model, sellingDate: "2021-04-12", quantity:10000 } )
                .set("Cookie", adminCookie)
                .expect(409);
        })
    });

    describe("GET ezelectronics/products", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);
            await postProduct(product_4);
        })

        test("It should return 200 success code - Returns all products present in the database - Admin case", async () => {

            await request(app)
                .get(`${routePath}/products/`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return 200 success code - Returns all products present in the database - Manager case", async () => {

            await request(app)
                .get(`${routePath}/products/`)
                .set("Cookie", managerCookie)
                .expect(200);
        })

        test("It should return 401 error code- Returns all products present in the database - Customer case", async () => {

            await request(app)
                .get(`${routePath}/products/`)
                .set("Cookie", customerCookie)
                .expect(401);
        })

        // It should return a 422 error if `grouping` is null and any of `category` or `model` is not null

        test("It should return a 422 error code and tries to return all products present in the database - (grouping=null & model=null & category=null) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=null&model=null&category=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all products present in the database - (grouping=null & category=null) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=null&category=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all products present in the database - (grouping==null & model=null) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=null&model=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all products present in the database - grouping==null case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })



        // It should return a 422 error if `grouping` is `category` and `category` is null OR `model` is not null


        test("It should return a 422 error code and tries to return all products present in the database - (grouping==category && category==null) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=category&category=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all products present in the database - (grouping==category && category==null && model==iphone13) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=category&category=null&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all products present in the database - (grouping==category && category=Smartphone && model=iphone13) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=category&category=Smartphone&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all products present in the database - (grouping==category && model=iphone13) case", async () => {

            await request(app)
                .get(`${routePath}/products?grouping=category&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(422);
        })


        // It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null

        test("It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=model`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=model&category=Smartphone`)
                .set("Cookie", adminCookie)
                .expect(422);
        })


        // It should return a 404 error if `model` does not represent a product in the database (only when `grouping` is `model`)

        test("It should return a 404 error if `model` does not represent a product in the database (only when `grouping` is `model`) - (grouping==model && model!=null) case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=model&model=iphone150`)
                .set("Cookie", adminCookie)
                .expect(404);
        })

        // Successfull cases 

        test("It should return a 200 success code and returns all products present in the database - (grouping==category && category = Smartphone) correct case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=category&category=Smartphone`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return a 200 success code and returns all products present in the database - (grouping==category && category = Laptop) correct case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=category&category=Laptop`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return a 200 success code and returns all products present in the database - (grouping==category && category==Appliance) correct case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=category&category=Appliance`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return a 200 success code and returns all products present in the database - (grouping==model && model==iphone13) correct case", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=model&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return 422 when category is not 'Smartphone', 'Laptop' or 'Appliance'", async () => {
            await request(app)
                .get(`${routePath}/products?grouping=category&category=invalid_category`)
                .set("Cookie", adminCookie)
                .expect(422);
        })
    });

    describe("GET ezelectronics/products/available", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)

            await postProduct(product_1);
            await postProduct(product_2);
            await postProduct(product_3);
            await postProduct(product_4);
        })

        test("It should return 200 - Returns all available products present in the database - Admin case", async () => {

            await request(app)
                .get(`${routePath}/products/available`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return 200 - Returns all available products present in the database - Manager case", async () => {

            await request(app)
                .get(`${routePath}/products/available`)
                .set("Cookie", managerCookie)
                .expect(200);
        })

        test("It should return 200 - Returns all available products present in the database - Customer case", async () => {

            await request(app)
                .get(`${routePath}/products/available`)
                .set("Cookie", customerCookie)
                .expect(200);
        })

        // It should return a 422 error if `grouping` is null and any of `category` or `model` is not null

        test("It should return a 422 error code and tries to return all available products present in the database - (grouping=null & model=null & category=null) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=null&model=null&category=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all available products present in the database - (grouping=null & category=null) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=null&category=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to returns all available products present in the database - (grouping==null & model=null) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=null&model=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all available products present in the database - grouping==null case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        // It should return a 422 error if `grouping` is `category` and `category` is null OR `model` is not null

        test("It should return a 422 error code and tries to return all available products present in the database - (grouping==category && category==null) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=null`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all available products present in the database - (grouping==category && category==null && model==iphone13) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=null&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all available products present in the database - (grouping==category && category=Smartphone && model=iphone13) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=Smartphone&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error code and tries to return all available products present in the database - (grouping==category && model=iphone13) case", async () => {

            await request(app)
                .get(`${routePath}/products/available?grouping=category&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        // It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null

        test("It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=model`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        test("It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=model&category=Smartphone`)
                .set("Cookie", adminCookie)
                .expect(422);
        })

        // It should return a 404 error if `model` does not represent a product in the database (only when `grouping` is `model`)

        test("It should return a 404 error if `model` does not represent a product in the database (only when `grouping` is `model`) - (grouping==model && model!=null) case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=model&model=iphone150`)
                .set("Cookie", adminCookie)
                .expect(404);
        })

        // Successfull cases 

        test("It should return a 200 success code and returns all available products present in the database - (grouping==category && category = Smartphone) correct case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=Smartphone`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return a 200 success code and returns all available products present in the database - (grouping==category && category = Laptop) correct case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=Laptop`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return a 200 success code and returns all available products present in the database - (grouping==category && category==Appliance) correct case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=Appliance`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return a 200 success code and returns all available products present in the database - (grouping==model && model==iphone13) correct case", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=model&model=iphone13`)
                .set("Cookie", adminCookie)
                .expect(200);
        })

        test("It should return 422 when category is not 'Smartphone', 'Laptop' or 'Appliance'", async () => {
            await request(app)
                .get(`${routePath}/products/available?grouping=category&category=invalid_category`)
                .set("Cookie", adminCookie)
                .expect(422);
        })


    });

    describe("DELETE ezelectronics/products/:model", () => {

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

        test("It should return a 200 success code and deletes one product from the database. - Admin case", async () => {
            await request(app)
            .delete(`${routePath}/products/`+product_1.model)
            .set("Cookie", adminCookie)
            .expect(200);
        })

        test("It should return a 200 success code and deletes one product from the database. - Manager case", async () => {
            await request(app)
            .delete(`${routePath}/products/`+product_1.model)
            .set("Cookie", managerCookie)
            .expect(200);
        })

        test("It should return a 401 error code. - Customer case", async () => {
            await request(app)
            .delete(`${routePath}/products/`+product_1.model)
            .set("Cookie", customerCookie)
            .expect(401);
        })

        test("It should return a 404 error code if `model` does not represent a product in the database", async () => {
            await request(app)
            .delete(`${routePath}/products/`+'invalid_model')
            .set("Cookie", adminCookie)
            .expect(404);
        })
    });
    
    describe("DELETE ezelectronics/products", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)
                
            await postProduct(product_1)
            await postProduct(product_2)
        })

        test("It should return a 200 success code and deletes all products from the database. - Admin case", async () => {
            await request(app)
            .delete(`${routePath}/products/`)
            .set("Cookie", adminCookie)
            .expect(200);
        })

        test("It should return a 200 success code and deletes all products from the database. - Manager case", async () => {
            await request(app)
            .delete(`${routePath}/products/`)
            .set("Cookie", managerCookie)
            .expect(200);
        })

        test("It should return a 401 error code. - Customer case", async () => {
            await request(app)
            .delete(`${routePath}/products/`)
            .set("Cookie", customerCookie)
            .expect(401);
        })
    });
});
