#### V2 IDEAS

+ database design
+ user attributes - birthdate (optional), address (optional, 1 or more), telephone# (optional), wishlist (optional)
+ Discount prices - define discounts based on birthdate, on a monthly basis, for specific products, for type of user (managers can have discounts since they work at EZElectronics)
+ Wishlist - new table; create a class, add a wishlist attribute to user attribs, add productS TO wishlist
    + do checkout of wishlist?
    + checkout of wishlist -> products moved to cart -> do checkout (internally), wishlisht is emptied
+ Payment Circuit Services - by means of card: credit, debit, prepaid; bank transfer; smartphone wallets (Google pay, Apple Pay); Satispay, Paypal, ...
+ Reviews - new table
+ double table -> Product tables
+ images - add to GUI per product page, add to reviews
+ searchbar - in GUI, search by keywords
+ GUI: images; separate page per product with details, description, reviews
+ filters: in GUI - by category, by brand, by price (price range), by rating of reviews, by discount, by sale offer
+ sorting: by price, by rating, by arrival date
+ language: in FRs, in GUI
+ premium fidelity user
+ delivery? delivery log, tracking of shipping


Priority ordering:
+ business model
+ database design - to be clarified
+ sorting: by price, by rating, by release date
+ filters: in GUI - by category, by brand, by price (price range), by rating of reviews, by discount, by sale offer
+ Wishlist - new table; create a class, add a wishlist attribute to user attribs, add productS TO wishlist
    + do checkout of wishlist?
    + checkout of wishlist -> products moved to cart -> do checkout (internally), wishlisht is emptied
+ images - add to GUI per product page, add to reviews
+ user attributes - birthdate (optional), address (optional, 1 or more), telephone# (optional), wishlist (optional)
+ delivery? delivery log, tracking of shipping
+ product.ts -> release_date attibute
**+ online live chat**


+ DATABASE DESIGN (Non-Relational)


<!--TODo-->
USER(**Username**, Name, Surname, Email, Password, Birthdate*, Telephone*, Role, Default_Delivery_Address, Default_Payment_Card_Details);

INVENTORY(**ProductItemID**, ModelID, Category, ArrivalDate, SellingDate, SalesStatus, SellingPrice, OrderID);

CATALOGUE(**ModelID**, Category, Price, [List_Of_Images], Details, Quantity, ReleaseDate, Brand, isOnline, AvgRating);

ORDER(**OrderID**, OrderPrice, CartID, OrderStatus, TrackingCode, PaymentID, DeliveryAddress);

PAYMENT_LOG(**PaymentID**, PaymentMethod, Total);

CART(**CartID**, [List_Of_ProductID], Username);

DISCOUNT(**DiscountID**, StartDate, EndDate, ModelID, Category, Percentage);

WISHLIST(**WishlistID**, Username, [List_Of_ModelID] );

REVIEW(**ReviewID**, ModelID, Rating, Comment, Username);



<!-- possible tables:
ARRIVALS(CodeArrival, ArrivalDAte, QUantity, CodeProduct, ArrivalTime, CodeSupplier)
SALES_LOG(CodeSale, SellingDate, SellingPrice, CodeProduct, CodeCustomer, CodeInsurance)
PRODUCT(CodeProduct, Model, Category, ReleaseDate, Details, Quantity, Price)
INSURANCE(CodeInsurance, Name)
INSURANCE_PRODUCT(CodeInsurance, CodeProduct, Price)
USERS(CodeUser, Role, Name, Surname, Email, Username, Password, Others, Birthdate)
PROMOTION(CodeProduct, FROM, To, Discount, TypeOfDiscount)
WISHLIST(WishlistCode, CustomerCode, ProductCode)
REVIEWS(CodeProduct, Rating, Comments, Foto(?), CodeUser)
CART(CodeCart, CodeUser, Paid, CodePayment)
CART_PRODUCTS(CodeCart, CodeProduct, Quantity)
PAYMENT_LOG(CodePayment,PaymentDate, PaymentType, Total)

USERS(CodeUser, Role, Name, Surname, Email, Username, Password, Others, Birthdate, WishlistCode)
PRODUCT(CodeProduct, Model, Category, SellingPrice, sellingDate, Details, CodeArrival, ReleaseDate)
ARRIVALS(CodeArrival, Model, Category, ArrivalDate, Quantity, Details, CodeSupplier)
SALES(CodeSale, SellingDate, SellingPrice, CodeProduct, CodeUser, CodePromotion, CodeInsurance)
PROMOTION(CodePromotion, startDate, endDate, Discount)
INSURANCE(CodeInsurance, Name, Type, Description)
WISHLIST(WishlistCode, CustomerCode, ProductCode)
REVIEWS(CodeProduct, Rating, Comments, Fotos, CodeUser)
CART(CodeCart, CodeUser, Paid, CodePayment)
CART_PRODUCTS(CodeCart, CodeProduct, Quantity)
PAYMENT_LOG(CodePayment,PaymentDate, PaymentType, Total) -->


