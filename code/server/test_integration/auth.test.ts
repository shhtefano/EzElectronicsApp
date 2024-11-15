import { describe, test, jest, expect, beforeAll, afterAll, beforeEach, afterEach } from "@jest/globals"
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
    // await...
})

//After executing tests, we remove everything from our test database
afterAll(async () => {
    await cleanup();
})

describe("Auth.ts routes integration tests", () => {
    
    describe("POST /session (login)", () => {
        
        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            await postUser(customer)
            await postUser(manager)
        })

        test("It should return a 200 success code and log in an user with role admin", async () => {

            let req = await request(app)
                .post(`${routePath}/sessions`)
                .send(admin) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(200) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation

                expect(req.body.username).toBe(admin.username)
                expect(req.body.name).toBe(admin.name)
                expect(req.body.surname).toBe(admin.surname)
                expect(req.body.role).toBe(admin.role)

        });

        test("It should return a 200 success code and log in an user with role customer", async () => {

            let req = await request(app)
                .post(`${routePath}/sessions`)
                .send(customer) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(200) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation

                expect(req.body.username).toBe(customer.username)
                expect(req.body.name).toBe(customer.name)
                expect(req.body.surname).toBe(customer.surname)
                expect(req.body.role).toBe(customer.role)

        });

        test("It should return a 200 success code and log in an user with role manager", async () => {

            let req = await request(app)
                .post(`${routePath}/sessions`)
                .send(manager) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(200) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation

                expect(req.body.username).toBe(manager.username)
                expect(req.body.name).toBe(manager.name)
                expect(req.body.surname).toBe(manager.surname)
                expect(req.body.role).toBe(manager.role)
        });

        test("It should return a 401 error code if password is wrong", async () => {
            await postUser(admin2)

            let req = await request(app)
                .post(`${routePath}/sessions`)
                .send({username:admin2.username, name:admin2.name, surname:admin2.surname, password:'wrong_password', role:admin2.role}) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(401) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation                
        });

        test("It should return a 401 error code if username is wrong", async () => {
            await postUser(admin2)

            let req = await request(app)
                .post(`${routePath}/sessions`)
                .send({username:'wrong_password', name:admin2.name, surname:admin2.surname, password:admin2.password, role:admin2.role}) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(401) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation                
        });

        test("It should return a 401 error code if user does not exists", async () => {

            let req = await request(app)
                .post(`${routePath}/sessions`)
                .send({username:admin2.username, name:admin2.name, surname:admin2.surname, password:admin2.password, role:admin2.role}) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(401) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation                
        });

    })

    describe("DELETE /sessions/current (logout)", () => {
        
        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            await postUser(customer)
            await postUser(manager)
            customerCookie = await login(customer)
            adminCookie = await login(admin)
            managerCookie = await login(manager)
        })

        test("It should return a 200 success code and log out the user - customer case", async () => {

            await request(app)
                .delete(`${routePath}/sessions/current`)
                .set("Cookie", customerCookie)
                .expect(200)
        });

        test("It should return a 200 success code and log out the user - manager case", async () => {

            await request(app)
                .delete(`${routePath}/sessions/current`)
                .set("Cookie", managerCookie)
                .expect(200)
        });

        test("It should return a 200 success code and log out the user - admin case", async () => {

            await request(app)
                .delete(`${routePath}/sessions/current`)
                .set("Cookie", adminCookie)
                .expect(200)
        });

    })


})
