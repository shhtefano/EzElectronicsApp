import { describe, test, expect, beforeAll, afterAll, jest, beforeEach, afterEach } from "@jest/globals"

import UserController from "../../src/controllers/userController"
import UserDAO from "../../src/dao/userDAO"
import crypto from "crypto"
import db from "../../src/db/db"
import { Database } from "sqlite3"
import { Role, User } from "../../src/components/user"
import { UnauthorizedUserError, UserAlreadyExistsError, UserIsAdmin2Error, UserIsAdminError, UserNotFoundError } from "../../src/errors/userError"
import { DateError, Utility } from "../../src/utilities"

jest.mock("crypto")
jest.mock("../../src/db/db.ts")

let userDAO: UserDAO;

beforeEach(() => {
  userDAO = new UserDAO();
});

afterEach(() => {
  jest.clearAllMocks();
});

//Example of unit test for the createUser method
//It mocks the database run method to simulate a successful insertion and the crypto randomBytes and scrypt methods to simulate the hashing of the password
//It then calls the createUser method and expects it to resolve true
describe("UserDAO unit Tests", ()=>{
    describe("createUser", ()=>{
        // implemented by prof
        test("It should create an account and resolve true", async () => {
            const userDAO = new UserDAO()
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null)
                return {} as Database
            });
            const mockRandomBytes = jest.spyOn(crypto, "randomBytes").mockImplementation((size) => {
                return (Buffer.from("salt"))
            })
            // // code by prof, uses crypto.scrypt and async callback ??
            const mockScrypt = jest.spyOn(crypto, "scrypt").mockImplementation(async (password, salt, keylen) => {
                return Buffer.from("hashedPassword")
            })
            // in code of userDAO.ts, the implementation is with crypto.scryptSync and sync callback?
            // const mockScrypt = jest.spyOn(crypto, "scryptSync").mockImplementation((password, salt, keylen) => {
              // return Buffer.from("hashedPassword")
          // })
            const result = await userDAO.createUser("username", "name", "surname", "password", "role")

            expect(result).toBe(true)

            // added by us
            expect(mockRandomBytes).toHaveBeenCalledTimes(1);
            // expect(mockScrypt).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledTimes(1);

            mockRandomBytes.mockRestore()
            mockDBRun.mockRestore()
            mockScrypt.mockRestore()
        });

        // our implementation starts from here onwards
        test("It should reject with UserAlreadyExistsError", async () => {
            const userDAO = new UserDAO();

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                const err = {
                  message: "UNIQUE constraint failed: users.username"
                };
                callback(err);
                return {} as Database;
            });
            const mockRandomBytes = jest.spyOn(crypto, "randomBytes").mockImplementation((size) => {
                return (Buffer.from("salt"));
            });
            const mockScrypt = jest.spyOn(crypto, "scrypt").mockImplementation(async (password, salt, keylen) => {
                return Buffer.from("hashedPassword");
            });

            await expect(userDAO.createUser("username", "name", "surname", "password", "role")).rejects.toThrow(new UserAlreadyExistsError());
            
            expect(mockRandomBytes).toHaveBeenCalledTimes(1);
            // expect(mockScrypt).toHaveBeenCalledTimes(1);
            expect(mockDBRun).toHaveBeenCalledTimes(1);

            mockRandomBytes.mockRestore();
            mockDBRun.mockRestore();
            mockScrypt.mockRestore();
        });

        test("It should reject with DB error", async () => {
          const userDAO = new UserDAO();

          const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
              callback(new Error("DB error"));
              return {} as Database;
          });
          const mockRandomBytes = jest.spyOn(crypto, "randomBytes").mockImplementation((size) => {
              return (Buffer.from("salt"));
          });
          const mockScrypt = jest.spyOn(crypto, "scrypt").mockImplementation(async (password, salt, keylen) => {
              return Buffer.from("hashedPassword");
          });

          await expect(userDAO.createUser("username", "name", "surname", "password", "role")).rejects.toThrow(new Error("DB error"));
          
          expect(mockRandomBytes).toHaveBeenCalledTimes(1);
          // expect(mockScrypt).toHaveBeenCalledTimes(1);
          expect(mockDBRun).toHaveBeenCalledTimes(1);


          mockRandomBytes.mockRestore();
          mockDBRun.mockRestore();
          mockScrypt.mockRestore();
      });
        
    });

    // // !!! describe getIsUserAuthenticated
    // describe("getIsUserAuthenticated", () => {

    // });

    describe("getAllUsers", ()=>{
        test("It should return all users and resolve to an array of User", async () => {
          const ua = [
              new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01"),
              new User("user2", "name2", "surname2", Role.MANAGER, "C.so Duca", "2001-01-02")
          ];
      
          const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
              const rows = [
                  { username: "user1", name: "name1", surname: "surname1", role: Role.ADMIN, address: "C.so Castelfidardo", birthdate: "2000-01-01" },
                  { username: "user2", name: "name2", surname: "surname2", role: Role.MANAGER, address: "C.so Duca", birthdate: "2001-01-02" }
              ];
              callback(null, rows);
              return {} as Database;
          });
      
          const result = await userDAO.getAllUsers();
          expect(result).toEqual(ua);
      
          expect(mockDBAll).toHaveBeenCalledTimes(1);
          expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM users", [], expect.any(Function));
      
          mockDBAll.mockRestore();
        });
      
        test("it should reject with a database error", async () => {
          const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
              callback(new Error("DB error"), null);
              return {} as Database;
          });
      
          await expect(userDAO.getAllUsers()).rejects.toThrow("DB error");
      
          expect(mockDBAll).toHaveBeenCalledTimes(1);
          expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM users", [], expect.any(Function));
      
          mockDBAll.mockRestore();
        });
    });

    describe("getUsersByRole", ()=>{
      test("It should resolve to an array of User with a specific role", async () => {
        const ua = [
            new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01"),
            new User("user2", "name2", "surname2", Role.ADMIN, "C.so Duca", "2001-01-02")
        ];
        const role = Role.ADMIN;
    
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            const rows = [
                { username: "user1", name: "name1", surname: "surname1", role: Role.ADMIN, address: "C.so Castelfidardo", birthdate: "2000-01-01" },
                { username: "user2", name: "name2", surname: "surname2", role: Role.ADMIN, address: "C.so Duca", birthdate: "2001-01-02" }
            ];
            callback(null, rows);
            return {} as Database;
        });
    
        const result = await userDAO.getUsersByRole(role);
        expect(result).toEqual(ua);
    
        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM users WHERE role = ?", [role], expect.any(Function));
    
        mockDBAll.mockRestore();
      });
    
      test("it should reject with a database error", async () => {
        const role = Role.ADMIN

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(new Error("DB error"), null);
            return {} as Database;
        });
    
        // await expect(userDAO.getUsersByRole(role)).rejects.toThrow("DB error");
        await expect(userDAO.getUsersByRole(role)).rejects.toThrow();
    
        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM users WHERE role = ?", [role], expect.any(Function));
    
        mockDBAll.mockRestore();
      });  
    });

    describe("getUserByUsername", ()=>{
      test("It should resolve to User and return specific user informations", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
    
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            const row = { username: "user1", name: "name1", surname: "surname1", role: Role.ADMIN, address: "C.so Castelfidardo", birthdate: "2000-01-01" };
            callback(null, row);
            return {} as Database;
        });
    
        const result = await userDAO.getUserByUsername(u.username);
        expect(result).toEqual(u);
    
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM users WHERE username = ?", [u.username], expect.any(Function));
        expect(mockDBGet).toHaveBeenCalledTimes(1);
    
        mockDBGet.mockRestore();
      });
    
      test("I should reject with a database error", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
    
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(new Error("DB error"), null);
            return {} as Database;
        });
    
        await expect(userDAO.getUserByUsername(u.username)).rejects.toThrow();

        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM users WHERE username = ?", [u.username], expect.any(Function));
    
        mockDBGet.mockRestore();
      }); 
      
      test("It should reject with a UserNotFound error", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
    
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(new UserNotFoundError(), null);
            return {} as Database;
        });
    
        await expect(userDAO.getUserByUsername(u.username)).rejects.toThrow();

        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM users WHERE username = ?", [u.username], expect.any(Function));
    
        mockDBGet.mockRestore();
      }); 
      
    });

    describe("deleteUserByUsername", () => { 
      // user.username == username - ok
      test("It should delete an user successfully and resolve to true (user.username == username)", async () => {
        const u = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
    
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(null);
            return {} as Database;
        });
    
        const result = await userDAO.deleteUserByUsername(u, u.username);
        expect(result).toBe(true);
    
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM users WHERE username = ?", [u.username], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockDBRun.mockRestore();
      });

      
      // user.username == username - generic db error
      test("It should reject with a database error", async () => {
        const u = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
    
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            // callback(new Error("DB error"), null);
            callback(new Error("DB error"));
            return {} as Database;
          });
          
        await expect(userDAO.deleteUserByUsername(u, u.username)).rejects.toThrow();

        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM users WHERE username = ?", [u.username], expect.any(Function));
    
        mockDBRun.mockRestore();
      });

      // user.role == Admin + getUserByUsername -> user.role == Manager or Customer -- ok
      test("It should resolve to true (user.role == \"Admin\", delete a Manager/Customer)", async () => {
        const uc = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const ua = new User("admin", "adminName", "adminSurname", Role.ADMIN, "C.so Duca degli Abruzzi", "1999-01-01");
    
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(null);
            return {} as Database;
        });
    
        const result = await userDAO.deleteUserByUsername(ua, uc.username);
        expect(result).toBe(true);
    
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM users WHERE username = ?", [uc.username], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockDBRun.mockRestore();
      });

      // user.role == Admin + getUserByUsername -> generic db error
      test("It should resolve to true (user.role == \"Admin\", delete a Manager/Customer)", async () => {
        const uc = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const ua = new User("admin", "adminName", "adminSurname", Role.ADMIN, "C.so Duca degli Abruzzi", "1999-01-01");
    
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database;
        });
    
        await expect(userDAO.deleteUserByUsername(ua, uc.username)).rejects.toThrow();
    
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM users WHERE username = ?", [uc.username], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockDBRun.mockRestore();
      });
      
      // user.role == Admin + getUserByUsername -> user.role == Admin - UserIsAdminError
      test("It should reject with UserIsAdminError (user.role == \"Admin\", delete another Admin)", async () => {
        const ua1 = new User("admin1", "adminName1", "adminNurname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
        const ua2 = new User("admin2", "adminName2", "adminSurname2", Role.ADMIN, "C.so Duca degli Abruzzi", "1999-01-01");
    
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(ua2);
    
        await expect(userDAO.deleteUserByUsername(ua1, ua2.username)).rejects.toThrow(new UserIsAdminError());
        expect(mockGetUserByUsername).toHaveBeenCalledWith(ua2.username);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
    
        mockGetUserByUsername.mockRestore();
      });

      // user.role == CUstomer or Manager + getUserByUsername -> user.role == Admin/Manager/Customer != user - UnauthorizedUserError
      test("It should reject with UnauthorizedUserError (user.role == \"Customer\" or \"Manager\", delete Admin/ another Customer/ another Manager)", async () => {
        const uc1 = new User("customer1", "customerName1", "customerSurname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const uc2 = new User("customer2", "customerName2", "customerSurname2", Role.CUSTOMER, "C.so Castelfidardo", "1999-01-01");
    
        await expect(userDAO.deleteUserByUsername(uc1, uc2.username)).rejects.toThrow(new UnauthorizedUserError());
      });

    });

    describe("deleteAllUsers", ()=>{
      // resolve ok
      test("It should delete all users and resolve to void", async () => {
        // const ua = [
        //     new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01"),
        //     new User("user2", "name2", "surname2", Role.CUSTOMER, "C.so Duca", "2001-01-02")
        // ];
    
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(null);
            return {} as Database;
        });
    
        const result = await userDAO.deleteAllUsers();
        expect(result).toBeUndefined();
    
        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM users WHERE role<>'Admin'", [], expect.any(Function));
    
        mockDBRun.mockRestore();
      });
      
      // generic db error
      test("it should reject with a database error", async () => {
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(new Error("DB error"));
            return {} as Database;
        });
    
        await expect(userDAO.deleteAllUsers()).rejects.toThrow();
    
        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM users WHERE role<>'Admin'", [], expect.any(Function));
    
        mockDBRun.mockRestore();
      });  
    });

    describe("updateUserInfoByUsername", () => {
      // user.username == username - ok
      test("It should return all information of a specific user and resolve to true (user.username == username - ok)", async () => {
        const uc = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
    
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            const row = {username: "user1", name: "name1", surname: "surname1", role: Role.CUSTOMER, address: "C.so Castelfidardo", birthdate: "2000-01-01" }
            callback(null, row);
            return {} as Database;
        });
    
        const result = await userDAO.updateUserInfoByUsername(uc, uc.name, uc.surname, uc.address, uc.birthdate, uc.username);
        expect(result).toBe(uc);
        
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(uc.birthdate, null);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(2);
        expect(mockGetUserByUsername).toHaveBeenCalledWith(uc.username);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE users SET name=?, surname=?, address=?, birthdate=? WHERE username = ?", [uc.name, uc.surname, uc.address, uc.birthdate, uc.username], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockCheckDateAfter.mockRestore();
        mockGetUserByUsername.mockRestore();
        mockDBRun.mockRestore();
      });
    
      // checkDateAfter - new DateError
      test("It should reject with a DateError (birhtdate is after current date)", async () => {
        const uc = new User("customer1", "customerName1", "customerSurname1", Role.CUSTOMER, "C.so Castelfidardo", "2030-01-01");
        
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValueOnce(false);
        await expect(userDAO.updateUserInfoByUsername(uc, uc.name, uc.surname, uc.address, uc.birthdate, uc.username)).rejects.toThrow(new DateError());
        
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(uc.birthdate, null);
        mockCheckDateAfter.mockRestore();        
      })

      // user.username == username - db error
      test("It should reject with a db error (user.username == username)", async () => {
        const uc = new User("customer1", "customerName1", "customerSurname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database;
        });

        await expect(userDAO.updateUserInfoByUsername(uc, uc.name, uc.surname, uc.address, uc.birthdate, uc.username)).rejects.toThrow();
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(uc.birthdate, null);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockGetUserByUsername).toHaveBeenCalledWith(uc.username);
        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE users SET name=?, surname=?, address=?, birthdate=? WHERE username = ?",
                                               [uc.name, uc.surname, uc.address, uc.birthdate, uc.username], 
                                               expect.any(Function)
        );
        mockCheckDateAfter.mockRestore();
        mockGetUserByUsername.mockRestore();
        mockDBRun.mockRestore();
      })
      
      // user.role == 'Admin' and getUserByUsername -> user.role == 'Customer' OR 'Manager' - ok
      test("It should resolve to true (user.role == \"Admin\", delete a Manager/Customer)", async () => {
        const uc = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const ua = new User("admin", "adminName", "adminSurname", Role.ADMIN, "C.so Duca degli Abruzzi", "1999-01-01");
    
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            const row = {username: "user1", name: "name1", surname: "surname1", role: Role.CUSTOMER, address: "C.so Castelfidardo", birthdate: "2000-01-01" }
            callback(null, row);
            return {} as Database;
        });
    
        const result = await userDAO.updateUserInfoByUsername(ua, uc.name, uc.surname, uc.address, uc.birthdate, uc.username);
        expect(result).toBe(uc);
        
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(uc.birthdate, null);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(2);
        expect(mockGetUserByUsername).toHaveBeenCalledWith(uc.username);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE users SET name=?, surname=?, address=?, birthdate=? WHERE username = ?", [uc.name, uc.surname, uc.address, uc.birthdate, uc.username], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockCheckDateAfter.mockRestore();
        mockGetUserByUsername.mockRestore();
        mockDBRun.mockRestore();
      });

      // user.role == 'Admin' and getUserByUsername -> user.role == 'Customer' OR 'Manager' - db error
      test("It should resolve to true (user.role == \"Admin\", delete a Manager/Customer)", async () => {
        const uc = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const ua = new User("admin", "adminName", "adminSurname", Role.ADMIN, "C.so Duca degli Abruzzi", "1999-01-01");
    
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database;
        });
    
        await expect(userDAO.updateUserInfoByUsername(ua, uc.name, uc.surname, uc.address, uc.birthdate, uc.username)).rejects.toThrow();
    
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(uc.birthdate, null);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockGetUserByUsername).toHaveBeenCalledWith(uc.username);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE users SET name=?, surname=?, address=?, birthdate=? WHERE username = ?", [uc.name, uc.surname, uc.address, uc.birthdate, uc.username], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);
    
        mockCheckDateAfter.mockRestore();
        mockGetUserByUsername.mockRestore();
        mockDBRun.mockRestore();
      });
      
      // user.role == 'Admin' and getUserByUsername -> user.role == 'Admin' - UserIsAdmin2Error
      test("It should reject with UserIsAdminError (user.role == \"Admin\", delete another Admin)", async () => {
        const ua1 = new User("admin1", "adminName1", "adminNurname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
        const ua2 = new User("admin2", "adminName2", "adminSurname2", Role.ADMIN, "C.so Duca degli Abruzzi", "1999-01-01");
    
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(ua2);
    
        await expect(userDAO.updateUserInfoByUsername(ua1, ua2.name, ua2.surname, ua2.address, ua2.birthdate, ua2.username)).rejects.toThrow(new UserIsAdmin2Error());
        
        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(ua2.birthdate, null);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockGetUserByUsername).toHaveBeenCalledWith(ua2.username);
    
        mockCheckDateAfter.mockRestore();
        mockGetUserByUsername.mockRestore();
      });
      
      // user.role == 'Customer' OR 'Manager' and getUserByUsername -> user.role == 'Admin' OR 'Manager' Or 'Customer' - UnauthorizedUserError
      test("It should reject with UnauthorizedUserError (user.role == \"Customer\" or \"Manager\", delete Admin/ another Customer/ another Manager)", async () => {
        const uc1 = new User("customer1", "customerName1", "customerSurname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const uc2 = new User("customer2", "customerName2", "customerSurname2", Role.CUSTOMER, "C.so Castelfidardo", "1999-01-01");
    
        const mockCheckDateAfter = jest.spyOn(Utility, "checkDateAfter").mockReturnValue(true);
        const mockGetUserByUsername = jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(uc2);
        
        await expect(userDAO.updateUserInfoByUsername(uc1, uc2.name, uc2.surname, uc2.address, uc2.birthdate, uc2.username)).rejects.toThrow(new UnauthorizedUserError());

        expect(mockCheckDateAfter).toHaveBeenCalledTimes(1);
        expect(mockCheckDateAfter).toHaveBeenCalledWith(uc2.birthdate, null);
        expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
        expect(mockGetUserByUsername).toHaveBeenCalledWith(uc2.username);

        mockCheckDateAfter.mockRestore();
        mockGetUserByUsername.mockRestore();
      });
  });  
});