# Access APIs

+ #### POST ezelectronics/sessions 
  + Allows login for a user with the provided credentials.

+ #### DELETE ezelectronics/sessions/current 
  + Performs logout for the currently logged in user.

+ #### GET ezelectronics/sessions/current 
  + Retrieves information about the currently logged in user.

##
# User APIs

+ #### POST ezelectronics/users 
  + Creates a new user with the provided information.

+ #### GET ezelectronics/users 
  + Returns the list of all users.

+ #### GET ezelectronics/users/role/+role 
  + Returns the list of all users with a specific role.

+ #### GET ezelectronics/users/+username 
  + Returns a single user with a specific username.

+ #### DELETE ezelectronics/users/+username 
  + Deletes a specific user, identified by the username, from the database

+ #### DELETE ezelectronics/users 
  + Deletes all users from the database. This route is only used for testing purposes, as it allows the deletion of all users to ensure an empty database.

##
# Product APIs

+ #### POST ezelectronics/products 
  + Creates a new product.

+ #### POST ezelectronics/products/arrivals 
  + Registers the arrival of a set of products of the same model.

+ #### PATCH ezelectronics/products/+code 
  + Marks a product as sold

+ #### GET ezelectronics/products 
  + Returns all products present in the database.

+ #### GET ezelectronics/products/+code 
  + Creates a new product.

+ #### GET ezelectronics/products/category/+category 
  + Returns all products of a specific category.

+ #### GET ezelectronics/products/model/+model 
  + Returns all products of a specific category.

+ #### DELETE ezelectronics/products 
  + Deletes all products from the database. This route is only used for testing purposes, as it allows the deletion of all products to ensure an empty database.

+ #### DELETE ezelectronics/products/+code 
  + Deletes a specific product from the database.

##
# Cart APIs

+ #### GET ezelectronics/carts 
  + Returns the current cart of the logged in user.

+ #### POST ezelectronics/carts 
  + Adds a product to the current cart of the logged in user.

+ #### PATCH ezelectronics/carts 
  + Pays for the current cart of the logged in user.
Sets the total of the cart as the sum of the costs of all products and the payment date as the current date, in format <b>YYYY-MM-DD</b>.

+ #### GET ezelectronics/carts/history 
  + Returns the history of the carts that have been paid for by the current user.

+ #### DELETE ezelectronics/carts/products/
  +productId 
  + Removes a product from the current cart of the logged in user.

+ #### DELETE ezelectronics/carts/current 
  + Deletes the current cart of the logged in user.

+ #### DELETE ezelectronics/carts 
  + Deletes all existing carts. This route is only used for testing purposes.
