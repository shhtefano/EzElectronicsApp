# Notes for EzElectronics part 1

## Introduction

Development of a web app called EzElectronics using Typescript and SQLite.

*TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. It is designed for the development of large applications and transpiles to JavaScript. Because TypeScript is a superset of JavaScript, all JavaScript programs are syntactically valid TypeScript, but they can fail to type-check for safety reasons.*

## Components
+ Cart.ts
  + Representation of a shopping cart. 
  + ID: Unique identifier of the cart.
  + Customer: Username of the customer who own the cart.
  + Paid: A boolean valure indicating whether the cart has been paid.
  + PaymentDate: The date the cart was paid for. Otherwise it will be null.
  + Total: The total amount of the cart. 
  + Products: The products in the cart. This is represented as an array of Product components.

+ Product.ts
  + Representation of a product offered by the online store.
  + Code: Product code. Every product code is unique.
  + sellingPrice: Selling price of the product.
  + Model: Type of the product.
  + Category: It can be one of the following: "Smartphone", "Laptop", "Appliance".
  + arrivalDate: Arrival date of the product at the store.
  + sellingDate: Selling date of the product, is null if the product has not been sold yet.
  + Details: Additional details about the product, can be null.
  
+ User.ts
  + Represents a user in the system.
  + Username: Username which is unique for each user.
  + Name
  + Surname
  + Role: This can be "Manager" or "Customer".

## Controllers
+ cartController.ts
  + Represents a controller for managing shopping carts. It is linked with CartDao class to manage database transactions regarding carts.
  + Functions
  + **getCart(user)**: Returns the cart for a specific user.
  + **addToCart(user, productId)**: Adds a new product to the cart.
  + **checkoutCart(user)**: Checks out the user's cart.
  + **getCustomerCarts(user)**: Retrieves all carts for a specific customer. 
  + **removeFromCart(user, productId, cartId)**: Removes a product from the user's cart.
  + **deleteCart(user, cartId)**: Deletes a specific cart.
  + **deleteAllCarts()**: Deletes all carts.

+ productController.ts
  + Represents a controller for managing products. It is linked with ProductDao class to manage database transactions regarding products.
  + **registerArrival()**
  + **registerProduct()**
  + **sellProduct()**
  + **getProducts()**
  + **getProduct()**
  + **getProductsByCategory()**
  + **getProductsByModel()**
  + **deleteAllProducts()**
  + **deleteProduct()**

+ userController.ts
  + Represents a controller for managing users. It is linked with userDao class to manage database transactions regarding users.
  + **createUser()**
  + **getUsers()**
  + **getUsersByRole()**
  + **getUserByUsername()**
  + **deleteUser()**
  + **deleteAll()**

## DAO  
Represents the intermediator between controllers and database. The database used in this project is sqlite3. The source code can be found in *db.ts*. In this file there is the inizialitation of connection to the database. In the dao folder functions are handled by:

+ cartDao.ts
All the function in cartController must be implemented also in cartDao.ts. 

+ productDao.ts
All the function in productController must be implemented also in productDao.ts. 

+ userDao.ts
All the function in productController must be implemented also in productDao.ts. 
  + getIsUserAuthenticated(): a function that return true or false if the user is authenticated.
  + getUserByUsername(): a function that returns User object based on the username.
  

## Errors
These file will handle the error of cart, product and user transaction. 

+ cartError.ts
  + CartNotFoundError
  + ProductInCartError
  + ProductNotInCartError
  + WrongUserCartError

+ productError.ts
  + ProductNotFoundError
  + ProductAlreadyExistsError
  + ProductSoldError

+ userError.ts
  + UserNotFoundError
  + UserNotManagerError
  + UserNotCustomerError

## Router
Routes.ts represents a class that defines the routes for handling authentication. It is used to protect the routes by requiring users to be logged in. It is also used to protect routes by requiring users to have the correct role.

*Morgan is an HTTP request level Middleware. It is a great tool that logs the requests along with some other information depending upon its configuration and the preset used. It proves to be very helpful while debugging and also if you want to create Log files*

