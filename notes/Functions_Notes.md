#### API general specs

- error 422 - if any constraint on request parameters or request body content not satisfied
- error 401 - if access rule of access constraint not satisfied 
- code 200 - for API response, in case of success
- corresponding error code - for specific error scenarios

#### ACCESS API ####

## POST `ezelectronics/sessions`
## login(username: string, password: string) **DONE in auth.ts**

## DELETE `ezelectronics/sessions/current`
## logout() **DONE**
Performs logout for the currently logged in user.

## GET `ezelectronics/sessions/current`
## getInfoCurrentSession() //put in utilities?
Retrieves information about the currently logged in user.

#### USER ####

## POST `ezelectronics/users`
## createUser(username: string, name: string, surname: string, password: string, role: string) **DONE**
Creates a new user with the provided information.

## GET `ezelectronics/users`
## getAllUsers()
Returns the list of all users.

## GET `ezelectronics/users/role/:role`
## getUsersByRole(role: string)
Returns the list of all users with a specific role.

## GET `ezelectronics/users/:username`
## getUserByUsername(username: string) **DONE**
Returns a single user with a specific username. Admins can see the information of any user, other user types can only see their own information.

## DELETE `ezelectronics/users/:username`
## deleteUserByUsername(username: string)
Deletes a specific user, identified by the username, from the database. Admins can delete any non-Admin user and themselves, but cannot delete other Admins, other user types can only delete themselves.

## DELETE `ezelectronics/users`
## deleteAllUsers()
Deletes all non-Admin users from the database.

## PATCH `ezelectronics/users/:username`
## updateUserInfoByUsername(name: string, surname: string, address: string, birthdate: string, username: string)
Updates the personal information of a single user, identified by the username. Customers and Managers can only update their personal information, Admins can update the information of any non-Admin user. It is possible to change only name, surname, address, and birthdate; role and access information (username, password) cannot be changed (not even by Admins).


# PRODUCTS 

## POST `ezelectronics/products` - DONE & TESTED
## registerFirstArrival (model:string, category:string, quantity: number, details:string, sellingPrice: number, arrivalDate:string )
Registers the arrival of a set of products that have the same model. It can only be used to register the first arrival of a new model (e.g. the first time a shipment of iPhone 13 models arrives in the shop), subsequent arrivals use a different API.


## PATCH `ezelectronics/products/:model` - DONE & TESTED 
## registerQuantityUpdate(model:string, quantity:number, changeDate:string)
Increases the available quantity of a set of products. The API is used when a new shipment of an already registered product arrives in the shop.

## PATCH `ezelectronics/products/:model/sell` - DONE & TESTED
## sellProduct(model:string, sellingDate:string, quantity:number)
Records a product's sale, reducing its quantity in the stock by a specified amount. This API represents a scenario where a Customer purchases a product in the shop and a Manager needs to update the stock at the counter, it is not called after an online purchase through a cart.

## GET `ezelectronics/products` - DONE & TESTED
## getAllProducts(grouping: string, category: string, model: string)
Returns all products present in the database, with optional filtering by either category or model.

## GET `ezelectronics/products/available`- DONE & TESTED
## getAvailableProducts(grouping: string, category: string, model: string) // grouping is optional and can be category or model
Returns all products in the database that are available (their quantity is more than 0), with optional filtering by either category or model.

## DELETE `ezelectronics/:model` - DONE & TESTED
## deleteProductByModel(model:string)
Deletes one product from the database, removing it from the shop and making it not available anymore.

## DELETE `ezelectronics/products` - DONE & TESTED
## deleteAllProducts()
Deletes all products from the database.

#### CART ####

## GET `ezelectronics/carts` DONE & TESTED
## getCurrentCart()
Returns the current cart of the logged in user. The total cost of the cart needs to be equal to the total cost of its products, keeping in mind the quantity of each product. There can be at most one _unpaid_ cart per customer in the database at any moment.

## POST `ezelectronics/carts` DONE & TESTED
## addToCart(model: string)
Adds a product instance, identified by the model, to the current cart of the logged in user. In case there is no information about the current _unpaid_ cart of the user, the information should be inserted in the database, together with the information about the product. In case there is information about the cart, then two scenarios can happen, depending on the product to add: if there is already at least one instance of the product in the cart, its amount is increased by one; if there are no instances of the product in the cart, its information is added. The total cost of the cart should be updated with the cost of the product instance.

## PATCH `ezelectronics/carts` DONE & TESTED
## checkoutCart()
Simulates payment for the current cart of the logged in user. The payment date of the cart is set to the current date, in format **YYYY-MM-DD**. The available quantity of products in the cart is reduced by the specified amount. We assume that payment is always successful, and that an order is handled by the store right after checkout.

## GET `ezelectronics/carts/history`
## getCartHistory() DONE & TESTED
Returns the history of the carts that have been paid for by the current user.
The current cart, if present, is not included in the list.

## DELETE `ezelectronics/carts/products/:model`
## removeProductFromCart(model: string) 
Removes an instance of a product from the current cart of the logged in user, reducing its quantity in the cart by one. The total cost of the cart must be reduced by the cost of one product instance.

## DELETE `ezelectronics/carts/current`
## deleteCurrentCart()
Empties the current cart by deleting all of its products. The total cost of the cart must be set to 0.

## DELETE `ezelectronics/carts`
## deleteAllCarts()
Deletes all existing carts of all users, both current and past.

## GET `ezelectronics/carts/all`
## getAllCarts()
Returns all carts of all users, both current and past.

#### REVIEW ####

## POST `ezelectronics/reviews/:model`
## addReviewToProduct(model: string, score: number, comment: string)
Adds a new review by a single customer to a product. A customer can leave at most one review for each product model. The current date is used as the date for the review, in format **YYYY-MM-DD**.

## GET `ezelectronics/reviews/:model`
## getAllReviews(model: string)
Returns all reviews made for a specific product.

## DELETE `ezelectronics/reviews/:model`
## deleteReviewFromProduct(model: string)
Deletes the review made by the current user for a specific product. It does not allow the deletion of a review made by another user for the product.

## DELETE `ezelectronics/reviews/:model/all`
## deleteAllReviewsFromProduct(model: string)
Deletes all reviews of a specific product.

## DELETE `ezelectronics/reviews`
## deleteAllReviewsFromAllProducts()
Deletes all reviews of all existing products.








