still to do in:
V1
uml class diag - insert
glossary
stories (manager)

UCs:
V1 UCs
- Login
- Logout
- Sign up
- Handle checkout (customer)
- See current cart (customer) (NEW) (UC5)
- Handle cart history
- Register product arrival (manager)
- Delete product (manager)
- Get product info (NEW) (UC13)
- Add product to the cart (customer)
- Remove product from the cart (customer)
- Delete current cart (customer)
- Filter products by category, model and/or sales status
- Get User data by username
- Delete User

V2 UCs
<!-- - Login (same of V1) -->
<!-- - Logout (same of V1) -->
<!-- - Sign up (same of V1, wishlist is created) -->
<!-- - Add default delivery info (from the user page) -->
<!-- - Add default payment details (from the user page) -->
<!-- - Handle checkout (compute total using discounts, add delivery info, add payment info) -->
<!-- - See current cart -->
<!-- - Handle cart history -->
<!-- - Register product arrival (add images here?) -->
<!-- - Delete product (warehouse and online) -->
- Get product info (NEW; get attached images, compute avg reviews, compute actual price (discount)) --> mention it in Stories and Personas + Use cases
<!-- - Add product to the cart -->
<!-- - Remove product from the cart -->
<!-- - Add product to the wishlist -->
<!-- - Remove product from the wishlist -->
<!-- - Remove all product from the wishlist  FR 6.4 --> 
<!-- - Checkout the wishlist -->
<!-- - Delete current cart -->
<!-- - Filter and sort products (add some new categories???) -->
<!-- - Get user data by username -->
<!-- - Delete user -->
<!-- - Manage delivery info (live tracking)? -->
<!-- - Add a new review (mandatory "verified purchase" if customer bought that product?) -->
<!-- - Remove a review -->
<!-- - Change language -->
<!-- - guest user access -->
<!-- - Chatbot - real-time support from a person -->
<!-- - Product return and reimbursement -->
<!-- - light/dark mode -->



v1 GUI TODO:
<!-- - create user - role - make a dropdown menu for Customer, Manager  -->     

v2 GUI TODO:
- manager (delete product from website / DB) 
- manager - checkbox to decide if product registered to inventory is uploded on the site directly
- manager - 2 guis - 1 for inventory view, 1 for product catalogue
- chatbot - add a button in bottom right corner (at most add a small window that pops open after clicking on the bot button)
- customer tracks order - status, linkt to track order (external shippimng company webpage opens)
- customer reimbursement - separate page to make a request for a reimbursement related to a product of an order - go to order history, find order of interest, click on it, go to particular product, 
- manager reimbursement page
- customer 
- delivery page
- button for reviews in order pages     
- add review comments
- change button see cart history to see order history
- checked out cart page -> possibilty to request

- manager landing page -> have a dropdown/radio button to choose which database table to be loaded (inventory or catalogue), to then proceed with filtering or insertion of new product items..., not sure
- inventory page - register product arrival, Model, QTY, Arrival Date, checkbox to upload online directly
- catalogue page - add product to catalogue, Model, Details (see DB design), qty (will be set to 0 initially if model not present), if model already present - receive a msg

- button "delete wishlist"
- window for manager to confirm order sent by customer
- for guest user - no wishlist

- Order page - page with data of 1 partuclar order (past, present)
- ORder History page - page with list of all past orders -> how get to order history page? from Cart/Wishlist page, have a button, "See order history"

- checkout - choose delivery address (defailt or new), same for paymenth method

=====================================================================
<!-- GUI PAGES -->
GUI V1 PAGES
- LOGIN/SIGNUP PAGE V1 - DONE (TBC)
- USER PAGE V1 - DONE (TBC)
- PRODUCTS PAGE V1 - DONE (TBC)
- DETAILED PRODUCT PAGE V1 - DONE (TBC)
- CART PAGE (NOT EMPTY) V1 - DONE (TBC)
- CART PAGE (EMPTY) V1 - DONE (TBC)
- MANAGER LANDING PAGE V1 - DONE (TBC)

