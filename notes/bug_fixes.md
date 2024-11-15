BUGS:
- log in as admin, edit user info -> cannot close pop-up window
- productDAO.ts, deleteProduct() -> internal server error (503) when trying to delete a product which has reviews, or which is in current/past cart --> solution: add new column "deleted" in product table, when trying to delete a product, set the value of "deleted" to 1
- check error msgs of Product and Cart
- foreign key (username) references users(username) --> cart
- add "deleted" col in product
- cascade of user when deleting a user
- finish cart dao code review
- when product quantity reach 0, product in customer cart is stil present; show error message with model product ??
FIXES:
- in UserController.ts - getUserByUsername() added check if admin
- ...


