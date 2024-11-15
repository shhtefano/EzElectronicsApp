import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import request from 'supertest'
import express from "express"
import session from 'express-session';
import { Utility } from "../../src/utilities"
import { app } from "../../index";
import Authenticator from "../../src/routers/auth";
import { Role, User } from "../../src/components/user";
import UserDAO from "../../src/dao/userDAO";
const passport = require('passport');

describe("Auth unit Tests", () => {

    let auth: any, req: any, res: any, next: any;
    let userDAO: UserDAO;

    beforeEach(() => {
        req = { isAuthenticated: jest.fn() };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        auth = new Authenticator(app);
        userDAO = new UserDAO();

        jest.clearAllMocks();
    });

    describe("isLoggedIn", () => {
        test("It should call next if user is authenticated", () => {
            req.isAuthenticated.mockReturnValue(true);

            const result = auth.isLoggedIn(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledTimes(0);
        });

        test("It should return 401 if user is not authenticated", () => {
            req.isAuthenticated.mockReturnValue(false);

            const result = auth.isLoggedIn(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "Unauthenticated user", status: 401 });
        });
    });

    describe("isCustomer", () => {
        test("It should call next if user is a customer and is authenticated", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsCustomer = jest.spyOn(Utility, "isCustomer").mockReturnValue(true);

            const result = auth.isCustomer(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsCustomer).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledTimes(0);

            mockIsCustomer.mockRestore();
        });

        test("It should return 401 if user is not authenticated", () => {
            req.isAuthenticated.mockReturnValue(false);
            const mockIsCustomer = jest.spyOn(Utility, "isCustomer").mockReturnValue(true);

            const result = auth.isCustomer(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsCustomer).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not a customer", status: 401 });

            mockIsCustomer.mockRestore();
        });

        test("It should return 401 if user is not a customer", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsCustomer = jest.spyOn(Utility, "isCustomer").mockReturnValue(false);

            const result = auth.isCustomer(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsCustomer).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not a customer", status: 401 });

            mockIsCustomer.mockRestore();
        });
    });

    describe("isManager", () => {
        test("It should call next if user is a manager and is authenticated", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(true);

            const result = auth.isManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsManager).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledTimes(0);

            mockIsManager.mockRestore();
        });

        test("It should return 401 if user is not authenticated", () => {
            req.isAuthenticated.mockReturnValue(false);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(true);

            const result = auth.isManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsManager).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not a manager", status: 401 });

            mockIsManager.mockRestore();
        });

        test("It should return 401 if user is not a manager", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(false);

            const result = auth.isManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsManager).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not a manager", status: 401 });

            mockIsManager.mockRestore();
        });
    });

    describe("isAdmin", () => {
        test("It should call next if user is a admin and is authenticated", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(true);

            const result = auth.isAdmin(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledTimes(0);

            mockIsAdmin.mockRestore();
        });

        test("It should return 401 if user is not authenticated", () => {
            req.isAuthenticated.mockReturnValue(false);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(true);

            const result = auth.isAdmin(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not an admin", status: 401 });

            mockIsAdmin.mockRestore();
        });

        test("It should return 401 if user is not a admin", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(false);

            const result = auth.isAdmin(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not an admin", status: 401 });

            mockIsAdmin.mockRestore();
        });
    });

    describe("isAdminOrManager", () => {
        test("It should call next if user is a admin and is authenticated", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(true);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(false);

            const result = auth.isAdminOrManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(1);
            expect(mockIsManager).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledTimes(0);

            mockIsAdmin.mockRestore();
            mockIsManager.mockRestore();
        });

        test("It should call next if user is a manager and is authenticated", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(false);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(true);

            const result = auth.isAdminOrManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(1);
            expect(mockIsManager).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(0);
            expect(res.json).toHaveBeenCalledTimes(0);

            mockIsAdmin.mockRestore();
            mockIsManager.mockRestore();
        });

        test("It should return 401 if user is not authenticated", () => {
            req.isAuthenticated.mockReturnValue(false);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(true);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(false);

            const result = auth.isAdminOrManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(0);
            expect(mockIsManager).toHaveBeenCalledTimes(0);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not an admin or manager", status: 401 });

            mockIsAdmin.mockRestore();
            mockIsManager.mockRestore();
        });

        test("It should return 401 if user is not a admin or a manager", () => {
            req.isAuthenticated.mockReturnValue(true);
            const mockIsAdmin = jest.spyOn(Utility, "isAdmin").mockReturnValue(false);
            const mockIsManager = jest.spyOn(Utility, "isManager").mockReturnValue(false);

            const result = auth.isAdminOrManager(req, res, next);
            expect(result).toBeUndefined();

            expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
            expect(mockIsAdmin).toHaveBeenCalledTimes(1);
            expect(mockIsManager).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(0);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "User is not an admin or manager", status: 401 });

            mockIsAdmin.mockRestore();
            mockIsManager.mockRestore();
        });
    });
});