import { test, expect, jest, afterEach, beforeEach, describe } from "@jest/globals"
import userController from "../../src/controllers/userController"
import UserDAO from "../../src/dao/userDAO"
import { Role, User } from "../../src/components/user"
import { UnauthorizedUserError } from "../../src/errors/userError"

jest.mock("../../src/dao/userDAO")


let UserController: userController;


// Before each test, create a new instance of UserController
beforeEach(() => {
    UserController = new userController();
});

// After each test, clear all mocks to avoid test interdependence
afterEach(() => {
    jest.clearAllMocks();
});

// Define a describe block for grouping related tests
describe("UserController unit tests", () => {
    
    //Example of a unit test for the createUser method of the UserController
    //The test checks if the method returns true when the DAO method returns true
    //The test also expects the DAO method to be called once with the correct parameters
    test("createUser - It should return true if account is successfully created", async () => {
        const testUser = { username: "test", name: "test", surname: "test", password: "test", role: "Manager"}
        jest.spyOn(UserDAO.prototype, "createUser").mockResolvedValueOnce(true); //Mock the createUser method of the DAO

        // const controller = new UserController(); //Create a new instance of the controller
        //Call the createUser method of the controller with the test user object
        const response = await UserController.createUser(testUser.username, testUser.name, testUser.surname, testUser.password, testUser.role);

        //Check if the createUser method of the DAO has been called once with the correct parameters
        expect(UserDAO.prototype.createUser).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.createUser).toHaveBeenCalledWith(testUser.username,
            testUser.name,
            testUser.surname,
            testUser.password,
            testUser.role);
        expect(response).toBe(true); //Check if the response is true
    });

    test("getUsers - It should return an array of Users", async () => {
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testUser2 = new User("test2", "Test2", "User2", Role.CUSTOMER, "", "");

        jest.spyOn(UserDAO.prototype, 'getAllUsers').mockResolvedValueOnce([testUser, testUser2]);

        const response = await UserController.getUsers();

        expect(UserDAO.prototype.getAllUsers).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.getAllUsers).toHaveBeenCalled();
        expect(response).toEqual([testUser, testUser2]);
    });

    test("getUsersByRole - It should return an array of Users filtered by the role", async () => {
        const testUser = new User("test1", "Test1", "User1", Role.CUSTOMER, "", "");
        const testUser2 = new User("test2", "Test2", "User2", Role.CUSTOMER, "", "");

        jest.spyOn(UserDAO.prototype, 'getUsersByRole').mockResolvedValueOnce([testUser, testUser2]);

        const response = await UserController.getUsersByRole(Role.CUSTOMER);

        expect(UserDAO.prototype.getUsersByRole).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.getUsersByRole).toHaveBeenCalledWith(Role.CUSTOMER);
        expect(response).toEqual([testUser, testUser2]);
    });

    test("getUserByUsername - It should return a single user with the specified username. - customer case", async () => {
        const customerUser = new User("customer1", "aaa", "bbb", Role.CUSTOMER, "", "");

        jest.spyOn(UserDAO.prototype, 'getUserByUsername').mockResolvedValueOnce(customerUser);

        const response = await UserController.getUserByUsername(customerUser, customerUser.username);

        expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith(customerUser.username);
        expect(response).toEqual(customerUser);
    });

    test("getUserByUsername - It should return a single user with the specified username. - admin case", async () => {
        const adminUser = new User("admin1", "aaa", "bbb", Role.ADMIN, "", "");
        const customerUser = new User("customer1", "zzz", "yyy", Role.CUSTOMER, "", "");

        jest.spyOn(UserDAO.prototype, 'getUserByUsername').mockResolvedValueOnce(customerUser);

        const response = await UserController.getUserByUsername(adminUser, customerUser.username);

        expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith(customerUser.username);
        expect(response).toEqual(customerUser);
    });

    test("getUserByUsername - It should return an UnauthorizedUserError error.", async () => {
        const customerUser1 = new User("customer1", "aaa", "bbb", Role.CUSTOMER, "", "");
        const customerUser2 = new User("customer2", "zzz", "yyy", Role.CUSTOMER, "", "");

        await expect(UserController.getUserByUsername(customerUser1, customerUser2.username)).rejects.toThrow(new UnauthorizedUserError());
        
        expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(0);
    });

    test("deleteUser - It should return true if user is successfully deleted.", async () => {
        const user = new User("customer1", "aaa", "bbb", Role.CUSTOMER, "", "");

        jest.spyOn(UserDAO.prototype, 'deleteUserByUsername').mockResolvedValueOnce(true);

        const response = await UserController.deleteUser(user, user.username);

        expect(UserDAO.prototype.deleteUserByUsername).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.deleteUserByUsername).toHaveBeenCalledWith(user, user.username);
        expect(response).toEqual(true);
    });

    test("deleteAll - It should delete all users successfully and return nothing.", async () => {

        jest.spyOn(UserDAO.prototype, 'deleteAllUsers').mockResolvedValueOnce();

        const response = await UserController.deleteAll();

        expect(UserDAO.prototype.deleteAllUsers).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.deleteAllUsers).toHaveBeenCalledWith();
    });

    test("updateUserInfo - It should return a single user with updated info.", async () => {
        const old_user = new User("customer1", "aaa", "bbb", Role.CUSTOMER, "Corso Duca, Torino", "");
        const new_user = new User("customer1", "xxx", "yyy", Role.CUSTOMER, "Corso Duca, Torino", "2000-12-25");

        jest.spyOn(UserDAO.prototype, 'updateUserInfoByUsername').mockResolvedValueOnce(new_user);

        const response = await UserController.updateUserInfo(old_user, new_user.name, new_user.surname, new_user.address, new_user.birthdate, old_user.username);

        expect(UserDAO.prototype.updateUserInfoByUsername).toHaveBeenCalledTimes(1);
        expect(UserDAO.prototype.updateUserInfoByUsername).toHaveBeenCalledWith(old_user, new_user.name, new_user.surname, new_user.address, new_user.birthdate, old_user.username);
        // expect(response).toEqual({...new_user}); //Check if the response is true
        expect(response).toEqual(new_user); //Check if the response is true
    });

});