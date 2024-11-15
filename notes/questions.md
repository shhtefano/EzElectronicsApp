+ DELETE /ezelectronics/
in productController.ts, deleteAllProducts(), in the comment it is written to return a Promise which resolves to 'true' at success... - should we keep it as it is?



===========================
Update 2024-05-30

+ GET products/available
can be called by customer or all kind of users ?
-> answer: by everyone, inconsistency b/n the comment above the method in the code and the API, profs corrected it

+ PATCH ezelectronics/products/:model
where ChangeDate is stored? does it overwrite arrivalDate of the product? 
--> answer: changeDate is not stored anywhere, it is to check that changeDate>=arrivalDate and changeDate <= current date


+ DELETE ezelectronics/:model
productDAO.ts, deleteProduct() -> internal server error (503) when trying to delete a product which has reviews, or which is in current/past cart
--> solution 1: add new column "deleted" in product table, when trying to delete a product, set the value of "deleted" to 1 -> possible to do, sme thing also for user table when trying to delete a user - need to add additional checks in authentication method to see if the user trying to log in is deleted already or not
--> solution 2: cascade everything -> when deleting a product from product table, if present in review -> delete all reviews of that product; if present in cart content -> delete that product from cart content and update total cost of cart -> G.C. has implemented it with a cascade

+ where SellingDate is stored?
-> answer: sellingDate is not stored anywhere, same as changDate, userd to do only some checks
if we want, can add that sellingDate into an additional column into the table (but it is not required)

+ POST ezelectronics/carts
total price in cart must be updated every time or it updates only when paid ? 
--> answer in API.md: The total cost of the cart should be updated with the cost of the product instance.