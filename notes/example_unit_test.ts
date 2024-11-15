import { describe, test, expect, beforeAll, afterAll, jest } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"

import UserController from "../../src/controllers/userController"
import Authenticator from "../../src/routers/auth"
import { Role, User } from "../../src/components/user"
import ErrorHandler from "../../src/helper"
const baseURL = "/ezelectronics"

//For unit tests, we need to validate the internal logic of a single component, without the need to test the interaction with other components
//For this purpose, we mock (simulate) the dependencies of the component we are testing
jest.mock("../../src/controllers/userController")
jest.mock("../../src/routers/auth")

let testAdmin = new User("admin", "admin", "admin", Role.ADMIN, "", "")
let testCustomer = new User("customer", "customer", "customer", Role.CUSTOMER, "", "")


describe("Route unit tests", () => {
    describe("POST /users", () => {
        //We are testing a route that creates a user. This route calls the createUser method of the UserController, uses the express-validator 'body' method to validate the input parameters and the ErrorHandler to validate the request
        //All of these dependencies are mocked to test the route in isolation
        //For the success case, we expect that the dependencies all work correctly and the route returns a 200 success code
        test("It should return a 200 success code", async () => {
            const inputUser = { username: "test", name: "test", surname: "test", password: "test", role: "Manager" }
            //We mock the express-validator 'body' method to return a mock object with the methods we need to validate the input parameters
            //These methods all return an empty object, because we are not testing the validation logic here (we assume it works correctly)
            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            //We mock the ErrorHandler validateRequest method to return the next function, because we are not testing the validation logic here (we assume it works correctly)
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next()
            })
            //We mock the UserController createUser method to return true, because we are not testing the UserController logic here (we assume it works correctly)
            jest.spyOn(UserController.prototype, "createUser").mockResolvedValueOnce(true)

            /*We send a request to the route we are testing. We are in a situation where:
                - The input parameters are 'valid' (= the validation logic is mocked to be correct)
                - The user creation function is 'successful' (= the UserController logic is mocked to be correct)
              We expect the 'createUser' function to have been called with the input parameters and to return a 200 success code
              Since we mock the dependencies and we are testing the route in isolation, we do not need to check that the user has actually been created
            */
            const response = await request(app).post(baseURL + "/users").send(inputUser)
            expect(response.status).toBe(200)
            expect(UserController.prototype.createUser).toHaveBeenCalled()
            expect(UserController.prototype.createUser).toHaveBeenCalledWith(inputUser.username, inputUser.name, inputUser.surname, inputUser.password, inputUser.role)
        })
    })

    describe("GET /users", () => {
        test("It returns an array of users", async () => {
            //The route we are testing calls the getUsers method of the UserController and the isAdmin method of the Authenticator
            //We mock the 'getUsers' method to return an array of users, because we are not testing the UserController logic here (we assume it works correctly)
            jest.spyOn(UserController.prototype, "getUsers").mockResolvedValueOnce([testAdmin, testCustomer])
            //We mock the 'isAdmin' method to return the next function, because we are not testing the Authenticator logic here (we assume it works correctly)
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return next();
            })

            //We send a request to the route we are testing. We are in a situation where:
            //  - The user is an Admin (= the Authenticator logic is mocked to be correct)
            //  - The getUsers function returns an array of users (= the UserController logic is mocked to be correct)
            //We expect the 'getUsers' function to have been called, the route to return a 200 success code and the expected array
            const response = await request(app).get(baseURL + "/users")
            expect(response.status).toBe(200)
            expect(UserController.prototype.getUsers).toHaveBeenCalled()
            expect(response.body).toEqual([testAdmin, testCustomer])
        })


        test("It should fail if the user is not an Admin", async () => {
            //In this case, we are testing the situation where the route returns an error code because the user is not an Admin
            //We mock the 'isAdmin' method to return a 401 error code, because we are not testing the Authenticator logic here (we assume it works correctly)
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthorized" });
            })
            //By calling the route with this mocked dependency, we expect the route to return a 401 error code
            const response = await request(app).get(baseURL + "/users")
            expect(response.status).toBe(401)
        })
    })

    describe("GET /users/roles/:role", () => {

        test("It returns an array of users with a specific role", async () => {
            //The route we are testing calls the getUsersByRole method of the UserController, the isAdmin method of the Authenticator, and the param method of the express-validator
            //We mock the 'getUsersByRole' method to return an array of users, because we are not testing the UserController logic here (we assume it works correctly)
            jest.spyOn(UserController.prototype, "getUsersByRole").mockResolvedValueOnce([testAdmin])
            //We mock the 'isAdmin' method to return the next function, because we are not testing the Authenticator logic here (we assume it works correctly)
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return next();
            })
            //We mock the 'param' method of the express-validator to throw an error, because we are not testing the validation logic here (we assume it works correctly)
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            //We call the route with the mocked dependencies. We expect the 'getUsersByRole' function to have been called, the route to return a 200 success code and the expected array
            const response = await request(app).get(baseURL + "/users/roles/Admin")
            expect(response.status).toBe(200)
            expect(UserController.prototype.getUsersByRole).toHaveBeenCalled()
            expect(UserController.prototype.getUsersByRole).toHaveBeenCalledWith("Admin")
            expect(response.body).toEqual([testAdmin])
        })

        test("It should fail if the role is not valid", async () => {
            //In this case we are testing a scenario where the role parameter is not among the three allowed ones
            //We need the 'isAdmin' method to return the next function, because the route checks if the user is an Admin before validating the role
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return next();
            })
            //We mock the 'param' method of the express-validator to throw an error, because we are not testing the validation logic here (we assume it works correctly)
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => {
                    throw new Error("Invalid value");
                }),
            }));
            //We mock the 'validateRequest' method to receive an error and return a 422 error code, because we are not testing the validation logic here (we assume it works correctly)
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return res.status(422).json({ error: "The parameters are not formatted properly\n\n" });
            })
            //We call the route with dependencies mocked to simulate an error scenario, and expect a 422 code
            const response = await request(app).get(baseURL + "/users/roles/Invalid")
            expect(response.status).toBe(422)
        })
    })
})
