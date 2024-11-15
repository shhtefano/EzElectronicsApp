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
    // await...
})

//After executing tests, we remove everything from our test database
afterAll(async () => {
    await cleanup();
})

describe("User routes integration tests", () => {
    
    describe("POST /ezelectronics/users", () => {
        
        beforeEach(async () => {
            // await logout()
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
        })

        test("It should return a 200 success code and create a new user", async () => {
            //A 'request' function is used to send a request to the server. It is similar to the 'fetch' function in the browser
            //It executes an API call to the specified route, similarly to how the client does it
            //It is an actual call, with no mocking, so it tests the real behavior of the server
            //Route calls are asynchronous operations, so we need to use 'await' to wait for the response
            await request(app)
                .post(`${routePath}/users`) //The route path is specified here. Other operation types can be defined with similar blocks (e.g. 'get', 'patch', 'delete'). Route and query parameters can be added to the path
                .send(customer) //In case of a POST request, the data is sent in the body of the request. It is specified with the 'send' block. The data sent should be consistent with the API specifications in terms of names and types
                .expect(200) //The 'expect' block is used to check the response status code. We expect a 200 status code for a successful operation

            //After the request is sent, we can add additional checks to verify the operation, since we need to be sure that the user is present in the database
            //A possible way is retrieving all users and looking for the user we just created.
            const users = await request(app) //It is possible to assign the response to a variable and use it later. 
                .get(`${routePath}/users`)
                .set("Cookie", adminCookie) //Authentication is specified with the 'set' block. Adding a cookie to the request will allow authentication (if the cookie has been created with the correct login route). Without this cookie, the request will be unauthorized
                .expect(200)
            expect(users.body).toHaveLength(2) //Since we know that the database was empty at the beginning of our tests and we created two users (an Admin before starting and a Customer in this test), the array should contain only two users
            let cust = users.body.find((user: any) => user.username === customer.username) //We look for the user we created in the array of users
            expect(cust).toBeDefined() //We expect the user we have created to exist in the array. The parameter should also be equal to those we have sent
            expect(cust.name).toBe(customer.name)
            expect(cust.surname).toBe(customer.surname)
            expect(cust.role).toBe(customer.role)
        });

        test("It should return a 422 error code if at least one request body parameter is empty/missing", async () => {
            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "", name: "test", surname: "test", password: "test", role: "Customer" }) //We send a request with an empty username. The express-validator checks will catch this and return a 422 error code
                .expect(422)
                
            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "test", name: "", surname: "test", password: "test", role: "Customer" })
                .expect(422)

            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "test", name: "name", surname: "", password: "test", role: "Customer" })
                .expect(422)
            
            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "test", name: "name", surname: "surname", password: "", role: "Customer" })
                .expect(422) 

            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "test", name: "name", surname: "", password: "test", role: "" })
                .expect(422)

            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "test", name: "name", surname: ""})
                .expect(422)
        });

        test("It should return a 409 error code because user already exists.", async () => {
            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "user_1", name: "test", surname: "test", password: "test", role: "Customer" }) //We send a request with an empty username. The express-validator checks will catch this and return a 422 error code
                .expect(200)

            await request(app)
                .post(`${routePath}/users`)
                .send({ username: "user_1", name: "test", surname: "test", password: "test", role: "Customer" }) //We send a request with an empty username. The express-validator checks will catch this and return a 422 error code
                .expect(409)
        });

    })

    describe("GET /users", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
        })

        test("It should return a 200 success code and return an array of users", async () => {

            const users = await request(app).get(`${routePath}/users`).set("Cookie", adminCookie).expect(200);
            expect(users.body).toHaveLength(2);
            let cust = users.body.find((user: any) => user.username === customer.username)
            expect(cust).toBeDefined();
            expect(cust.name).toBe(customer.name);
            expect(cust.surname).toBe(customer.surname);
            expect(cust.role).toBe(customer.role);
            let adm = users.body.find((user: any) => user.username === admin.username);
            expect(adm).toBeDefined();
            expect(adm.name).toBe(admin.name);
            expect(adm.surname).toBe(admin.surname);
            expect(adm.role).toBe(admin.role);
        });

        test("It should return a 401 error code if the user is not an Admin", async () => {
            // customerCookie = await login(customer)
            await request(app).get(`${routePath}/users`).set("Cookie", customerCookie).expect(401) //We call the same route but with the customer cookie. The 'expect' block must be changed to validate the error
            await request(app).get(`${routePath}/users`).expect(401) //We can also call the route without any cookie. The result should be the same
        });

    })

    describe("GET /users/roles/:role", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
        })

        test("It should return a 200 success code and return an array of users with a specific role", async () => {
            //Route parameters are set in this way by placing directly the value in the path
            //It is not possible to send an empty value for the role (/users/roles/ will not be recognized as an existing route, it will return 404)
            //Empty route parameters cannot be tested in this way, but there should be a validation block for them in the route
            const admins = await request(app).get(`${routePath}/users/roles/Admin`).set("Cookie", adminCookie).expect(200)
            expect(admins.body).toHaveLength(1) //In this case, we expect only one Admin user to be returned
            let adm = admins.body[0]
            expect(adm.username).toBe(admin.username)
            expect(adm.name).toBe(admin.name)
            expect(adm.surname).toBe(admin.surname)
        })

        test("It should return a 401 error code if the user is not an Admin", async () => {
            await request(app).get(`${routePath}/users/roles/Customer`).set("Cookie", customerCookie).expect(401);
        })

        test("It should return a 422 error code if the requested role is not a Customer or a Manager", async () => {
            await request(app).get(`${routePath}/users/roles/Invalid`).set("Cookie", adminCookie).expect(422);
        })


    })

    describe("GET /users/:username", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)
        })

        test("It should return a 200 success code and return a single user with a specific username. - Admin case", async () => {
            const user = await request(app).get(`${routePath}/users/`+customer.username).set("Cookie", adminCookie).expect(200);
            // expect(user.body).toHaveLength(1) //In this case, we expect only one Admin user to be returned
            let usr = user.body;
            expect(usr.username).toBe(customer.username);
            expect(usr.name).toBe(customer.name);
            expect(usr.surname).toBe(customer.surname);
        })

        test("It should return a 200 success code and return a single user with a specific username. - Customer case", async () => {
            const user = await request(app).get(`${routePath}/users/`+customer.username).set("Cookie", customerCookie).expect(200);
            let usr = user.body;
            expect(usr.username).toBe(customer.username);
            expect(usr.name).toBe(customer.name);
            expect(usr.surname).toBe(customer.surname);
        })

        test("It should return a 200 success code and return a single user with a specific username. - Manager case", async () => {
            const user = await request(app).get(`${routePath}/users/`+manager.username).set("Cookie", managerCookie).expect(200);
            let usr = user.body;
            expect(usr.username).toBe(manager.username);
            expect(usr.name).toBe(manager.name);
            expect(usr.surname).toBe(manager.surname);
        })

        test("It should return a 404 error code if username does not exists.", async () => {
            await request(app).get(`${routePath}/users/`+"invalid_username").set("Cookie", adminCookie).expect(404);
        })

        test("It should return a 401 error code if is not an Admin and it is a customer", async () => {
            await request(app).get(`${routePath}/users/admin`).set("Cookie", customerCookie).expect(401);
        })

        test("It should return a 401 error code if is not an Admin and it is a manager", async () => {
            await request(app).get(`${routePath}/users/admin`).set("Cookie", managerCookie).expect(401);
        })
    })

    describe("DELETE /users/:username  -  Deletes a specific user. Admins can delete any non-Admin user and themselves, but cannot delete other Admins, other user types can only delete themselves", () => {
        

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)
        })

        test("It should return a 200 success code and deletes a specific user. - Admin case", async () => {
            await request(app).delete(`${routePath}/users/`+customer.username).set("Cookie", adminCookie).expect(200);
        })

        test("It should return a 200 success code and Admin deletes himself. - Admin case", async () => {
            await request(app).delete(`${routePath}/users/`+admin.username).set("Cookie", adminCookie).expect(200);
        })

        test("It should return a 200 success code and Customer deletes his account. - Customer case.", async () => {
            await request(app).delete(`${routePath}/users/`+customer.username).set("Cookie", customerCookie).expect(200);
        })

        test("It should return a 200 success code and Manager deletes his account. - Manager case", async () => {
            await request(app).delete(`${routePath}/users/`+manager.username).set("Cookie", managerCookie).expect(200);
        })

        test("It should return a 404 error code if username does not exists.", async () => {
            await request(app).delete(`${routePath}/users/`+"invalid_username").set("Cookie", adminCookie).expect(404);
        })

        test("It should return a 401 error code if user is not an Admin and it is a manager.", async () => {
            await request(app).delete(`${routePath}/users/`+customer.username).set("Cookie", managerCookie).expect(401);
        })

        test("It should return a 401 error when the calling user is an Admin and username represents a different Admin user", async () => {
            await postUser(admin2);
            await request(app).delete(`${routePath}/users/`+admin2.username).set("Cookie", adminCookie).expect(401);
        })
    })
    
    describe("DELETE /users", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)
            await postUser(admin2);

        })

        test("It should return a 200 success code and deletes all non-Admin users from the database. - Admin case", async () => {
            await request(app).delete(`${routePath}/users/`).set("Cookie", adminCookie).expect(200);
        })

        test("It should return a 401 error code - Customer case", async () => {
            await request(app).delete(`${routePath}/users/`).set("Cookie", customerCookie).expect(401);
        })

        test("It should return a 401 error code - Manager case", async () => {
            await request(app).delete(`${routePath}/users/`).set("Cookie", managerCookie).expect(401);
        })
    })

    describe("PATCH ezelectronics/users/:username", () => {

        beforeEach(async () => {
            await cleanup()
            await postUser(admin)
            adminCookie = await login(admin)
            await postUser(customer)
            customerCookie = await login(customer)
            await postUser(manager)
            managerCookie = await login(manager)
        })
        
        // name, surname, address, and birthdate;
        test("It should return a 200 success code and updates the personal information of herself/himself. - Admin case", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ admin.username)
            .set("Cookie", adminCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2000-12-12"})
            .expect(200);
   
            let usr = user.body;

            expect(usr.name).toBe("new_name");
            expect(usr.surname).toBe("new_surname");
            expect(usr.address).toBe("new_address");
            expect(usr.birthdate).toBe("2000-12-12");
            expect(usr.username).toBe(admin.username);
            expect(usr.role).toBe(admin.role);
        })

        test("It should return a 200 success code and Admin updates the personal information of the Customer.", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ customer.username)
            .set("Cookie", adminCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2000-12-12"})
            .expect(200);
   
            let usr = user.body;

            expect(usr.name).toBe("new_name");
            expect(usr.surname).toBe("new_surname");
            expect(usr.address).toBe("new_address");
            expect(usr.birthdate).toBe("2000-12-12");
            expect(usr.username).toBe(customer.username);
            expect(usr.role).toBe(customer.role);
        })

        test("It should return a 200 success code and updates the personal information of herself/himself. - Manager case", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ manager.username)
            .set("Cookie", managerCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2000-12-12"})
            .expect(200);
   
            let usr = user.body;

            expect(usr.name).toBe("new_name");
            expect(usr.surname).toBe("new_surname");
            expect(usr.address).toBe("new_address");
            expect(usr.birthdate).toBe("2000-12-12");
            expect(usr.username).toBe(manager.username);
            expect(usr.role).toBe(manager.role);
        })

        test("It should return a 200 success code and updates the personal information of herself/himself. - Customer case", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ customer.username)
            .set("Cookie", customerCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2000-12-12"})
            .expect(200);

            let usr = user.body;

            expect(usr.name).toBe("new_name");
            expect(usr.surname).toBe("new_surname");
            expect(usr.address).toBe("new_address");
            expect(usr.birthdate).toBe("2000-12-12");
            expect(usr.username).toBe(customer.username);
            expect(usr.role).toBe(customer.role);
        })

        test("It should return a 401 error code - Customer tries to update the personal information of Admin", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ admin.username)
            .set("Cookie", customerCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2000-12-12"})
            .expect(401);
        })

        test("It should return a 401 error code - Manager tries to update the personal information of Admin", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ admin.username)
            .set("Cookie", managerCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2000-12-12"})
            .expect(401);
        })

        test("It should return a 400 error code - Manager tries to update the personal information of another account with error on birthdate.", async () => {

            const user = await request(app).patch(`${routePath}/users/`+ admin.username)
            .set("Cookie", managerCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2030-12-12"})
            .expect(400);
        })

        test("It should return a 404 error code - Admin tries to update the personal information of an account that does not exists.", async () => {

            const user = await request(app).patch(`${routePath}/users/`+"invalid_username")
            .set("Cookie", adminCookie)
            .send({name: "new_name", surname: "new_surname", address: "new_address", birthdate: "2010-12-12"})
            .expect(404);
        })
    })
})