GUI V2 PAGES
- LOGIN/SIGNUP PAGE V2 - DONE (TBC)
- USER PAGE V2 - DONE (TBC)
- PRODUCTS PAGE V2 - DONE (TBC)
- DETAILED PRODUCT PAGE - CART CLOSED V2 - DONE (TBC)
- DETAILED PRODUCT PAGE - CART OPEN V2 - DONE (TBC)
- CART PAGE (NOT EMPTY) V2 - DONE (TBC)
- CART PAGE (EMPTY) V2 - DONE (TBC)
- ORDER HISTORY PAGE V2 - DONE (TBC)
- CART PAGE (GUEST) V2 - DONE (TBC)
- INVENTORY PAGE V2
- CATALOGUE PAGE V2
- CHECKOUT PAGE V2
- PASSWORD RESET V2
- MONITOR STATISTICS V2 - si fa molto simile a inventory (filtering, sorting e un BUTTON CONFIRM)
- CHAT interaction Page?
- DISCOUNT PAGE V2 - DONE (TBC)
    - simile a catalogue: se si inseriscono i nuovi valori si puo creare un nuovo discount, altrimenti si clicca su uno dei discount in tabella e si puo fare un DELETE o un MODIFY


=============================================
Customer pages:
- LOGIN/SIGNUP PAGE V2 - DONE (TBC)
- PASSWORD RESET V2
- USER PAGE V2 - DONE (TBC)
- PRODUCTS PAGE V2 - DONE (TBC)
- DETAILED PRODUCT PAGE - CART CLOSED V2 - DONE (TBC)
- DETAILED PRODUCT PAGE - CART OPEN V2 - DONE (TBC)
- CART PAGE (EMPTY) V2 - DONE (TBC)
- CART PAGE (NOT EMPTY) V2 - DONE (TBC)
- ORDER HISTORY PAGE V2 - DONE (TBC)
- CHECKOUT PAGE V2
- CHATBOT interaction Page?

NOTES CUSTOMER
for the customer, by clicking on the EZElectronics logo - go to Products Page
By clicking on a particular product -> go to Detailed Product Page
By clicking on user icon in top right corner - open a dropdown menu with options: User account, Cart & Wishlist, Order History
By adding a product to the cart -> a mini cart on right hand side opens -> have possibility also from the mini cart to go to the Cart And Wishlist page
By adding a product to the wishlist -> an OK msg appears on right hand side opens -> have possib also from mini wishlist to go to Cart and Wishlist page


Guest pages:
- PRODUCTS PAGE V2 - DONE (TBC)
- DETAILED PRODUCT PAGE - CART CLOSED V2 - DONE (TBC)
- DETAILED PRODUCT PAGE - CART OPEN V2 - DONE (TBC)
- CART PAGE (EMPTY) V2 - DONE (TBC)
- CART PAGE (NOT EMPTY) V2 - DONE (TBC)
- CHECKOUT PAGE V2

NOTES GUEST
click on EZElec logo - go to Products Page
click on any Product - go to 


Manager pages:
- LOGIN/SIGNUP PAGE V2 - DONE (TBC)
- PASSWORD RESET V2
- USER PAGE V2 - DONE (TBC)
- INVENTORY PAGE V2
- CATALOGUE PAGE V2
- DISCOUNT PAGE V2 - simile a catalogue: se si inseriscono i nuovi valori si puo creare un nuovo discount, altrimenti si clicca su uno dei discount in tabella e si puo fare un DELETE o un MODIFY

NOTES MANAGER
for the manager put a sort of a navbar with names of main pages: Inventory, Catalogue, Discounts
then the page of the User is reachable through the User icon in top right corner


Business admin pages:
- LOGIN/SIGNUP PAGE V2 - DONE (TBC)
- USER PAGE V2 - DONE (TBC)
- MONITOR STATISTICS V2 - si fa molto simile a inventory (filtering, sorting e un BUTTON CONFIRM)
- PASSWORD RESET V2

NOTES BUSINESS ADMIN
Home page of business admin is Monitor statistics
to go to user page, click on User button in top right corner

DASHBOARDS + TABLES AND DIAGRAMS WITH MULTIPLE CRITERIA: pperiod of time, category, model, discount, reviews 

+ total sales
+ total income
+ total quantity sold


======================================

TODO: MESSAGE POPUPS 

GUI v2
+Catalogue page
    - to delete a product from catalogue - select a single row from Catalog table, then have the options to modify, to delete -> select 'delete' -> pop-up "Are you sure you want to delete product model XYZ?" -> confirm options yes, no -> msg for deletion of prod from cat

(instead of writing from input the product model to be deleted)

<!-- - review UCs + scenarios v2 - Gabri, M. -->
<!-- - write someowhere we have Inventory, Catalogue for Manager -->
<!-- - password reset - FR, UC, Scenarios, Stories and Personas -->

