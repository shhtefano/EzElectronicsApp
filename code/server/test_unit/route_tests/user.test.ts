import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"

import UserController from "../../src/controllers/userController"
import { User, Role } from "../../src/components/user"
// import { afterEach, beforeEach, describe } from "node:test"
import ErrorHandler from "../../src/helper"
import Authenticator from "../../src/routers/auth"
import { UnauthorizedUserError, UserAlreadyExistsError, UserNotFoundError } from "../../src/errors/userError"
import { DateError } from "../../src/utilities"
// import { Server } from 'http'  // Importa il tipo Server da http

jest.mock("../../src/routers/auth")
jest.mock("../../src/controllers/userController")

const baseURL = "/ezelectronics"

beforeEach(() => {
    jest.clearAllMocks();  // Pulisce tutti i mock prima di ogni test
});

// afterEach(() => {
//     jest.clearAllMocks();  // Pulisce tutti i mock dopo ogni test
// });

describe("User route unit tests", () => {

    describe("POST ezelectronics/users/", () => {
        test("It should return a 200 success code", async () => {
            const inputUser = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer" }

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
        
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "createUser").mockResolvedValueOnce(true);

            const response = await request(app).post(baseURL + "/users").send(inputUser)
            expect(response.status).toBe(200)
            expect(UserController.prototype.createUser).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.createUser).toHaveBeenCalledWith(inputUser.username, inputUser.name, inputUser.surname, inputUser.password, inputUser.role)
        });


        test("It should return a 409 error code", async () => {
            const inputUser = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer" }

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "createUser").mockRejectedValueOnce(new UserAlreadyExistsError());

            const response = await request(app).post(baseURL + "/users").send(inputUser);
            expect(response.status).toBe(409);
            expect(UserController.prototype.createUser).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.createUser).toHaveBeenCalledWith(inputUser.username, inputUser.name, inputUser.surname, inputUser.password, inputUser.role);
        });
    });

    describe("GET ezelectronics/users", () => { 
        test("It should return a 200 success code", async () => {     
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "getUsers").mockResolvedValueOnce([]);

            // const response = await request(app).get(baseURL + "/users").send();
            const response = await request(app).get(baseURL + "/users");
            expect(response.status).toBe(200);
            expect(UserController.prototype.getUsers).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.getUsers).toHaveBeenCalledWith();
        });
    });

    describe("GET ezelectronics/users/roles/:role", () => { 
        test("It should return a 200 success code", async () => {
            const u = [new User("user1", "", "", Role.ADMIN, "", "")];
            
            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "getUsersByRole").mockResolvedValueOnce(u);
            // .mockImplementation((role: string) => {
            //     role = Role.ADMIN;
            //     const a : User[] = [];
            //     return new Promise<User[]>((resolve, reject) => {
            //         resolve(a);
            //     });
            // });

            // const response = await request(app).get(baseURL + "/users").send();
            // const response = await request(app).get(baseURL + "/users/roles/Admin");
            const response = await request(app).get(baseURL + "/users/roles/" + Role.ADMIN);
            expect(response.status).toBe(200);
            expect(UserController.prototype.getUsersByRole).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.getUsersByRole).toHaveBeenCalledWith(Role.ADMIN);            
        });
    });

    describe("GET ezelectronics/users/:username", () => { 
        test("It should return a 200 success code", async () => {
            const u = new User("user1", "user1", "", Role.CUSTOMER, "", "");
            
            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "getUserByUsername").mockResolvedValueOnce(u);

            const response = await request(app).get(baseURL + "/users/" + u.username);
            expect(response.status).toBe(200);
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledWith(undefined, u.username);
            // expect(UserController.prototype.getUserByUsername).toHaveBeenCalledWith(u, u.username);
        });

        test("It should return a 404 error code", async () => {
            const u = new User("user1", "", "", Role.ADMIN, "", "");
            const username2 = "user2";

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "getUserByUsername").mockRejectedValueOnce(new UserNotFoundError());

            const response = await request(app).get(baseURL + "/users/" + username2);
            expect(response.status).toBe(404);
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledWith(undefined, username2);
            // expect(response).toEqual();
        });

        test("It should return a 401 error code", async () => {
            const u = new User("user1", "", "", Role.CUSTOMER, "", "");
            const username2 = "user2"

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "getUserByUsername").mockRejectedValueOnce(new UnauthorizedUserError());

            const response = await request(app).get(baseURL + "/users/" + username2);
            expect(response.status).toBe(401);
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledWith(undefined, username2);
            // expect(response).toEqual();
        });
    });

    describe("DELETE ezelectronics/users/:username", () => { 
        test("It should return a 200 success code", async () => {
            const u = new User("user1", "user1", "", Role.CUSTOMER, "", "");
            
            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "deleteUser").mockResolvedValueOnce(true);

            const response = await request(app).delete(baseURL + "/users/" + u.username);
            expect(response.status).toBe(200);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledWith(undefined, u.username);
            // expect(response).toEqual();
        });

        test("It should return a 404 error code", async () => {
            const u = new User("user1", "", "", Role.ADMIN, "", "");
            const username2 = "user2";

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "deleteUser").mockRejectedValueOnce(new UserNotFoundError());

            const response = await request(app).delete(baseURL + "/users/" + username2);
            expect(response.status).toBe(404);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledWith(undefined, username2);
            // expect(response).toEqual();
        });

        test("It should return a 401 error code", async () => {
            const u = new User("user1", "", "", Role.CUSTOMER, "", "");
            const username2 = "user2"

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "deleteUser").mockRejectedValueOnce(new UnauthorizedUserError());

            const response = await request(app).delete(baseURL + "/users/" + username2);
            expect(response.status).toBe(401);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledWith(undefined, username2);
            // expect(response).toEqual();
        });

        test("It should return a 401 error code", async () => {
            const u = new User("user1", "", "", Role.ADMIN, "", "");
            const username2 = "user2"

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "deleteUser").mockRejectedValueOnce(new UnauthorizedUserError());

            const response = await request(app).delete(baseURL + "/users/" + username2);
            expect(response.status).toBe(401);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.deleteUser).toHaveBeenCalledWith(undefined, username2);
            // expect(response).toEqual();
        });
    });

    describe("DELETE ezelectronics/users", () => { 
        test("It should return a 200 success code", async () => {
            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isIn: () => ({}) }),
                })),
            }))

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "deleteAll").mockResolvedValueOnce();

            const response = await request(app).delete(baseURL + "/users/");
            expect(response.status).toBe(200);
            expect(UserController.prototype.deleteAll).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.deleteAll).toHaveBeenCalledWith();
            // expect(response).toEqual();
        });
    });

    describe("PATCH ezelectronics/users/:username", () => {
        test("It should return a 200 success code", async () => {
            const inputUsername = "user1"
            const inputUser = {name: "admin", surname: "admin", address: "Corso Duca degli Abruzzi 129, Torino", birthdate: "1970-01-01"}
            const u = new User("user1", "admin", "admin", Role.MANAGER, "Corso Duca degli Abruzzi 129, Torino", "1970-01-01")

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "updateUserInfo").mockResolvedValueOnce(u);

            const response = await request(app).patch(baseURL + "/users/" + inputUsername).send(inputUser);
            expect(response.status).toBe(200)
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledWith(undefined, inputUser.name, inputUser.surname, inputUser.address, inputUser.birthdate, inputUsername)
        });
        
        test("It should return a 404 error code", async () => {
            const inputUsername = "user3"
            const inputUser = {name: "admin", surname: "admin", address: "Corso Duca degli Abruzzi 129, Torino", birthdate: "1970-01-01"}
            const u = new User("user1", "admin", "admin", Role.MANAGER, "Corso Duca degli Abruzzi 129, Torino", "1970-01-01")

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "updateUserInfo").mockRejectedValueOnce(new UserNotFoundError());

            const response = await request(app).patch(baseURL + "/users/" + inputUsername).send(inputUser);
            expect(response.status).toBe(404);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledWith(undefined, inputUser.name, inputUser.surname, inputUser.address, inputUser.birthdate, inputUsername)
        });

        test("It should return a 401 error code", async () => {
            const inputUsername = "user2"
            const inputUser = {name: "admin", surname: "admin", address: "Corso Duca degli Abruzzi 129, Torino", birthdate: "1970-01-01"}
            const u = new User("user1", "admin", "admin", Role.ADMIN, "Corso Duca degli Abruzzi 129, Torino", "1970-01-01")

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "updateUserInfo").mockRejectedValueOnce(new UnauthorizedUserError());

            const response = await request(app).patch(baseURL + "/users/" + inputUsername).send(inputUser);
            expect(response.status).toBe(401);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledWith(undefined, inputUser.name, inputUser.surname, inputUser.address, inputUser.birthdate, inputUsername)
        });

        test("It should return a 400 error code", async () => {
            const inputUsername = "user1"
            const inputUser = {name: "admin", surname: "admin", address: "Corso Duca degli Abruzzi 129, Torino", birthdate: "2030-01-01"}
            const u = new User("user1", "admin", "admin", Role.MANAGER, "Corso Duca degli Abruzzi 129, Torino", "2030-01-01")

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "updateUserInfo").mockRejectedValueOnce(new DateError());

            const response = await request(app).patch(baseURL + "/users/" + inputUsername).send(inputUser);
            expect(response.status).toBe(400);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledWith(undefined, inputUser.name, inputUser.surname, inputUser.address, inputUser.birthdate, inputUsername)
        });

        test("It should return a 401 error code", async () => {
            const inputUsername = "user2"
            const inputUser = {name: "admin", surname: "admin", address: "Corso Duca degli Abruzzi 129, Torino", birthdate: "1970-01-01"}
            const u = new User("user1", "admin", "admin", Role.CUSTOMER, "Corso Duca degli Abruzzi 129, Torino", "1970-01-01")

            jest.mock('express-validator', () => ({
                body: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => ({ isLength: () => ({}) }),
                })),
            }))
            

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => {
                return next();
            });

            jest.spyOn(UserController.prototype, "updateUserInfo").mockRejectedValueOnce(new UnauthorizedUserError());

            const response = await request(app).patch(baseURL + "/users/" + inputUsername).send(inputUser);
            expect(response.status).toBe(401);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledWith(undefined, inputUser.name, inputUser.surname, inputUser.address, inputUser.birthdate, inputUsername)
        });
    });
});