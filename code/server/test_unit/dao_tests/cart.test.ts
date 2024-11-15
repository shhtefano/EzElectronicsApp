import { describe, test, expect, beforeAll, afterAll, jest, beforeEach, afterEach } from "@jest/globals"

import CartDAO from "../../src/dao/cartDAO"

import db from "../../src/db/db"
import { Database } from "sqlite3"
import { ProductInCart, Cart } from "../../src/components/cart"
import { Utility } from "../../src/utilities"
import { Category, Product } from "../../src/components/product"
import { CartNotFoundError, EmptyCartError } from "../../src/errors/cartError"
import { Role, User } from "../../src/components/user"
import { EmptyProductStockError, ProductNotFoundError } from "../../src/errors/productError"
import dayjs from "dayjs"

jest.mock("../../src/db/db.ts")

let cartDAO: CartDAO;

beforeEach(() => {
  cartDAO = new CartDAO();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("CartDAO unit Tests", () => {

  // OLD - START
    // describe("getCart", () => {
    //     test("It should create a cart instance in the database and resolve to a Cart (cart exists)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const c = new Cart(1, "customer1", false, "", 5, [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)])

    //       const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
    //         const res: ProductInCart[] = [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)];
    //         const row = { cartId: 1, username: "customer1", paid: false, paymentDate: "", total: 5, products: res }
            
    //         callback(null, row);
    //         return {} as Database;
    //       });
    //       const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
    //         const res: ProductInCart[] = [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)];
    //         callback(null, res);
    //         return {} as Database;
    //       });

    //       const result = await cartDAO.getCart(u);
    //       expect(result).toEqual(c);

    //       expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
    //       expect(mockDBGet).toHaveBeenCalledTimes(1);
    //       expect(mockDBAll).toHaveBeenCalledWith("SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?", [c.cart_id], expect.any(Function));
    //       expect(mockDBAll).toHaveBeenCalledTimes(1);
          
    //       mockDBGet.mockRestore();
    //       mockDBAll.mockRestore();
    //     });

    //     test("It should resolve to Cart (cart does not exist)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const c = new Cart(2, "customer1", false, "", 0, [])
    //       const res : ProductInCart[] = []
    //       const cu = { cart_id: 2, username: "customer1", customer: "customer1", paid: false, paymentDate: "", total: 0, products: res }

    //       const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
    //         callback(null);
    //         return {} as Database;
    //       });
    //       const mockCreateCart = jest.spyOn(cartDAO, "createCart").mockResolvedValue(cu);

    //       const result = await cartDAO.getCart(u);
    //       expect(result).toEqual(c);
          
    //       expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
    //       expect(mockDBGet).toHaveBeenCalledTimes(1);
    //       expect(mockCreateCart).toHaveBeenCalledWith(u);
    //       expect(mockCreateCart).toHaveBeenCalledTimes(1);
          
    //       mockCreateCart.mockRestore();
    //       mockDBGet.mockRestore();
    //     });

    //     test("It should resolve to DB error (checking cart)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")

    //       const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {            
    //         callback(new Error("DB error"));
    //         return {} as Database;
    //       });

    //       await expect(cartDAO.getCart(u)).rejects.toThrow();

    //       expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
    //       expect(mockDBGet).toHaveBeenCalledTimes(1);
          
    //       mockDBGet.mockRestore();
    //     });
        
    //     test("It should resolve to DB error (checking products of cart)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const c = new Cart(1, "customer1", false, "", 5, [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)])

    //       const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
    //         const res: ProductInCart[] = [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)];
    //         const row = { cartId: 1, username: "customer1", paid: false, paymentDate: "", total: 5, products: res }
            
    //         callback(null, row);
    //         return {} as Database;
    //       });
    //       const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
    //         callback(new Error("DB error"));
    //         return {} as Database;
    //       });

    //       await expect(cartDAO.getCart(u)).rejects.toThrow();

    //       expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
    //       expect(mockDBGet).toHaveBeenCalledTimes(1);
    //       expect(mockDBAll).toHaveBeenCalledWith("SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?", [c.cart_id], expect.any(Function));
    //       expect(mockDBAll).toHaveBeenCalledTimes(1);
          
    //       mockDBGet.mockRestore();
    //       mockDBAll.mockRestore();
    //     });

    //     test("It should resolve to DB error (creating new cart)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const c = new Cart(2, "customer1", false, "", 0, [])

    //       const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
    //         callback(null);
    //         return {} as Database;
    //       });
    //       const mockCreateCart = jest.spyOn(cartDAO, "createCart").mockRejectedValue(new Error("DB error"));

    //       await expect(cartDAO.getCart(u)).rejects.toThrow();

    //       expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
    //       expect(mockDBGet).toHaveBeenCalledTimes(1);
    //       expect(mockCreateCart).toHaveBeenCalledWith(u);
    //       expect(mockCreateCart).toHaveBeenCalledTimes(1);
          
    //       mockCreateCart.mockRestore();
    //       mockDBGet.mockRestore();
    //     });
    // });
    // OLD - END

    describe("getCart", () => {
      // db.get - ok, getCartId - ok
      test("It should resolve to empty cart obj (cart does not exist)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "customer1", false, "", 0, [])

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(null, undefined);
          return {} as Database;
        });

        const mockGetCartID = jest.spyOn(cartDAO, "getCartID").mockResolvedValue(1);

        const result = await cartDAO.getCart(u);
        expect(result).toEqual(c);

        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockGetCartID).toHaveBeenCalledWith();
        expect(mockGetCartID).toHaveBeenCalledTimes(1);
        
        mockDBGet.mockRestore();
        mockGetCartID.mockRestore();
     });

      // db.get - ok, getCartId - DB error
      test("It should reject with DB error when trying to create empty cart (cart does not exist)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(null, undefined);
          return {} as Database;
        });

        const mockGetCartID = jest.spyOn(cartDAO, "getCartID").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.getCart(u)).rejects.toThrow(new Error("DB error"));

        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockGetCartID).toHaveBeenCalledWith();
        expect(mockGetCartID).toHaveBeenCalledTimes(1);
        
        mockDBGet.mockRestore();
        mockGetCartID.mockRestore();
      });

      // db.get - ok, getCartProducts - ok
      test("It should resolve to non-empty cart obj (cart exists)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const p = [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)];
        const c = new Cart(1, "customer1", false, "", 5, p);
        const row = {cartId:1, username: "customer1", paid: false, paymentDate: "", total: 5};

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(null, row);
          return {} as Database;
        });

        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockResolvedValue(p);

        const result = await cartDAO.getCart(u);
        expect(result).toEqual(c);

        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(row.cartId);
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        
        mockDBGet.mockRestore();
        mockGetCartProducts.mockRestore();
     });

      // db.get - ok, getCartProducts - error
      test("It should reject with DB error when trying to retrive a non-empty cart obj (cart exists)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const p = [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)];
        const c = new Cart(1, "customer1", false, "", 5, p);
        const row = {cartId:1, username: "customer1", paid: false, paymentDate: "", total: 5};

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(null, row);
          return {} as Database;
        });

        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.getCart(u)).rejects.toThrow(new Error("DB error"));

        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(row.cartId);
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        
        mockDBGet.mockRestore();
        mockGetCartProducts.mockRestore();
     });

      // db.get - db error
      test("It should reject with DB error when trying to retrive a cart obj", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const p = [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)];
        const c = new Cart(1, "customer1", false, "", 5, p);
        const row = {cartId:1, username: "customer1", paid: false, paymentDate: "", total: 5};

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database;
        });

        await expect(cartDAO.getCart(u)).rejects.toThrow(new Error("DB error"));

        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        
        mockDBGet.mockRestore();
     });
      
    });

  // OLD - START
    // describe("addToCart", () => {
    //     test("It should add a product into the current cart of the logged in customer and resolve to Boolean (updating existing row)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
    //       const c = new Cart(2, "customer1", false, "", 15, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)])
    //       const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
    //       const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
    //         callback(null);
    //         return {} as Database;
    //       });

    //       const result = await cartDAO.addToCart(u, p.model);
    //       expect(result).toBe(true);

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
    //         [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledTimes(2);

    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //       mockDBRun.mockRestore();
    //     });

    //     test("It should resolve to Boolean (inserting a new row)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
    //       const c = new Cart(2, "customer1", false, "", 0, [])
    //       const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
    //       const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
    //         callback(null);
    //         return {} as Database;
    //       });

    //       const result = await cartDAO.addToCart(u, p.model);
    //       expect(result).toBe(true);

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
    //       expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)",
    //          [c.cart_id, p.model, 1], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledTimes(2);

    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //       mockDBRun.mockRestore();
    //     });

    //     test("It should resolve to DB error (getting cart)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = "product1"
    //       const c = new Cart(2, "customer1", false, "", 0, [])

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockRejectedValue(new Error("DB error"));

    //       await expect(cartDAO.addToCart(u, p)).rejects.toThrow();

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
          
    //       mockGetCart.mockRestore();
    //     });

    //     test("It should resolve to DB error (checking product existing)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = "product1"
    //       const c = new Cart(2, "customer1", false, "", 0, [])

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));

    //       await expect(cartDAO.addToCart(u, p)).rejects.toThrow();

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
          
    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //     });

    //     test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = "product1"
    //       const c = new Cart(2, "customer1", false, "", 0, [])

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());

    //       await expect(cartDAO.addToCart(u, p)).rejects.toThrow();

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
          
    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //     });

    //     test("It should resolve to EmptyProductStockError (checking product quantity)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 0)
    //       const c = new Cart(2, "customer1", false, "", 0, [])

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);

    //       await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow(new EmptyProductStockError());

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
          
    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //     });

    //     test("It should resolve to DB error (updating cart_content table)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
    //       const c = new Cart(2, "customer1", false, "", 0, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)])

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
    //       const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
    //         callback(new Error("DB error"));
    //         return {} as Database;
    //       });

    //       await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow();

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
    //          [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledTimes(1);

    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //       mockDBRun.mockRestore();
    //     });

    //     test("It should resolve to DB error (inserting in cart_content table)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
    //       const c = new Cart(2, "customer1", false, "", 0, [])

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
    //       const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
    //         callback(new Error("DB error"));
    //         return {} as Database;
    //       });

    //       await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow();

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
    //       expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)",
    //          [c.cart_id, p.model, 1], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledTimes(1);

    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //       mockDBRun.mockRestore();
    //     });

    //     test("It should resolve to DB error (updating cart table after updating cart_content table)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
    //       const c = new Cart(2, "customer1", false, "", 15, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)])
    //       const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
    //       const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
    //         if (sql === "UPDATE cart SET total = ? WHERE cartId = ?") {
    //           callback(new Error("DB error"));
    //         } else {
    //           callback(null);
    //         }
    //         return {} as Database;
    //       });

    //       await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow("DB error");

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
    //          [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledTimes(2);
          
    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //       mockDBRun.mockRestore();
    //     });

    //     test("It should resolve to DB error (updating cart table after inserting in cart_content table)", async () => {
    //       const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
    //       const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
    //       const c = new Cart(2, "customer1", false, "", 0, [])
    //       const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

    //       const mockGetCart = jest.spyOn(cartDAO, "getCart").mockResolvedValue(c);
    //       const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
    //       const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
    //         if (sql === "UPDATE cart SET total = ? WHERE cartId = ?") {
    //           callback(new Error("DB error"))
    //         } else {
    //           callback(null)
    //         }
    //         return {} as Database;
    //       });

    //       await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow();

    //       expect(mockGetCart).toHaveBeenCalledWith(u);
    //       expect(mockGetCart).toHaveBeenCalledTimes(1);
    //       expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
    //       expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
    //       expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)",
    //          [c.cart_id, p.model, 1], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
    //       expect(mockDBRun).toHaveBeenCalledTimes(2);

    //       mockGetCart.mockRestore();
    //       mockCheckProductExists.mockRestore();
    //       mockDBRun.mockRestore();
    //     });
    // });
    // OLD - END

    describe("addToCart", () => { 
      // new
      // getCurrentCart - db error
      test("It should reject with DB error when retrieving current cart of user", async () => {
        const u = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const p = "product1";
        
        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new Error("DB error"));
        
        await expect(cartDAO.addToCart(u, p)).rejects.toThrow(new Error("DB error"));
        
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        
        mockGetCurrentCart.mockRestore();
      });

      // getCurrentCart - error CartNotFoundError, createCart - db error
      test("It should reject with DB error when creating current cart of user", async () => {
        const u = new User("user1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const p = "product1";
        
        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new CartNotFoundError);
        const mockCreateCart = jest.spyOn(cartDAO, "createCart").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.addToCart(u, p)).rejects.toThrow(new Error("DB error"));
        
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCreateCart).toHaveBeenCalledWith(u);
        expect(mockCreateCart).toHaveBeenCalledTimes(1);
        
        mockGetCurrentCart.mockRestore();
      });

      // getCurrentCart - ok, go on - ok
       test("It should add a product into the current cart (already existing) of the logged in customer and resolve to Boolean (updating existing row)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 15, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)]);
        const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);

        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

        const result = await cartDAO.addToCart(u, p.model);
        expect(result).toBe(true);

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
          [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });
                   
      // getCurrentCart - error CartNotFoundError, createCart - ok, go on - ok
      test("It should add a product into the current cart (not existing yet) of the logged in customer and resolve to Boolean (updating existing row)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01");
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 15, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)]);
        const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new CartNotFoundError);
        const mockCreateCart = jest.spyOn(cartDAO, "createCart").mockResolvedValue(c);

        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

        const result = await cartDAO.addToCart(u, p.model);
        expect(result).toBe(true);

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCreateCart).toHaveBeenCalledWith(u);
        expect(mockCreateCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
          [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCreateCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      // corrected
      test("It should add a product into the current cart of the logged in customer and resolve to Boolean (updating existing row)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 15, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)])
        const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

        const result = await cartDAO.addToCart(u, p.model);
        expect(result).toBe(true);

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
          [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to Boolean (inserting a new row)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 0, [])
        const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(null);
          return {} as Database;
        });

        const result = await cartDAO.addToCart(u, p.model);
        expect(result).toBe(true);

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)",
            [c.cart_id, p.model, 1], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (checking product existing)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = "product1"
        const c = new Cart(2, "customer1", false, "", 0, [])

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.addToCart(u, p)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        
        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
      });

      test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = "product1"
        const c = new Cart(2, "customer1", false, "", 0, [])

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());

        await expect(cartDAO.addToCart(u, p)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        
        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
      });
  
      test("It should resolve to EmptyProductStockError (checking product quantity)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 0)
        const c = new Cart(2, "customer1", false, "", 0, [])

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);

        await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow(new EmptyProductStockError());

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        
        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
      });

      test("It should resolve to DB error (updating cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 0, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)])

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database;
        });

        await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
            [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (inserting in cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 0, [])

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database;
        });

        await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)",
            [c.cart_id, p.model, 1], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating cart table after updating cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 15, [new ProductInCart(2, "product1", 1, Category.LAPTOP, 15)])
        const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (sql === "UPDATE cart SET total = ? WHERE cartId = ?") {
            callback(new Error("DB error"));
          } else {
            callback(null);
          }
          return {} as Database;
        });

        await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow("DB error");

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId = ? AND model = ? ",
            [c.products[0].quantity+1, c.products[0].cart_id, c.products[0].model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);
        
        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating cart table after inserting in cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(15, "product1", Category.LAPTOP, "2024-05-05", "", 2)
        const c = new Cart(2, "customer1", false, "", 0, [])
        const new_total = Number((Number(c.total.toFixed(2)) + Number(p.sellingPrice.toFixed(2))).toFixed(2));

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (sql === "UPDATE cart SET total = ? WHERE cartId = ?") {
            callback(new Error("DB error"))
          } else {
            callback(null)
          }
          return {} as Database;
        });

        await expect(cartDAO.addToCart(u, p.model)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart_content (cartId, model, quantity) VALUES (?, ?, ?)",
            [c.cart_id, p.model, 1], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total = ? WHERE cartId = ?", [new_total, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });
    });

    // corrected, commented lines - old ones, below new ones
    describe("createCart", () => {
      test("It should create an instance of cart in database and resolve to a Cart object", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const cart_id = 1;
        // const c = new Cart(cart_id, u.username, false, null, 0, null);
        const c = new Cart(cart_id, u.username, false, null, 0, []);

        const mockGetCartID = jest.spyOn(cartDAO, "getCartID").mockResolvedValue(cart_id);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          const payment: string | null = null
          // const res: ProductInCart[] | null = null
          const res: ProductInCart[] | null = []
          const ca = {cart_id: cart_id, customer: "customer1", paid: false, paymentDate: payment, products: res, total: 0}
          callback(null, ca);
          return {} as Database
        });

        const result = await cartDAO.createCart(u);
        expect(result).toEqual(c);

        expect(mockGetCartID).toHaveBeenCalledTimes(1);
        expect(mockGetCartID).toHaveBeenCalledWith();
        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart(cartId, username, total, paymentDate, paid) VALUES(?, ?, ?, ?, ?)",
          [cart_id, u.username, 0, null, 0], expect.any(Function));

        mockDBRun.mockRestore();
        mockGetCartID.mockRestore();
      });

      test("It should resolve to DB error (getting cartID)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const cart_id = 1;
        // const c = new Cart(cart_id, u.username, false, null, 0, null);
        const c = new Cart(cart_id, u.username, false, null, 0, []);

        const mockGetCartID = jest.spyOn(cartDAO, "getCartID").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.createCart(u)).rejects.toThrow();

        expect(mockGetCartID).toHaveBeenCalledTimes(1);
        expect(mockGetCartID).toHaveBeenCalledWith();

        mockGetCartID.mockRestore();
      });

      test("It should resolve to DB error (creating new cart)", async () => {
        const u = new User("customer1", "name1", "surname1", Role.CUSTOMER, "C.so Castelfidardo", "2000-01-01")
        const cart_id = 1;
        // const c = new Cart(cart_id, u.username, false, null, 0, null);
        const c = new Cart(cart_id, u.username, false, null, 0, []);

        const mockGetCartID = jest.spyOn(cartDAO, "getCartID").mockResolvedValue(cart_id);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"));
          return {} as Database
        });

        await expect(cartDAO.createCart(u)).rejects.toThrow();

        expect(mockGetCartID).toHaveBeenCalledTimes(1);
        expect(mockGetCartID).toHaveBeenCalledWith();
        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO cart(cartId, username, total, paymentDate, paid) VALUES(?, ?, ?, ?, ?)",
          [cart_id, u.username, 0, null, 0], expect.any(Function));

        mockDBRun.mockRestore();
        mockGetCartID.mockRestore();
      });
    });

    describe("getCartID", () => {
      test("It should resolve to number", async () => {
        const curID = {max: 2};
        const newID = 3;

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
            callback = params;
            params = [];
          }
          callback(null, curID)
          return {} as Database
        });

        const result = await cartDAO.getCartID();
        expect(result).toBe(newID);

        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith('SELECT MAX(cartId) AS max FROM cart', expect.any(Function));

        mockDBGet.mockRestore();
      });

      test("It should resolve to DB error", async () => {
        const curID = 2;
        const newID = 3;

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
            callback = params;
            params = [];
          }
          callback(new Error("DB error"));
          return {} as Database
        });

        await expect(cartDAO.getCartID()).rejects.toThrow();

        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith('SELECT MAX(cartId) AS max FROM cart', expect.any(Function));

        mockDBGet.mockRestore();
      });
    });

    describe("checkoutCart", () => {
      test("It should simulate a payment transaction and mark a cart as paid and resolve to void (single product)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" || sql === "UPDATE product SET quantity = ? WHERE model = ?" ||
               sql === "UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?" ||
               sql === "INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)"||
               sql === "DELETE FROM cart_content WHERE cartId=? AND model=?") {
                callback(null);
            }
            return {} as Database
        });

        const result = await cartDAO.checkoutCart(u);
        expect(result).toBeUndefined();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[0].model, c.products[0].category, c.products[0].price, c.products[0].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?",
          [c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(6);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to void (multiple products)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p1 = new Product(10, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const p2 = new Product(5, "product2", Category.SMARTPHONE, "2020-01-10", "", 5);
        const c = new Cart(1, "username1", false, "", 20, [
          new ProductInCart(1, "product1", 1, Category.LAPTOP, 10),
          new ProductInCart(1, "product2", 2, Category.LAPTOP, 5)
        ]);
        const newQuantity1 = p1.quantity - c.products[0].quantity;
        const newQuantity2 = p2.quantity - c.products[1].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists")
          .mockResolvedValueOnce(p1)
          .mockResolvedValueOnce(p2);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" || sql === "UPDATE product SET quantity = ? WHERE model = ?" ||
               sql === "UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?" ||
               sql === "INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)"||
               sql === "DELETE FROM cart_content WHERE cartId=? AND model=?") {
                callback(null);
            }
            return {} as Database
        });

        const result = await cartDAO.checkoutCart(u);
        expect(result).toBeUndefined();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(2);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p1.model);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p2.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity1, p1.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity2, p2.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[0].model, c.products[0].category, c.products[0].price, c.products[0].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[1].model, c.products[1].category, c.products[1].price, c.products[1].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?",
          [c.cart_id, p1.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?",
          [c.cart_id, p2.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(9);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to CartNotFoundError (getting current cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new CartNotFoundError());

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to DB error (getting current cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to EmptyCartError (checking cart length)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, []);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow(new EmptyCartError());
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to DB error (starting transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "BEGIN TRANSACTION")
              callback(new Error("DB error"))
            else
              callback(null)
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (checking product existing)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new Error("DB error"));
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            callback(null)
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to ProductNotFoundError (checking product existing)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockRejectedValue(new ProductNotFoundError());
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            callback(null)
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to EmptyProductStockError (available product quantity equal to 0)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 0);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            callback(null)
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to LowProductStockError (requested product quantity greater than available product quantity)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 1);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            callback(null)
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(2);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating product table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "UPDATE product SET quantity = ? WHERE model = ?") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(3);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating cart table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (inserting rows in paid_cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[0].model, c.products[0].category, c.products[0].price, c.products[0].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(5);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (deleting rows from cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "DELETE FROM cart_content WHERE cartId=? AND model=?") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[0].model, c.products[0].category, c.products[0].price, c.products[0].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?",
          [c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(6);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (committing transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "COMMIT") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[0].model, c.products[0].category, c.products[0].price, c.products[0].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?",
          [c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(6);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (rollbacking the transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = p.quantity - c.products[0].quantity;
        // const paymentDate = dayjs().format('YYYY-MM-DD').toString();
        const paymentDate = new Date().toISOString().split("T")[0];


        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockCheckProductExists = jest.spyOn(Utility, "checkProductExists").mockResolvedValue(p);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "DELETE FROM cart_content WHERE cartId=? AND model=?" || sql === "ROLLBACK") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.checkoutCart(u)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockCheckProductExists).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockCheckProductExists).toHaveBeenCalledWith(p.model);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE product SET quantity = ? WHERE model = ?", [newQuantity, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET paid = ?, paymentDate = ? WHERE cartId = ?",
          [1, paymentDate, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("INSERT INTO paid_cart_content(cartId, model, category, sellingPrice, quantity) VALUES(?,?,?,?,?)",
          [c.cart_id, c.products[0].model, c.products[0].category, c.products[0].price, c.products[0].quantity], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?",
          [c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(6);

        mockGetCurrentCart.mockRestore();
        mockCheckProductExists.mockRestore();
        mockDBRun.mockRestore();
      });
    });

    describe("getCartHistory", () => {
      test("It should resolve to Cart[]", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const cEmpty = [
          new Cart(1, "username1", true, "2024-06-10", 10, []),
          new Cart(2, "username1", true, "2024-06-05", 5, [])
        ];
        const c1 = new Cart(1, "username1", true, "2024-06-10", 10, [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10),
        ]);
        const c2 = new Cart(2, "username1", true, "2024-06-05", 10, [
          new ProductInCart(2, "product3", 5, Category.LAPTOP, 2),
          new ProductInCart(2, "product2", 3, Category.SMARTPHONE, 10),
        ]);
        const c = [c1, c2];

        const mockGetPaidCarts = jest.spyOn(cartDAO, "getPaidCarts").mockResolvedValue(cEmpty);
        const mockGetCartContent = jest.spyOn(cartDAO, "getCartContent")
          .mockResolvedValueOnce(c1)
          .mockResolvedValueOnce(c2);
        
        const result = await cartDAO.getCartHistory(u);
        expect(result).toEqual(c);

        expect(mockGetPaidCarts).toHaveBeenCalledTimes(1);
        expect(mockGetPaidCarts).toHaveBeenCalledWith(u);
        expect(mockGetCartContent).toHaveBeenCalledWith(cEmpty[0]);
        expect(mockGetCartContent).toHaveBeenCalledWith(cEmpty[1]);
        expect(mockGetCartContent).toHaveBeenCalledTimes(2);

        mockGetPaidCarts.mockRestore();
        mockGetCartContent.mockRestore();
      });

      test("It should resolve to Cart[] (no carts)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const cEmpty: Cart[] = [];
        const c: Cart[] = [];
        const c1 = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetPaidCarts = jest.spyOn(cartDAO, "getPaidCarts").mockResolvedValue(cEmpty);
        const mockGetCartContent = jest.spyOn(cartDAO, "getCartContent").mockResolvedValue(c1);
        
        const result = await cartDAO.getCartHistory(u);
        expect(result).toEqual(c);

        expect(mockGetPaidCarts).toHaveBeenCalledTimes(1);
        expect(mockGetPaidCarts).toHaveBeenCalledWith(u);
        expect(mockGetCartContent).toHaveBeenCalledTimes(0);

        mockGetPaidCarts.mockRestore();
        mockGetCartContent.mockRestore();
      });

      test("It should resolve to DB error (getting cart content)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const cEmpty = [
          new Cart(1, "username1", true, "2024-06-10", 10, []),
          new Cart(1, "username1", true, "2024-06-05", 10, [])
        ];
        const c1 = new Cart(1, "username1", true, "2024-06-10", 10, [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10),
        ]);
        const c2 = new Cart(1, "username1", true, "2024-06-05", 10, [
          new ProductInCart(1, "product3", 5, Category.LAPTOP, 2),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10),
        ]);
        const c = [c1, c2];

        const mockGetPaidCarts = jest.spyOn(cartDAO, "getPaidCarts").mockResolvedValue(cEmpty);
        const mockGetCartContent = jest.spyOn(cartDAO, "getCartContent").mockRejectedValue(new Error("DB error"));
        
        await expect(cartDAO.getCartHistory(u)).rejects.toThrow();

        expect(mockGetPaidCarts).toHaveBeenCalledTimes(1);
        expect(mockGetPaidCarts).toHaveBeenCalledWith(u);
        expect(mockGetCartContent).toHaveBeenCalledTimes(1);
        expect(mockGetCartContent).toHaveBeenCalledWith(cEmpty[0]);

        mockGetPaidCarts.mockRestore();
        mockGetCartContent.mockRestore();
      });

      test("It should resolve to DB error (getting paid carts)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const cEmpty = [
          new Cart(1, "username1", true, "2024-06-10", 10, []),
          new Cart(1, "username1", true, "2024-06-05", 10, [])
        ];
        const c1 = new Cart(1, "username1", true, "2024-06-10", 10, [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10),
        ]);
        const c2 = new Cart(1, "username1", true, "2024-06-05", 10, [
          new ProductInCart(1, "product3", 5, Category.LAPTOP, 2),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10),
        ]);
        const c = [c1, c2];

        const mockGetPaidCarts = jest.spyOn(cartDAO, "getPaidCarts").mockRejectedValue(new Error("DB error"));
        
        await expect(cartDAO.getCartHistory(u)).rejects.toThrow();

        expect(mockGetPaidCarts).toHaveBeenCalledTimes(1);
        expect(mockGetPaidCarts).toHaveBeenCalledWith(u);

        mockGetPaidCarts.mockRestore();
      });
    });

    describe("getPaidCarts", () => {
      test("It should resolve to Cart[]", async () => {
        const u = new User("username1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = [
          new Cart(1, "username1", true, "2024-06-10", 10, []),
          new Cart(2, "username1", true, "2024-06-05", 10, [])
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const p: ProductInCart[] = [];
          const c1 = {cart_id: 1, customer: "username1", paid: true, paymentDate: "2024-06-10", total: 10, products: p}
          const c2 = {cart_id: 2, customer: "username1", paid: true, paymentDate: "2024-06-05", total: 10, products: p}
          const result = [c1, c2]
          callback(null, result)
          return {} as Database
        });

        const result = await cartDAO.getPaidCarts(u);
        expect(result).toEqual(c)

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, paid, paymentDate, total, username as customer FROM cart WHERE username=? AND paid=1", 
          [u.username], expect.any(Function));

        mockDBAll.mockRestore();
      });

      test("It should resolve to Cart[] (no carts)", async () => {
        const u = new User("username1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c: Cart[] = [];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const result: Cart[] = [];
          callback(null, result)
          return {} as Database
        });

        const result = await cartDAO.getPaidCarts(u);
        expect(result).toEqual(c)

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, paid, paymentDate, total, username as customer FROM cart WHERE username=? AND paid=1", 
          [u.username], expect.any(Function));

        mockDBAll.mockRestore();
      });

      test("It should resolve to DB error (getting carts from cart table)", async () => {
        const u = new User("username1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = [
          new Cart(1, "username1", true, "2024-06-10", 10, []),
          new Cart(2, "username1", true, "2024-06-05", 10, [])
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"))
          return {} as Database
        });

        await expect(cartDAO.getPaidCarts(u)).rejects.toThrow();

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, paid, paymentDate, total, username as customer FROM cart WHERE username=? AND paid=1", 
          [u.username], expect.any(Function));

        mockDBAll.mockRestore();
      });
    });

    describe("getCartContent", () => {
      test("It should resolve to Cart", async () => {
        const cEmpty = new Cart(1, "username1", false, null, 10, []);
        const c = new Cart(1, "username1", false, null, 10, [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10)
        ]);

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const p1 = {cart_id: 1, model: "product1", quantity: 2, category: Category.LAPTOP, price: 5}
          const p2 = {cart_id: 1, model: "product2", quantity: 3, category: Category.SMARTPHONE, price: 10}
          const result = [p1, p2]
          callback(null, result)
          return {} as Database
        });

        const result = await cartDAO.getCartContent(cEmpty);
        expect(result).toEqual(c)

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?", 
          [cEmpty.cart_id], expect.any(Function));

        mockDBAll.mockRestore();
      });

      test("It should resolve to EmptyProductStockError (empty cart)", async () => {
        const cEmpty = new Cart(1, "username1", false, null, 10, null);

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(null)
          return {} as Database
        });

        await expect(cartDAO.getCartContent(cEmpty)).rejects.toThrow(new EmptyProductStockError());

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?", 
          [cEmpty.cart_id], expect.any(Function));

        mockDBAll.mockRestore();
      });

      test("It should resolve to DB error (getting rows from paid_cart_content table)", async () => {
        const cEmpty = new Cart(1, "username1", false, null, 10, null);

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"))
          return {} as Database
        });

        await expect(cartDAO.getCartContent(cEmpty)).rejects.toThrow();

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?", 
          [cEmpty.cart_id], expect.any(Function));

        mockDBAll.mockRestore();
      });
    });

    describe("removeProductFromCart", () => {
      test("It should resolve to true (product in cart quantity is decreased)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = c.products[0].quantity - 1;
        const newTotal = c.total - (c.products[0].price);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" || sql === "UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?" ||
               sql === "DELETE FROM cart_content WHERE cartId=? AND model=?" || sql === "UPDATE cart SET total=? WHERE cartId=?") {
                callback(null);
            }
            return {} as Database
        });

        const result = await cartDAO.removeProductFromCart(u, p.model);
        expect(result).toBe(true);
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?", 
          [newQuantity, c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?",
          [newTotal, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to true (product in cart is deleted)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)]);
        const newTotal = c.total - (c.products[0].price);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" || sql === "UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?" ||
               sql === "DELETE FROM cart_content WHERE cartId=? AND model=?" || sql === "UPDATE cart SET total=? WHERE cartId=?") {
                callback(null);
            }
            return {} as Database
        });

        const result = await cartDAO.removeProductFromCart(u, p.model);
        expect(result).toBe(true);
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?", 
          [c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?",
          [newTotal, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (getting cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to CartNotFoundError (getting cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new CartNotFoundError());

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to ProductNotInCartError", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product2", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to DB error (starting transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "BEGIN TRANSACTION") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating rows of cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = c.products[0].quantity - 1;

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?", 
          [newQuantity, c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(3);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (deleting rows from cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 1, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "DELETE FROM cart_content WHERE cartId=? AND model=?") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId=? AND model=?", 
          [c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(3);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating cart table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = c.products[0].quantity - 1;
        const newTotal = c.total - (c.products[0].price);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "UPDATE cart SET total=? WHERE cartId=?") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?", 
          [newQuantity, c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?",
          [newTotal, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (committing transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = c.products[0].quantity - 1;
        const newTotal = c.total - (c.products[0].price);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "COMMIT") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?", 
          [newQuantity, c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?",
          [newTotal, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });
      
      test("It should resolve to DB error (rollbacking transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const p = new Product(5, "product1", Category.LAPTOP, "2024-05-06", "", 10);
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);
        const newQuantity = c.products[0].quantity - 1;
        const newTotal = c.total - (c.products[0].price);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            if (typeof params === "function") {
                callback = params;
                params = [];
            }
            if (sql === "UPDATE cart SET total=? WHERE cartId=?" || sql === "ROLLBACK") {
              callback(new Error("DB error"));
            } else {
              callback(null);
            }
            return {} as Database
        });

        await expect(cartDAO.removeProductFromCart(u, p.model)).rejects.toThrow();
        
        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart_content SET quantity=? WHERE cartId=? AND model=?", 
          [newQuantity, c.cart_id, p.model], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?",
          [newTotal, c.cart_id], expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function));
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });
    });

    describe("clearCart", () => {
      test("It should resolve to true", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
              callback = params;
              params = [];
          }
          if (sql === "BEGIN TRANSACTION" || sql === "COMMIT" ||
             sql === "DELETE FROM cart_content WHERE cartId = ?" || sql === "UPDATE cart SET total=? WHERE cartId=?") {
              callback(null);
          }
          return {} as Database
        });

        const result = await cartDAO.clearCart(u);
        expect(result).toBe(true);

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId = ?", [c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?", [0, c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to CartNotFoundError (getting current cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new CartNotFoundError());

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to DB error (getting current cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);

        mockGetCurrentCart.mockRestore();
      });

      test("It should resolve to DB error (starting transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
              callback = params;
              params = [];
          }
          if (sql === "BEGIN TRANSACTION")
            callback(new Error("DB error"));
          else
            callback(null)
          return {} as Database
        });

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledTimes(1);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (deleting rows from cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
              callback = params;
              params = [];
          }
          if (sql === "DELETE FROM cart_content WHERE cartId = ?")
            callback(new Error("DB error"));
          else
            callback(null)
          return {} as Database
        });

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId = ?", [c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledTimes(3);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (updating cart table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
              callback = params;
              params = [];
          }
          if (sql === "UPDATE cart SET total=? WHERE cartId=?")
            callback(new Error("DB error"));
          else
            callback(null)
          return {} as Database
        });

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId = ?", [c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?", [0, c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (committing transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
              callback = params;
              params = [];
          }
          if (sql === "COMMIT")
            callback(new Error("DB error"));
          else
            callback(null)
          return {} as Database
        });

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId = ?", [c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?", [0, c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("COMMIT", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });

      test("It should resolve to DB error (rollbacking transaction)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01")
        const c = new Cart(1, "username1", false, "", 10, [new ProductInCart(1, "product1", 2, Category.LAPTOP, 5)]);

        const mockGetCurrentCart = jest.spyOn(cartDAO, "getCurrentCart").mockResolvedValue(c);
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
              callback = params;
              params = [];
          }
          if (sql === "UPDATE cart SET total=? WHERE cartId=?" || sql === "ROLLBACK")
            callback(new Error("DB error"));
          else
            callback(null)
          return {} as Database
        });

        await expect(cartDAO.clearCart(u)).rejects.toThrow();

        expect(mockGetCurrentCart).toHaveBeenCalledTimes(1);
        expect(mockGetCurrentCart).toHaveBeenCalledWith(u);
        expect(mockDBRun).toHaveBeenCalledWith("BEGIN TRANSACTION", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart_content WHERE cartId = ?", [c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("UPDATE cart SET total=? WHERE cartId=?", [0, c.cart_id], expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledWith("ROLLBACK", expect.any(Function))
        expect(mockDBRun).toHaveBeenCalledTimes(4);

        mockGetCurrentCart.mockRestore();
        mockDBRun.mockRestore();
      });
    });

    describe("getCurrentCart", () => {
      test("It should resolve to Cart", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
        const c = new Cart(1, "username1", false, null, 10, [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10)
        ]);
        const p = [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10)
        ]

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          const products: ProductInCart[] = []
          const paymentDate: String | null = null
          const result = { cartId: 1, cart_id: 1, username: "username1", customer: "username1", paid: false, paymentDate: paymentDate, details: "", total: 10, products: products};
          callback(null, result)
          return {} as Database
        });
        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockResolvedValue(p);

        const result = await cartDAO.getCurrentCart(u);
        expect(result).toEqual(c);
        
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(c.cart_id);

        mockDBGet.mockRestore();
        mockGetCartProducts.mockRestore();
      });

      test("It should resolve to CartNotFoundError", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(new CartNotFoundError())
          return {} as Database
        });

        await expect(cartDAO.getCurrentCart(u)).rejects.toThrow();
        
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));

        mockDBGet.mockRestore();
      });

      test("It should resolve to DB error (getting cart)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"))
          return {} as Database
        });

        await expect(cartDAO.getCurrentCart(u)).rejects.toThrow();
        
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));

        mockDBGet.mockRestore();
      });

      test("It should resolve to DB error (getting rows from cart_content table)", async () => {
        const u = new User("user1", "name1", "surname1", Role.ADMIN, "C.so Castelfidardo", "2000-01-01");
        const c = new Cart(1, "username1", false, null, 10, [
          new ProductInCart(1, "product1", 2, Category.LAPTOP, 5),
          new ProductInCart(1, "product2", 3, Category.SMARTPHONE, 10)
        ]);

        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
          const products: ProductInCart[] = []
          const paymentDate: String | null = null
          const result = { cartId: 1, cart_id: 1, username: "username1", customer: "username1", paid: false, paymentDate: paymentDate, details: "", total: 10, products: products};
          callback(null, result)
          return {} as Database
        });
        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockRejectedValue(new Error("DB error"));

        await expect(cartDAO.getCurrentCart(u)).rejects.toThrow();
        
        expect(mockDBGet).toHaveBeenCalledTimes(1);
        expect(mockDBGet).toHaveBeenCalledWith("SELECT * FROM cart WHERE username=? AND paid=0", [u.username], expect.any(Function));
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(c.cart_id);

        mockDBGet.mockRestore();
        mockGetCartProducts.mockRestore();
      });
    });

    describe("deleteAllCarts", () => {
      test("It should resolve to void", async () => {
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
            callback = params;
            params = [];
          }
          callback(null)
          return {} as Database
        });
        
        const result = await cartDAO.deleteAllCarts();
        expect(result).toBeUndefined();

        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart", expect.any(Function))
      });

      test("It should resolve to DB error", async () => {
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
          if (typeof params === "function") {
            callback = params;
            params = [];
          }
          callback(new Error("DB error"))
          return {} as Database
        });
        
        await expect(cartDAO.deleteAllCarts()).rejects.toThrow();

        expect(mockDBRun).toHaveBeenCalledTimes(1);
        expect(mockDBRun).toHaveBeenCalledWith("DELETE FROM cart", expect.any(Function))
      });
    });

    describe("getAllCarts", () => {
      // db.all - ok, getCartProducts - ok, getPaidCartProducts - ok
      test("It should resolve to Cart[]", async () => {
        const rows = [{paid: false, paymentDate: "", total: 130, username: "customer1", cartId: 1},
          {paid: true, paymentDate: "2024-06-11", total: 200, username: "customer2", cartId: 2}
        ];

        const productsInCart01 = [{cart_id: 1, model: "product01", quantity: 1, category: Category.LAPTOP, price: 130}];
        const productsInCart02 = [{cart_id: 2, model: "product02", quantity: 1, category: Category.SMARTPHONE, price: 200}];
        const carts = [{cart_id: 1, customer: "customer1", paid: false, paymentDate: "", total: 130, products: productsInCart01},
                  {cart_id: 2, customer: "customer2", paid: true, paymentDate: "2024-06-11", total: 200, products: productsInCart02}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(null, rows);
          return {} as Database;
        });

        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockResolvedValue(productsInCart01);
        const mockGetPaidCartProducts = jest.spyOn(cartDAO, "getPaidCartProducts").mockResolvedValue(productsInCart02);


        const result = await cartDAO.getAllCarts();
        expect(result).toEqual(carts);

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM cart",
                                                [],
                                                expect.any(Function)
        );
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(productsInCart01[0].cart_id);
        expect(mockGetPaidCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetPaidCartProducts).toHaveBeenCalledWith(productsInCart02[0].cart_id);


        mockDBAll.mockRestore();
        mockGetCartProducts.mockRestore();
        mockGetPaidCartProducts.mockRestore();
      });

      // db.all - db error, getCartProducts - ok, getPaidCartProducts - ok
      test("It should reject with DB error when retrieving all carts", async() => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"), null);
          return {} as Database;
        });

        await expect(cartDAO.getAllCarts()).rejects.toThrow(new Error("DB error"));

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM cart",
                                                [],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });
      
      // db.all - [], getCartProducts - ok, getPaidCartProducts - ok
      test("It should resolve to Cart[]", async () => {
        const rows = [{paid: false, paymentDate: "", total: 130, username: "customer1", cartId: 1},
          {paid: true, paymentDate: "2024-06-11", total: 200, username: "customer2", cartId: 2}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(null, []);
          return {} as Database;
        });

        const result = await cartDAO.getAllCarts();
        expect(result).toEqual([]);

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM cart",
                                                [],
                                                expect.any(Function)
        );
        mockDBAll.mockRestore();
        
      });

      // db.all - ok, getCartProducts - db error, getPaidCartProducts - ok
      test("It should resolve to Cart[]", async () => {
        const rows = [{paid: false, paymentDate: "", total: 130, username: "customer1", cartId: 1},
          {paid: true, paymentDate: "2024-06-11", total: 200, username: "customer2", cartId: 2}
        ];

        const productsInCart01 = [{cart_id: 1, model: "product01", quantity: 1, category: Category.LAPTOP, price: 130}];
        const productsInCart02 = [{cart_id: 2, model: "product02", quantity: 1, category: Category.SMARTPHONE, price: 200}];
        const carts = [{cart_id: 1, customer: "customer1", paid: false, paymentDate: "", total: 130, products: productsInCart01},
                  {cart_id: 2, customer: "customer2", paid: true, paymentDate: "2024-06-11", total: 200, products: productsInCart02}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(null, rows);
          return {} as Database;
        });

        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockRejectedValue(new Error("DB error"));
        // const mockGetPaidCartProducts = jest.spyOn(cartDAO, "getPaidCartProducts").mockResolvedValue(productsInCart02);


        await expect(cartDAO.getAllCarts()).rejects.toThrow(new Error("DB error"));

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM cart",
                                                [],
                                                expect.any(Function)
        );
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(productsInCart01[0].cart_id);
        // expect(mockGetPaidCartProducts).toHaveBeenCalledTimes(1);
        // expect(mockGetPaidCartProducts).toHaveBeenCalledWith(productsInCart02[0].cart_id);


        mockDBAll.mockRestore();
        mockGetCartProducts.mockRestore();
        // mockGetPaidCartProducts.mockRestore();
      });


      // db.all - ok, getCartProducts - ok, getPaidCartProducts - db error
      test("It should resolve to Cart[]", async () => {
        const rows = [{paid: false, paymentDate: "", total: 130, username: "customer1", cartId: 1},
          {paid: true, paymentDate: "2024-06-11", total: 200, username: "customer2", cartId: 2}
        ];

        const productsInCart01 = [{cart_id: 1, model: "product01", quantity: 1, category: Category.LAPTOP, price: 130}];
        const productsInCart02 = [{cart_id: 2, model: "product02", quantity: 1, category: Category.SMARTPHONE, price: 200}];
        const carts = [{cart_id: 1, customer: "customer1", paid: false, paymentDate: "", total: 130, products: productsInCart01},
                  {cart_id: 2, customer: "customer2", paid: true, paymentDate: "2024-06-11", total: 200, products: productsInCart02}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(null, rows);
          return {} as Database;
        });

        const mockGetCartProducts = jest.spyOn(cartDAO, "getCartProducts").mockResolvedValue(productsInCart02);
        const mockGetPaidCartProducts = jest.spyOn(cartDAO, "getPaidCartProducts").mockRejectedValue(new Error("DB error"));


        await expect(cartDAO.getAllCarts()).rejects.toThrow(new Error("DB error"));

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT * FROM cart",
                                                [],
                                                expect.any(Function)
        );
        expect(mockGetCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetCartProducts).toHaveBeenCalledWith(productsInCart01[0].cart_id);
        expect(mockGetPaidCartProducts).toHaveBeenCalledTimes(1);
        expect(mockGetPaidCartProducts).toHaveBeenCalledWith(productsInCart02[0].cart_id);


        mockDBAll.mockRestore();
        mockGetCartProducts.mockRestore();
        mockGetPaidCartProducts.mockRestore();

    });
  });


    describe("getCartProducts", () => {
      // db.all - ok
      test("It should resolve to ProductInCart[]", async () => {
        const cartIdVal = 1;
        const productsInCart = [{cart_id: 1, model: "product01", quantity: 2, category: Category.SMARTPHONE, price: 1000 },
                                {cart_id: 1, model: "product02", quantity: 1, category: Category.LAPTOP, price: 750}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const rows = [{cart_id: 1, model: "product01", quantity: 2, category: Category.SMARTPHONE, price: 1000},
                        {cart_id: 1, model: "product02", quantity: 1, category: Category.LAPTOP, price: 750}
          ];
          callback(null, rows);
          return {} as Database;
        });

        const result = await cartDAO.getCartProducts(cartIdVal);
        expect(result).toEqual(productsInCart);

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?",
                                                [cartIdVal],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });

      // db.all - db error
      test("It should reject with DB error", async () => {
        const cartIdVal = 1;

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"), null);
          return {} as Database;
        });

        await expect(cartDAO.getCartProducts(cartIdVal)).rejects.toThrow(new Error("DB error"));

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?",
                                                [cartIdVal],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });

      // db.all - empty array []
      test("It should resolve with an empty array []", async () => {
        const cartIdVal = 1;

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const rows : any[] = [];
          callback(null, rows);
          return {} as Database;
        });

        const result = await cartDAO.getCartProducts(cartIdVal);
        expect(result).toEqual([]);

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT CC.cartId as cart_id, CC.quantity as quantity, CC.model as model, P.category as category, P.sellingPrice as price FROM cart_content CC, product P WHERE CC.model=P.model AND cartId = ?",
                                                [cartIdVal],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });


    });

    describe("getPaidCartProducts", () => {
      // db.all - ok
      test("It should resolve to ProductInCart[]", async () => {
        const cartIdVal = 1;
        const productsInPaidCart = [{cart_id: 1, model: "product01", quantity: 2, category: Category.SMARTPHONE, price: 1000 },
                                    {cart_id: 1, model: "product02", quantity: 1, category: Category.LAPTOP, price: 750}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const rows = [{cart_id: 1, model: "product01", quantity: 2, category: Category.SMARTPHONE, price: 1000},
                        {cart_id: 1, model: "product02", quantity: 1, category: Category.LAPTOP, price: 750}
          ];
          callback(null, rows);
          return {} as Database;
        });

        const result = await cartDAO.getPaidCartProducts(cartIdVal);
        expect(result).toEqual(productsInPaidCart);

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?",
                                                [cartIdVal],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });
    

      // db.all - db error
      test("It should reject with DB error", async () => {
        const cartIdVal = 1;
        const productsInPaidCart = [{cart_id: 1, model: "product01", quantity: 2, category: Category.SMARTPHONE, price: 1000 },
                                    {cart_id: 1, model: "product02", quantity: 1, category: Category.LAPTOP, price: 750}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          callback(new Error("DB error"), null);
          return {} as Database;
        });

        await expect(cartDAO.getPaidCartProducts(cartIdVal)).rejects.toThrow(new Error("DB error"));

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?",
                                                [cartIdVal],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });
      
      // db.all - empty array []
      test("It should resolve with an empty array []", async () => {
        const cartIdVal = 1;
        const productsInPaidCart = [{cart_id: 1, model: "product01", quantity: 2, category: Category.SMARTPHONE, price: 1000 },
                                    {cart_id: 1, model: "product02", quantity: 1, category: Category.LAPTOP, price: 750}
        ];

        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
          const rows : any[] = [];
          callback(null, rows);
          return {} as Database;
        });

        const result = await cartDAO.getPaidCartProducts(cartIdVal);
        expect(result).toEqual([]);

        expect(mockDBAll).toHaveBeenCalledTimes(1);
        expect(mockDBAll).toHaveBeenCalledWith("SELECT cartId as cart_id, model, category, sellingPrice as price, quantity FROM paid_cart_content P WHERE cartId = ?",
                                                [cartIdVal],
                                                expect.any(Function)
        );

        mockDBAll.mockRestore();
      });
    
    });
});
