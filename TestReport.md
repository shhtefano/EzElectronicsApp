# Test Report

<The goal of this document is to explain how the application was tested, detailing how the test cases were defined and what they cover>

# Contents

- [Test Report](#test-report)
- [Contents](#contents)
- [Dependency graph](#dependency-graph)
- [Integration approach](#integration-approach)
- [Tests](#tests)
- [Coverage](#coverage)
  - [Coverage of FR](#coverage-of-fr)
  - [Coverage white box](#coverage-white-box)

# Dependency graph
![](/images/DependencyGraph.png)


# Integration approach

  ### Our group decided to follow a bottom-up approach, starting the development with unit tests. We started from the routes test for each class (user, review, product and cart) and then after fixing all the errors/bugs from unit tests, we moved into integration tests.

- ## STEP 1: Unit testing for routes
- ### STEP 1.1: Unit testing for user routes
- ### STEP 1.2: Unit testing for product routes
- ### STEP 1.3: Unit testing for cart routes
- ### STEP 1.4: Unit testing for review routes
- ## STEP 2: Fix bugs and errors from unit tests for the routes.
- ## STEP 3: Unit testing for controllers
- ### STEP 3.1: Unit testing for user controllers
- ### STEP 3.2: Unit testing for product controllers
- ### STEP 3.3: Unit testing for cart controllers
- ### STEP 3.4: Unit testing for review controllers
- ## STEP 4: Fix bugs and errors from unit tests for the controllers.
- ## STEP 5: Unit testing for DAOs
- ### STEP 5.1: Unit testing for user DAOs
- ### STEP 5.2: Unit testing for product DAOs
- ### STEP 5.3: Unit testing for cart DAOs
- ### STEP 5.4: Unit testing for review DAOs
- ## STEP 6: Fix bugs and errors from unit tests for the DAOs.
- ## STEP 7: Unit testing for the utilities functions
- ## STEP 8: Fix bugs and errors from unit tests for the utilities functions.
- ## STEP 9: Integration test
- ### STEP 10.1: Authentication integration test
- ### STEP 10.2: User integration test
- ### STEP 10.3: Product integration test
- ### STEP 10.4: Cart integration test
- ### STEP 10.5: Review integration test
- ## STEP 11: Fix bugs and errors from integration tests.
- ## STEP 12: Complete check of unit and integration tests.

# Tests

| Test case name | Object(s) tested | Test level | Technique used |
|--|--|--|--|
|**UNIT TESTS**||||
| **ROUTER TESTS** | | |
| **USER ROUTER TESTS** | | |
|POST ezelectronics/users/ | | |
| It should return a 200 success code | POST ezelectronics/users/ | unit _router_ | whitebox |
| It should return a 409 error code | POST ezelectronics/users/ | unit _router_ | whitebox |
|GET ezelectronics/users | | |
| It should return a 200 success code | GET ezelectronics/users | unit _router_ | whitebox |
|GET ezelectronics/users/roles/:role | | |
| It should return a 200 success code | GET ezelectronics/users/roles/:role | unit _router_ | whitebox |
|GET ezelectronics/users/:username | | |
| It should return a 200 success code | GET ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 404 error code | GET ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 401 error code | GET ezelectronics/users/:username | unit _router_ | whitebox |
|DELETE ezelectronics/users/:username | | |
| It should return a 200 success code | DELETE ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 404 error code | DELETE ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 401 error code | DELETE ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 401 error code | DELETE ezelectronics/users/:username | unit _router_ | whitebox |
|DELETE ezelectronics/users | | |
| It should return a 200 success code | DELETE ezelectronics/users | unit _router_ | whitebox |
|PATCH ezelectronics/users/:username | | |
| It should return a 200 success code | PATCH ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 404 error code | PATCH ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 401 error code | PATCH ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 400 error code | PATCH ezelectronics/users/:username | unit _router_ | whitebox |
| It should return a 401 error code | PATCH ezelectronics/users/:username | unit _router_ | whitebox |
| **PRODUCT ROUTER TESTS** | | |
|POST ezelectronics/products | | |
| It should return a 200 success code (product)| POST ezelectronics/products | unit _router_ | whitebox |
| It should return a 409 fail code (product)| POST ezelectronics/products | unit _router_ | whitebox |
| It should return a 400 fail code (product)| POST ezelectronics/products | unit _router_ | whitebox |
|PATCH ezelectronics/products/:model | | |
| It should return a 200 success code (product)| PATCH ezelectronics/products/:model | unit _router_ | whitebox |
| It should return a 404 fail code (product)| PATCH ezelectronics/products/:model | unit _router_ | whitebox |
| It should return a 400 fail code (product)| PATCH ezelectronics/products/:model | unit _router_ | whitebox |
| It should return a 400 fail code (product)| PATCH ezelectronics/products/:model | unit _router_ | whitebox |
|PATCH ezelectronics/products/:model/sell | | |
| It should return a 200 success code (product)| PATCH ezelectronics/products/:model/sell | unit _router_ | whitebox |
| It should return a 404 fail code (product)| PATCH ezelectronics/products/:model/sell | unit _router_ | whitebox |
| It should return a 400 fail code (product)| PATCH ezelectronics/products/:model/sell | unit _router_ | whitebox |
| It should return a 400 fail code (product)| PATCH ezelectronics/products/:model/sell | unit _router_ | whitebox |
| It should return a 409 fail code (EmptyProductStockError)| PATCH ezelectronics/products/:model/sell | unit _router_ | whitebox |
| It should return a 409 fail code (LowStockError - product)| PATCH ezelectronics/products/:model/sell | unit _router_ | whitebox |
|GET ezelectronics/products | | |
| It should return a 200 success code (product, grouping-category)| GET ezelectronics/products | unit _router_ | whitebox |
| It should return a 200 success code (product, grouping-model)| GET ezelectronics/products | unit _router_ | whitebox |
| It should return a 200 success code (product, no grouping)| GET ezelectronics/products | unit _router_ | whitebox |
| It should return a 422 fail code (product)| GET ezelectronics/products | unit _router_ | whitebox |
| It should return a 422 fail code (product)| GET ezelectronics/products | unit _router_ | whitebox |
| It should return a 422 fail code (product)| GET ezelectronics/products | unit _router_ | whitebox |
| It should return a 404 fail code (product)| GET ezelectronics/products | unit _router_ | whitebox |
|GET ezelectronics/products/available | | |
| It should return a 200 success code (product, grouping-category)| GET ezelectronics/products/available | unit _router_ | whitebox |
| It should return a 200 success code (product, grouping-model)| GET ezelectronics/products/available | unit _router_ | whitebox |
| It should return a 200 success code (product, no grouping)| GET ezelectronics/products/available | unit _router_ | whitebox |
| It should return a 422 error code (product)| GET ezelectronics/products/available | unit _router_ | whitebox |
| It should return a 422 error code (product)| GET ezelectronics/products/available | unit _router_ | whitebox |
| It should return a 422 error code (product)| GET ezelectronics/products/available | unit _router_ | whitebox |
| It should return a 404 error code (product)| GET ezelectronics/products/available | unit _router_ | whitebox |
|DELETE ezelectronics/products/:model | | |
| It should return a 200 success code (product)| DELETE ezelectronics/products/:model | unit _router_ | whitebox |
| It should return a 404 error code (product)| DELETE ezelectronics/products/:model | unit _router_ | whitebox |
|DELETE ezelectronics/products | | |
| It should return a 200 success code (product)| DELETE ezelectronics/products | unit _router_ | whitebox |
| **CART ROUTER TESTS** | | |
|GET ezelectronics/carts | | |
| It should return a 200 success code| GET ezelectronics/carts | unit _router_ | whitebox |
|POST ezelectronics/carts | | |
| It should return a 200 success code| POST ezelectronics/carts | unit _router_ | whitebox |
| It should return a 404 error code| POST ezelectronics/carts | unit _router_ | whitebox |
| It should return a 409 error code| POST ezelectronics/carts | unit _router_ | whitebox |
|PATCH ezelectronics/carts | | |
| It should return a 200 success code| PATCH ezelectronics/carts | unit _router_ | whitebox |
| It should return a 404 error code| PATCH ezelectronics/carts | unit _router_ | whitebox |
| It should return a 400 error code| PATCH ezelectronics/carts | unit _router_ | whitebox |
| It should return a 409 error code| PATCH ezelectronics/carts | unit _router_ | whitebox |
| It should return a 409 error code| PATCH ezelectronics/carts | unit _router_ | whitebox |
|GET ezelectronics/carts/history | | |
| It should return a 200 success code| GET ezelectronics/carts/history | unit _router_ | whitebox |
|DELETE ezelectronics/carts/products/:model | | |
| It should return a 200 success code| DELETE ezelectronics/carts/products/:model | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/carts/products/:model | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/carts/products/:model | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/carts/products/:model | unit _router_ | whitebox |
|DELETE ezelectronics/carts/current | | |
| It should return a 200 success code| DELETE ezelectronics/carts/current | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/carts/current | unit _router_ | whitebox |
|DELETE ezelectronics/carts | | |
| It should return a 200 success code| DELETE ezelectronics/carts | unit _router_ | whitebox |
|GET ezelectronics/carts/all | | |
| It should return a 200 success code| GET ezelectronics/carts/all | unit _router_ | whitebox |
| **REVIEW ROUTER TESTS** | | |
|POST ezelectronics/reviews/:model | | |
| It should return a 200 success code| POST ezelectronics/reviews/:model | unit _router_ | whitebox |
| It should return a 404 error code| POST ezelectronics/reviews/:model | unit _router_ | whitebox |
| It should return a 409 error code| POST ezelectronics/reviews/:model | unit _router_ | whitebox |
|GET ezelectronics/reviews/:model | | |
| It should return a 200 success code| GET ezelectronics/reviews/:model | unit _router_ | whitebox |
|DELETE ezelectronics/reviews/:model | | |
| It should return a 200 success code| DELETE ezelectronics/reviews | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/reviews/:model | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/reviews/:model | unit _router_ | whitebox |
|DELETE ezelectronics/reviews/:model/all| | |
| It should return a 200 success code| DELETE ezelectronics/reviews/:model/all | unit _router_ | whitebox |
| It should return a 404 error code| DELETE ezelectronics/reviews/:model/all | unit _router_ | whitebox |
|DELETE ezelectronics/reviews | | |
| It should return a 200 success code| DELETE ezelectronics/reviews | unit _router_ | whitebox |
| **CONTROLLER TESTS** | | |
| **USER CONTROLLER TESTS** | | |
| It should return true if account is successfully created | createUser | unit _controller_ | whitebox |
| It should return an array of registered Users | getUsers | unit _controller_  | whitebox |
| It should return an array of Users filtered by the role | getUsersByRole | unit _controller_  | whitebox |
| It should return a single user with the specified username | getUserByUsername | unit _controller_  | whitebox |
| It should return true if user is successfully deleted | deleteUser | unit _controller_  | whitebox |
| It should delete all users successfully and return nothing. | deleteAll | unit _controller_  | whitebox|
| It should return a single user with updated info. |updateUserInfo | unit _controller_  | whitebox |
| **PRODUCT CONTROLLER TESTS** | | |
| It should register a new product in database and return nothing | registerProducts | unit _controller_  | whitebox |
| It should update quantity of a product and return updated quantity | changeProductQuantity | unit _controller_ | whitebox | 
| It registers a physical sale and should return nothing | sellProducts | unit _controller_ | whitebox | 
| It should return an array of products | getProducts | unit _controller_ | whitebox |
| It should return an array of available products. | getAvailableProducts | unit _controller_ | whitebox |
| It should delete all products present in in database and return nothing | deleteAllProducts | unit _controller_ | whitebox |
| It should delete a specific product and return nothing | deleteProduct | unit _controller_ | whitebox |
| **CART CONTROLLER TESTS** | | |
| It should return current cart owned by the user | getCart | unit _controller_ | whitebox |
| It should add a product to a cart and return true | addToCart | unit _controller_ | whitebox |
| It should checkout current cart and return nothing | checkoutCart | unit _controller_ | whitebox |
| It should return carts that have been checked out. | getCustomerCarts | unit _controller_ | whitebox |
| It should remove a product from cart and return true | removeProductFromCart | unit _controller_ | whitebox |
| It should empty the current cart and return true | clearCart | unit _controller_ | whitebox |
| It should delete all carts present in database and return nothing | deleteAllCarts | unit _controller_ | whitebox |
| It should return an array of carts of all users, both past and current carts | getAllCarts | unit _controller_ | whitebox |
| **REVIEW CONTROLLER TESTS** | | |
| It should add a review for a specific product and return nothing | unit _controller_ | whitebox |
| It should return an array of Review of a specific product | getProductReviews | unit _controller_ | whitebox |
| It should delete a review published by the customer and return nothing | deleteReview | unit _controller_ | whitebox |
| It should delete all review of a specific product and return nothing | deleteReviewsOfProduct | unit _controller_ | whitebox |
| It should delete all reviews of all products present in the database and return nothing | deleteAllReviews| unit _controller_ | whitebox |
| **DAO TESTS** | | |
| **USER DAO TESTS** | | |
-- USER DAO TESTS -- 
| It should create an account and resolve true | createUser | unit _dao_ | whitebox |
| It should return all users and resolve to an array of User | getAllUsers | unit _dao_ | whitebox |
| It should resolve to an array of User with a specific role | getUsersByRole | unit _dao_ | whitebox |
| It should resolve to User and return specific user informations | getUserByUsername | unit _dao_ | whitebox |
| It should delete an user successfully and resolve to true | deleteUserByUsername | unit _dao_ | whitebox |
| It should delete all users and resolve to void | deleteAllUsers | unit _dao_ | whitebox |
| It should return all information of a specific user and resolve to true | updateUserInfoByUsername | unit _dao_ | whitebox |
| **PRODUCT DAO TESTS** | | |
| It should register a new product in database and resolve to void | registerFirstArrival | unit _dao_ | whitebox |
| It should return updated quantity and resolve to a number | registerQuantityUpdate | unit _dao_ | whitebox |
| It should register a physical sale and resolve to void | sellProducts | unit _dao_ | whitebox |
| It should return all products in database and resolve to an array of Products | getAllProducts |  unit _dao_ | whitebox |
| It should return all available products in database and resolve to an array of Products | getAvailableProducts |unit _dao_ | whitebox |
| It should delete all products in database and resolve to void | deleteAllProducts | unit _dao_ | whitebox |
| It should delete a specific product in database and resolve to void| deleteProduct |unit _dao_ | whitebox |
| **CART DAO TESTS** | | |
| It should return the current cart instance of a user and resolve to a Cart | getCart | unit _dao_ | whitebox |
| It should add a product into the current cart of the logged in customer and resolve to Boolean | addToCart | unit _dao_ | whitebox |
| It should create an instance of cart in database and resolve to a Cart object | createCart | unit _dao_ | whitebox |
| It should resolve to number  | getCartId | unit _dao_ | whitebox |
| It should simulate a payment transaction and mark a cart as paid and resolve to void | checkoutCart | unit _dao_ | whitebox |
| It should resolve to an array of all carts present in database | getCartHistory | unit _dao_ | whitebox |
| It should resolve to an array of all paid carts present in database | getPaidCarts | unit _dao_ | whitebox |
| It should resolve to Cart populated with Product objects  | getCartContent | unit _dao_ | whitebox |
| It should remove a product from cart and resolve to true | removeProductFromCart | unit _dao_ | whitebox |
| It should clear the cart and resolve to true  | getCurrentCart | unit _dao_ | whitebox |
| It should delete all the carts present in database and resolve to void | deleteAllCarts | unit _dao_ | whitebox |
| It should resolve to an array of all carts present in database | getAllCarts | unit _dao_ | whitebox |
| It should resolve to an array of ProductInCart | getCartProducts | unit _dao_ | whitebox |
| It should resolve to an array of paid ProductInCart objects | getPaidCartProducts | unit _dao_ | whitebox |
| **REVIEW DAO TESTS** | | |
| It should add a review to a specific product and resolve to void | addReview |unit _dao_ | whitebox |
| It should return all reviews of a specific product and resolve to an array of ProductReview | getProductReviews |unit _dao_ | whitebox |
| It should delete a review of a specific product (published by the same user) and resolve to void | deleteReview |unit _dao_ | whitebox |
| It should delete all reviews of a specific product and resolve to void | deleteReviewsOfProduct |unit _dao_ | whitebox |
| It should delete all reviews present in database and resolves to void | deleteAllReviews |unit _dao_ | whitebox |
| **utilities.ts TESTS** | | |
| It should resolve to true if calling user has role Manager | isManager | unit | whitebox | 
| It should resolve to true if calling user has role Customer | isCustomer | unit | whitebox | 
| It should resolve to true if calling user has role Admin | isAdmin | unit | whitebox | 
| It should resolve to true if product has been deleted | checkProductExists | unit | whitebox | 
| It should resolve to a Product object if product has been deleted | checkProductDeleted | unit | whitebox | 
| It should resolve to true if a review published by the calling user exists | checkReviewByUserExists | unit | whitebox | 
| It should resolve to true if a review published by the calling user does not exists | checkNoReviewByUser | unit | whitebox | 
| It should return true if the input parameter is a date  | checkDate | unit | whitebox | 
| It should return true if the first date is before second date | checkDateBefore | unit | whitebox | 
| It should return true if the first date is after second date  | checkDateAfter | unit | whitebox | 
|**INTEGRATION TESTS**||||
|**AUTHENTICATION INTEGRATION TESTS**||||
|POST /session (login)||||
|It should return a 200 success code and log in an user with role admin|POST /session (login)|integration|white box|
|It should return a 200 success code and log in an user with role customer|POST /session (login)|integration|white box|
|It should return a 200 success code and log in an user with role manager|POST /session (login)|integration|white box|
|It should return a 401 error code if password is wrong|POST /session (login)|integration|white box|
|It should return a 401 error code if username is wrong|POST /session (login)|integration|white box|
|It should return a 401 error code if user does not exists|POST /session (login)|integration|white box|
|DELETE /sessions/current (logout)||||
|It should return a 200 success code and log out the user - customer case|DELETE /sessions/current (logout)|integration|white box|
|It should return a 200 success code and log out the user - manager case|DELETE /sessions/current (logout)|integration|white box|
|It should return a 200 success code and log out the user - admin case|DELETE /sessions/current (logout)|integration|white box|
|**USER INTEGRATION TESTS**||||
|createUser||||
|It should return a 200 success code and create a new user|createUser|integration|white box|
|It should return a 422 error code if at least one request body parameter is empty/missing|createUser|integration|white box|
|It should return a 409 error code because user already exists.|createUser|integration|white box|
|getUsers||||
|It should return a 200 success code and return an array of users|getUsers|integration|white box|
|It should return a 401 error code if the user is not an Admin|getUsers|integration|white box|
|getUsersByRole||||
|It should return a 200 success code and return an array of users with a specific role|getUsersByRole|integration|white box|
|It should return a 401 error code if the user is not an Admin|getUsersByRole|integration|white box|
|It should return a 422 error code if the requested role is not a Customer or a Manager|getUsersByRole|integration|white box|
|getUserByUsername||||
|It should return a 200 success code and return a single user with a specific username. - Admin case|getUserByUsername|integration|white box|
|It should return a 200 success code and return a single user with a specific username. - Customer case|getUserByUsername|integration|white box|
|It should return a 200 success code and return a single user with a specific username. - Manager case|getUserByUsername|integration|white box|
|It should return a 404 error code if username does not exists.|getUserByUsername|integration|white box|
|It should return a 401 error code if is not an Admin and it is a customer.|getUserByUsername|integration|white box|
|It should return a 401 error code if is not an Admin and it is a manager.|getUserByUsername|integration|white box|
|deleteUser||||
|It should return a 200 success code and deletes a specific user. - Admin case|deleteUser|integration|white box|
|It should return a 200 success code and Admin deletes himself. - Admin case|deleteUser|integration|white box|
|It should return a 200 success code and Customer deletes his account. - Customer case.|deleteUser|integration|white box|
|It should return a 200 success code and Manager deletes his account. - Manager case|deleteUser|integration|white box|
|It should return a 404 error code if username does not exists.|deleteUser|integration|white box|
|It should return a 401 error code if user is not an Admin and it is a manager.|deleteUser|integration|white box|
|It should return a 401 error when the calling user is an Admin and username represents a different Admin user.|deleteUser|integration|white box|
|deleteAll||||
|It should return a 200 success code and deletes all non-Admin users from the database. - Admin case|deleteAll|integration|white box|
|It should return a 401 error code - Customer case|deleteAll|integration|white box|
|It should return a 401 error code - Manager case|deleteAll|integration|white box|
|updateUserInfo||||
|It should return a 200 success code and updates the personal information of herself/himself. - Admin case|updateUserInfo|integration|white box|
|It should return a 200 success code and Admin updates the personal information of the Customer.|updateUserInfo|integration|white box|
|It should return a 200 success code and updates the personal information of herself/himself. - Manager case|updateUserInfo|integration|white box|
|It should return a 200 success code and updates the personal information of herself/himself. - Customer case|updateUserInfo|integration|white box|
|It should return a 401 error code - Customer tries to update the personal information of Admin|updateUserInfo|integration|white box|
|It should return a 401 error code - Manager tries to update the personal information of Admin|updateUserInfo|integration|white box|
|It should return a 400 error code - Manager tries to update the personal information of another account with error on birthdate.|updateUserInfo|integration|white box|
|It should return a 404 error code - Admin tries to update the personal information of an account that does not exists.|updateUserInfo|integration|white box|
|**PRODUCT INTEGRATION TESTS**||||
|registerProducts||||
|It should return a 200 success code and register a new product - Admin case|registerProducts|integration|white box|
|It should return a 200 success code and register a new product - Manager case|registerProducts|integration|white box|
|It should return a 401 error code - Customer case|registerProducts|integration|white box|
|It should return a 409 error if model represents an already existing set of products in the database|registerProducts|integration|white box|
|It should return a 400 error when arrivalDate is after the current date.|registerProducts|integration|white box|
|It should return a 422 error when model string is empty|registerProducts|integration|white box|
|It should return a 422 error when cateogory is not 'Smartphone', 'Laptop' or 'Appliance'|registerProducts|integration|white box|
|It should return a 422 error when quantity is 0|registerProducts|integration|white box|
|changeProductQuantity||||
|It should return a 200 success code and increases the available quantity of a set of products - Admin case|changeProductQuantity|integration|white box|
|It should return a 200 success code and increases the available quantity of a set of products - Manager case|changeProductQuantity|integration|white box|
|It should return a 401 error code - Customer case|changeProductQuantity|integration|white box|
|It should return a 404 error if model does not represent a product in the database|changeProductQuantity|integration|white box|
|It should return a 400 error when changeDate is after the current date.|changeProductQuantity|integration|white box|
|It should return a 400 error when changeDate is before the product's arrivalDate|changeProductQuantity|integration|white box|
|sellProduct||||
|It should return a 200 success code and record a product's sale successfully - Admin case|sellProduct|integration|white box|
|It should return a 200 success code and record a product's sale successfully - Manager case|sellProduct|integration|white box|
|It should return a 401 error code - Customer case|sellProduct|integration|white box|
|It should return a 404 error if model does not represent a product in the database|sellProduct|integration|white box|
|It should return a 400 error if sellingDate is after the current date|sellProduct|integration|white box|
|It should return a 400 error if sellingDate is before the product's arrivalDate|sellProduct|integration|white box|
|It should return a 409 error if model represents a product whose available quantity is 0|sellProduct|integration|white box|
|It should return a 409 error if the available quantity of model is lower than the requested quantity|sellProduct|integration|white box|
|getProducts||||
|It should return 200 success code - Returns all products present in the database - Admin case|getProducts|integration|white box|
|It should return 200 success code - Returns all products present in the database - Admin case|getProducts|integration|white box|
|It should return 401 error code- Returns all products present in the database - Customer case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping=null & model=null & category=null) case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping=null & category=null) case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping==null & model=null) case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - grouping==null case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping==category && category==null) case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping==category && category==null && model==iphone13) case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping==category && category=Smartphone && model=iphone13) case|getProducts|integration|white box|
|It should return a 422 error code and tries to return all products present in the database - (grouping==category && model=iphone13) case|getProducts|integration|white box|
|It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case|getProducts|integration|white box|
|It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case|getProducts|integration|white box|
|It should return a 404 error if `model` does not represent a product in the database (only when `grouping` is `model`) - (grouping==model && model!=null) case|getProducts|integration|white box|
|It should return a 200 success code and returns all products present in the database - (grouping==category && category = Smartphone) correct case|getProducts|integration|white box|
|It should return a 200 success code and returns all products present in the database - (grouping==category && category = Laptop) correct case|getProducts|integration|white box|
|It should return a 200 success code and returns all products present in the database - (grouping==category && category==Appliance) correct case|getProducts|integration|white box|
|It should return a 200 success code and returns all products present in the database - (grouping==model && model==iphone13) correct case|getProducts|integration|white box|
|It should return 422 when category is not 'Smartphone', 'Laptop' or 'Appliance'|getProducts|integration|white box|
|getAvailableProducts||||
|It should return 200 - Returns all available products present in the database - Admin case|getAvailableProducts|integration|white box|
|It should return 200 - Returns all available products present in the database - Manager case|getAvailableProducts|integration|white box|
|It should return 200 - Returns all available products present in the database - Customer case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - (grouping=null & model=null & category=null) case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - (grouping=null & category=null) case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to returns all available products present in the database - (grouping==null & model=null) case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - grouping==null case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - (grouping==category && category==null) case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - (grouping==category && category==null && model==iphone13) case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - (grouping==category && category=Smartphone && model=iphone13) case|getAvailableProducts|integration|white box|
|It should return a 422 error code and tries to return all available products present in the database - (grouping==category && model=iphone13) case|getAvailableProducts|integration|white box|
|It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case|getAvailableProducts|integration|white box|
|It should return a 422 error if `grouping` is `model` and `model` is null OR `category` is not null - (grouping==model && model!=null) case|getAvailableProducts|integration|white box|
|It should return a 404 error if `model` does not represent a product in the database (only when `grouping` is `model`) - (grouping==model && model!=null) case|getAvailableProducts|integration|white box|
|It should return a 200 success code and returns all available products present in the database - (grouping==category && category = Smartphone) correct case|getAvailableProducts|integration|white box|
|It should return a 200 success code and returns all available products present in the database - (grouping==category && category = Laptop) correct case|getAvailableProducts|integration|white box|
|It should return a 200 success code and returns all available products present in the database - (grouping==category && category==Appliance) correct case|getAvailableProducts|integration|white box|
|It should return a 200 success code and returns all available products present in the database - (grouping==model && model==iphone13) correct case|getAvailableProducts|integration|white box|
|It should return 422 when category is not 'Smartphone', 'Laptop' or 'Appliance'|getAvailableProducts|integration|white box|
|deleteAllProducts||||
|It should return a 200 success code and deletes one product from the database. - Admin case|deleteAllProducts|integration|white box|
|It should return a 200 success code and deletes one product from the database. - Manager case|deleteAllProducts|integration|white box|
|It should return a 401 error code. - Customer case|deleteAllProducts|integration|white box|
|It should return a 404 error code if `model` does not represent a product in the database|deleteAllProducts|integration|white box|
|deleteProduct||||
|It should return a 200 success code and deletes all products from the database. - Admin case|deleteProduct|integration|white box|
|It should return a 200 success code and deletes all products from the database. - Manager case|deleteProduct|integration|white box|
|It should return a 401 error code. - Customer case|deleteProduct|integration|white box|
|**CART INTEGRATION TESTS**||||
|getCart||||
|It return 200 success code and returns the current cart of the logged in user. - customer case|getCart|integration|white box|
|It return 200 success code and returns the (empty) current cart of the logged in user. - customer case|getCart|integration|white box|
|It return 401 error code and tries to return the current cart of the logged in user. - admin case|getCart|integration|white box|
|It return 401 error code and tries to return the current cart of the logged in user. - manager case|getCart|integration|white box|
|addToCart||||
|It return 200 success code and adds a product instance, to the current cart of the logged in user - customer case|addToCart|integration|white box|
|It return 200 success code and adds a product instance, to the current cart of the logged in user that does not have any information about cart. - customer case|addToCart|integration|white box|
|It return 401 error code and tries to add a product instance, to the current cart of the logged in user - manager case|addToCart|integration|white box|
|It return 401 error code and tries to add a product instance, to the current cart of the logged in user - admin case|addToCart|integration|white box|
|It should return a 404 error code if model does not represent an existing product|addToCart|integration|white box|
|It should return a 409 error code if model represents a product whose available quantity is 0|addToCart|integration|white box|
|checkoutCart||||
|It return 200 success code and simulates payment for the current cart of the logged in user. - customer case|checkoutCart|integration|white box|
|It return 401 error code and tries to simulate payment for the current cart of the logged in user. - manager case|checkoutCart|integration|white box|
|It return 401 error code and tries to simulate payment for the current cart of the logged in user. - admin case|checkoutCart|integration|white box|
|It should return a 404 error code if there is no information about an unpaid cart in the database|checkoutCart|integration|white box|
|It should return a 400 error code if there is information about an unpaid cart but the cart contains no product|checkoutCart|integration|white box|
|It should return a 409 error code if there is at least one product in the cart whose available quantity in the stock is 0|checkoutCart|integration|white box|
|It should return a 409 error code if there is at least one product in the cart whose quantity is higher than the available quantity in the stock|checkoutCart|integration|white box|
|It should return a 404 error code if cart does not exists|checkoutCart|integration|white box|
|getCustomerCarts||||
|It return 200 success code and returns the history of the carts that have been paid for by the current user. - customer case|getCustomerCarts|integration|white box|
|It return 401 error code and tries to return the history of the carts that have been paid for by the current user. - manager case|getCustomerCarts|integration|white box|
|It return 401 error code and tries to return the history of the carts that have been paid for by the current user. - admin case|getCustomerCarts|integration|white box|
|removeProductFromCart||||
|It return 200 success code and remove product from cart - customer case|removeProductFromCart|integration|white box|
|It return 401 error code. - manager case|removeProductFromCart|integration|white box|
|It return 401 error code. - admin case|removeProductFromCart|integration|white box|
|It should return a 404 error code if model represents a product that is not in the cart|removeProductFromCart|integration|white box|
|It should return a 404 error code if model represents a product that is not in the cart|removeProductFromCart|integration|white box|
|It should return a 404 error code if model does not represent an existing product|removeProductFromCart|integration|white box|
|It should return a 404 error code if cart does not exist|removeProductFromCart|integration|white box|
|clearCart||||
|It return 200 success code and empties the current cart by deleting all of its products. - customer case|clearCart|integration|white box|
|It return 401 error code and tries to empty the current cart by deleting all of its products. - manager case|clearCart|integration|white box|
|It return 401 error code and tries to empty the current cart by deleting all of its products. - admin case|clearCart|integration|white box|
|It should return a 404 error code if there is no information about an unpaid cart for the user|clearCart|integration|white box|
|deleteAllCarts||||
|It return 200 success code and deletes all existing carts of all users, both current and past. - manager case|deleteAllCarts|integration|white box|
|It return 200 success code deletes all existing carts of all users, both current and past. - admin case|deleteAllCarts|integration|white box|
|It return 401 error code tries to delete all existing carts of all users, both current and past. - customer case|deleteAllCarts|integration|white box|
|getAllCarts||||
|It return 200 success code and returns all carts of all users, both current and past - manager case|getAllCarts|integration|white box|
|It return 200 success code and returns all carts of all users, both current and past - admin case|getAllCarts|integration|white box|
|It return 401 error code and triesm to return all carts of all users, both current and past - customer case|getAllCarts|integration|white box|
|**REVIEW INTEGRATION TESTS**||||
|addReview||||
|It returns 200 success code and adds a review. - Customer case|addReview|integration|white box|
|It returns 401 error code. - Admin case|addReview|integration|white box|
|It returns 401 error code. - Manager case|addReview|integration|white box|
|It should return a 404 error code if model does not represent an existing product in the database|addReview|integration|white box|
|It should return a 409 error code if there is an existing review for the product made by the customer|addReview|integration|white box|
|getProductReviews||||
|It should return a 200 success code and return all reviews of a product model. - Customer case|getProductReviews|integration|white box|
|It should return a 200 success code and return all reviews of a product. - Manager case|getProductReviews|integration|white box|
|It should return a 200 success code and return all reviews of a product. - Admin case|getProductReviews|integration|white box|
|It should return a 404 error code if product model does not exists.|getProductReviews|integration|white box|
|deleteReview||||
|It returns 200 success code and eeletes the review made by the current user for a specific product. - customer case|deleteReview|integration|white box|
|It returns 401 error code. - manager case|deleteReview|integration|white box|
|It returns 401 error code. - admin case|deleteReview|integration|white box|
|It should return a 404 error code if model does not represent an existing product|deleteReview|integration|white box|
|It should return a 404 error code if the current user does not have a review for the product identified by model|deleteReview|integration|white box|
|deleteReviewsOfProduct||||
|It returns 200 success code and deletes all reviews of a specific model. - admin case|deleteReviewsOfProduct|integration|white box|
|It returns 200 success code and deletes all reviews of a specific model. - manager case|deleteReviewsOfProduct|integration|white box|
|It returns 401 error code. - customer case|deleteReviewsOfProduct|integration|white box|
|It should return a 404 error if model does not represent an existing product|deleteReviewsOfProduct|integration|white box|
|deleteAllReviews||||
|It returns 200 success code and deletes all reviews of all existing products. - Admin case|deleteAllReviews|integration|white box|
|It returns 200 success code and deletes all reviews of all existing products. - Manager case|deleteAllReviews|integration|white box|
|It returns 401 error code. - Customer case|deleteAllReviews|integration|white box|




# Coverage

## Coverage of FR

<Report in the following table the coverage of functional requirements and scenarios(from official requirements) >

| Functional Requirement or scenario                                                    | Test(s) |
| :-----------------------------------------------------------------------------------: | :-----: |
|                **FR1 Manage account**                                                 |         |
|                FR1.1 Login                                                            | login   |
|                FR1.2 Logout                                                           | logout  |
|                FR1.3 Create a new user account                                        | createUser |
|                                                                                       |         |
|                **FR2 Manage users**                                                   |         |
|                FR2.1 Show the list of all users                                       | getUsers       |
|                FR2.2 Show the list of all users with a specific role                  | getUsersByRole       |
|                FR2.3 Show the information of a single user                            | getUserByUsername        |
|                FR2.4 Update the information of a single user                          | updateUserInfo        |
|                FR2.5 Delete a single _non Admin_ user                                 | deleteUser       |
|                FR2.6 Delete all _non Admin_ users                                     | deleteAll       |
|                                                                                       |         |
|                **FR3 Manage products**                                                |         |
|                FR3.1 Register a set of new products                                   | registerProducts|
|                FR3.2 Update the quantity of a product                                 | changeProductQuantity|
|                FR3.3 Sell a product                                                   | sellProduct|
|                FR3.4 Show the list of all products                                    | getProducts|
|                FR3.4.1 Show the list of all available products                        | getAvailableProducts|
|                FR3.5 Show the list of all products with the same category             | getProducts|
|                FR3.5.1 Show the list of all available products with the same category | getAvailableProducts|
|                FR3.6 Show the list of all products with the same model                | getProducts|
|                FR3.6.1 Show the list of all available products with the same model    | getAvailableProducts|
|                FR3.7 Delete a product                                                 | deleteProduct|
|                FR3.8 Delete all products                                              | deleteAllProducts|
|                                                                                       |         |
|                **FR4. Manage reviews**                                                |         |
|                FR4.1 Add a new review to a product                                    | addReview|
|                FR4.2 Get the list of all reviews assigned to a product                | getProductReviews|
|                FR4.3 Delete a review given to a product                               | deleteReview|
|                FR4.4 Delete all reviews of a product                                  | deleteReviewsOfProduct|
|                FR4.5 Delete all reviews of all products                               | deleteAllReviews|
|                                                                                       |         |
|                **FR5. Manage carts**                                                  |         |
|                FR5.1 Show the information of the current cart                         | getCart|
|                FR5.2 Add a product to the current cart                                | addToCart|
|                FR5.3 Checkout the current cart                                        | checkoutCart|
|                FR5.4 Show the history of the paid carts                               | getCustomerCarts|
|                FR5.5 Remove a product from the current cart                           | removeProductFromCart|
|                FR5.6 Delete the current cart                                          | clearCart|
|                FR5.7 See the list of all carts of all users                           | getAllCarts|
|                FR5.8 Delete all carts                                                 | deleteAllCarts|
|                                                                                       |         |


## Coverage white box

Report here the screenshot of coverage values obtained with jest-- coverage

Step 2 - unit, integration tests
![](/images/Test_Coverage.png)

-----------------------------------------

Step 3 - unit, integration tests (old tests) + official tests also included
![](/images/Test_Coverage_withOfficialTests.jpg)