GABRI
- glossary v2 -> to review
- UML class diagram - Gabri, M - look at database design!
<!-- - estimation v1, v2: Gantt diag of v1 -> put it in v2 maybe;, order by product decomposition and by activity decomposition -> copy and paste v1 into v2; put values in v1 reduced by 30 % -->

MINA
<!-- - stories and personas v2 - M (4 stories: Customer, Guest, Manager, Business Admin) -->
    - customer can cancel account only if there are no open orders
- UML class diagram - Gabri, M - look at database design!
<!-- - estimation v1, v2: Gantt diag of v1 -> put it in v2 maybe;, order by product decomposition and by activity decomposition -> copy and paste v1 into v2; put values in v1 reduced by 30 % -->

STEFANO
- GUI - v2
- LOGO - to be made digital (check telegram group)
<!-- - v2 Use Case Diagram - just do it! -> review -->

UTKU
<!-- - add to context diagram - "Call Center Service Provider" -->
<!-- - add to deployment diag - a node "Call Center Service Provider", artifact: APIs, link: Internet -->
<!-- - content v1 -->
<!-- - content v2 -->
<!-- example -->
   <!-- - [Use case 1, UC1](#uc1-register-product-arrival-to-inventory-manager) -->
<!-- -  do another Gantt for v1 -->


<!-- TOdO 04/05 -->
- UML class diag v2 - TODO
- GUI v1 - to review
- GUI v2 - under construction -> check list below for remaining pages
- stories v2 - to review
- glossary v2 - to review
- LOGO - make it digital and add it next to EzElectronics title of each page in v2

- estimation v1- done
- estimation v2 - done

List for GUI v2:
- INVENTORY PAGE V2 --> add screens: remove 1 or more product items from inventory; modify 1 product item -> se corresp use case
- CATALOGUE PAGE V2 --> add screen: remove a product model from catalogue; modify 1 product model ->see corresp use case
- CHECKOUT PAGE V2  --> add to payment method a radio button for Bank Transfer option
- PASSWORD RESET V2 --> TO DO
- CHAT interaction Page --> add chat button in bottom right corner
- DISCOUNT PAGE V2 - simile a catalogue: se si inseriscono i nuovi valori si puo creare un nuovo discount, altrimenti si clicca su uno dei discount in tabella e si puo fare un DELETE o un MODIFY
- add to Manager pages - also Discount button in nav bar for Discount page
- GUEST page -> remove need to login/signup to check out - guest can do checkout without having an account --> see GUEST use case

<!-- TODO LATER-->
- review of entire v1 - everyone - TODO
- review of entire v2 - everyone
- review GUI V1, V2 - everyone
- insert GUI v1 in doc GUI v1
- insert GUI v2 in doc GUI v2


TODO:
- GUI v2 - under construction, see GUI V2 DETAILS below
- UML class diag v2
- logo

GUI V2 DETAILS:
- INVENTORY PAGE V2 --> add screens: remove 1 or more product items from inventory; modify 1 product item -> se corresp use case
- CATALOGUE PAGE V2 --> add screen: remove a product model from catalogue; modify 1 product model ->see corresp use case
- CHECKOUT PAGE V2  --> add to payment method a radio button for Bank Transfer option
- PASSWORD RESET V2 --> TO DO
- CHAT interaction Page --> add chat button in bottom right corner
- DISCOUNT PAGE V2 - simile a catalogue: se si inseriscono i nuovi valori si puo creare un nuovo discount, altrimenti si clicca su uno dei discount in tabella e si puo fare un DELETE o un MODIFY
- add to Manager pages - also Discount button in nav bar for Discount page
- GUEST page -> remove need to login/signup to check out - guest can do checkout without having an account --> see GUEST use case
- CATALOGUE V2 page - in table -> remove Arrival Date col
- catalogue V2 page - how can the Manager see the images of a product model? He/she can click on one of the rows of the catalogue page and under the fields it may be the section with the images
- cam the manager see the orders?


TO REVIEW:
- stories v2
- glossary v2
- estimation v1, v2
- GUI v1



<!-- --------------------------------------------- -->

<!-- TODO 02/05/2024
WHAT TO DO:
-> ALL
- do review v1 
- do review v2

-> Gabri, Mina
- finish UC v2 + scenarios
- v2 stories and personas
- glossary v2
- estimation v2 - product decomposition, activity decomposition, Gantt
- insert GUI v1 in doc GUI v1
- insert GUI v2 in doc GUI 

 -> UTKU
- UML class diagram v2
- estimation v2 - product decomposition (add more hours), activity decomposition (), Gantt

 - > GALANTI
- finish GUI
- v2 Use Case Diagram - don't do it yet, Gabri and M will let you know when
- LOGO - to be made digital (check telegram group)
 -->
