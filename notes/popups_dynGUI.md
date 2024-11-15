GUI V2

=============================================================
INVENTORY PAGE v2

+ REGISTER PRODUCT ARRIVAL TO INVENTORY
OK scen:
<!-- -> insert data for product arrival of N items of a product model XYZ
-> buttons "Cancel", "Add to inventory"
-> click 'Add to Inventory'
-> green tick OK message on top of screen below navbar 'N items of product model XYZ inserted'
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X (close) in upper right corner of msg -->

Error scen:
-> steps 1, 2 - same as above
-> red X error msg 'Error while inserting N items, product model XYZ"
-> step 4 - same as above

+  DELETE PRODUCT ARRIVAL FROM INVENTORY
OK scen:
-> select 1 or more rows from  Inventory table
-> buttons 'modify',  'delete'
-> select 'delete'
-> pop-up "Are you sure you want to delete N item(s) of model XYZ from Inventory?"
-> buttons 'yes' 'no'
-> click 'yes'
-> green tick OK msg on top below navbar 'N item(s) deleted from Inventory"


Error scen:
-> ??

=============================================================

CATALOGUE PAGE V2

+ ADD PRODUCT TO CATALOGUE
OK Scen:
-> insert all data fields
-> buttons 'Add to Catalogue', 'cancel'
-> select 'Add to Catalogue'
-> green tick OK message on top of screen below navbar 'Product model XYZ inserted'
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg

Error scen:
-> step 1, 2, 3 - same as above
-> red X error msg 'Error: invalid input parameters. Product model XYZ not inserted. "
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg

Warning scen:
-> step 1, 2,3 - same as above
-> orange ! warning msg 'Warning: Product model XYZ is already in Catalogue"
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg

+ MODIFY PRODUCT IN CATALOGUE
OK scen:
-> select a single row from Catalog table
-> buttons 'modify', 'delete'
-> select 'modify'
-> pop-up window "Modify Product Model" with 1 row for CURRENT product details and 2nd row containing empty fields for new product details that can be inserted
-> buttons "Cancel", "Modify"
-> select "Modify"
-> pop-up "Are you sure you want to modify Product Model XYZ?' BEFORE: <preview AS IS>, AFTER: <preview TO BE>
-> buttons 'yes' 'no'
-> click 'yes'
-> green tick OK msg on top of screen below navbar 'Product Model XYZ modified"
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg


+ DELETE PRODUCT FROM CATALOGUE
OK scen:
-> select a single row from Catalog table
-> buttons 'modify', 'delete'
-> select 'delete'
-> pop-up "Are you sure you want to delete product model XYZ?"
-> buttons 'yes' 'no'
-> click 'yes'
-> green tick OK msg on top of screen below navbar 'Product Model XYZ deleted"
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg


=============================================================

USER PAGE V2

+ DELETE CUSTOMER ACCOUNT (CUSTOMER)

OK scen:
-> click 'delete account'
-> orange warning ! msg "You are about to delete your account and cancel all your data provided to EZElectronics. Are you sure you want to continue?"
-> buttons 'yes', 'no'
-> click 'yes'
-> window "Please wait. Your account will be deleted. You will be redirected to the Home page of EzElectronics"



+ MODIFY USER ACCOUNT PARAMETERS

OK scen:
-> insert all data
-> click 'modify'
-> green tick msg below navbar 'Account data modified.'
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg

Error scen:
-> steps 1, 2 - same as above
-> red X error msg below navbar 'Error: invalid parameters. Account data NOT modified.'
-> step 4 - same as above


+ SET DEFAULT DELIVERY ADDRESS

OK scen:
-> insert all data
-> click 'modify'
-> green tick msg below navbar 'Default Delivery address updated.'
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg

Error scen:
-> steps 1,2 - same as before
-> red X error msg below navbar 'Error: invalid paramaters. Default address NOT modified.'


+ SET DEFAULT PAYMENT CARD DETAILS

OK scen:
-> insert all data
-> click 'modify'
-> green tick msg below navbar 'Default Payment card details updated.'
-> msg disappears after 5 secs, or in the meantime, to close it, click on an X in upper right corner of msg

Error scen:
-> steps 1,2 - same as before
-> red X error msg below navbar 'Error: invalid paramaters. Default Payment card details NOT modified.'


=============================================================

LOGIN/SIGNUP PAGE V2

Error scen:
-> insert credentials
-> check them, wrong credentials
-> red X error msg above login fields "Wrong credentials. Please, try again."


=============================================================
PRODUCTS PAGE V1

+ ADD PRODUCT TO CURRENT CART

Ok scen:
-> click on 'add to cart' button of a product
-> open i right hand side a pop-up window of "mini" cart with newly added product on top, the screen of the Products page becomes slightly darker in background to highlist the mini cart

make a screen on which we have Products page
click on cart icon in top right corner
mini cart opens - inside have text "Cart Empty"
then do OK scen


Error scen 1:
-> click on 'add to cart' button of a product already in cart
-> orange warning ! msg 'Product XYZ already added to cart'


Error scen 2:
-> click on 'add to cart' button of a prod
-> red error X msg 'Product not available'

=========================================
MINI CART PAGE V2

+ REMOVE PRODUCT FROM CURRENT CART

OK scen:
-> click 'delete button' next to a prod
-> green tick msg 'Product XYZ removed from cart'

=========================================
CART PAGE V2

+ REMOVE PRODUCT FROM CURRENT CART

OK scen:
-> click 'delete button' next to a prod
-> green tick msg 'Product XYZ removed from cart'

+ DELETE CURRENT CART CONTENT

OK scen:
-> have a non-empty cart
-> click button 'Delete Cart'
-> prompt in pop-up window 'You are about to delete the content of your cart. Are you sure you want to continue?'
-> buttons 'Yes', 'No'
-> click 'Yes'
-> green tick OK msg 'Cart content deleted'

=============================================
CHECKOUT PAGE V2

+ DO CART CHECKOUT
dropdown menu with subsections: Delivery Address, Overview of products in cart, Payment data
subsection Delivery Address is open
-> radio button to choose delivery address:
-- default delivery address (if not set, put link with description 'Set default delivery address', if not yet set)
-- other delivery address
-> select option for address
-- if default, show details
-- if other, input data
-> button 'next'
-> if address correct (default is always assumed correct, other is checked in backend), green tick next to subsection Delivery Address

subsection Overview of products in cart is open
-> list of all products with photo, product item name, price and quantity
-> total price of cart
-> buttons 'add more products', 'continue with checkout'
-> select 'continue with checkout'

subsection Payment data is open
-> radio button to choose Payment method: Paypal, credit/debit card, bank transfer
-- if for Paypal (HELP)
-- if credit/debit card -> radio button to choose Payment data: default payment method, other payment method
-- if bank transfer (HELP)
-> .....

see screenshot in discord!
=============================================================
ORDER HISTORY V2

+ see order history
-> popup from user icon

