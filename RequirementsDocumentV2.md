# Requirements Document - future EZElectronics

Date: 2024-05-05

Version: V2 - description of EZElectronics in FUTURE form (as proposed by the team)

| Version number |                                                   Change                                                    |     Date      |
| :------------: | :--------------------------------------------------------------------------------------------------------- | :-----------: |
|      v2.0      |                                         Stakeholders, Context Diag                                          |  2024-04-16   |
|      v2.1      |                           discussion + notes on what to do in v2, Business model                            |  2024-04-27   |
|      v2.2      | Stakeholders pt.2, Context diag pt.2, Interfaces, FRs, NFRs, Depl. diag, Glossary pt.1, UML class diag pt.1 |  2024-04-28   |
|      v2.4      |                                                  db design                                                  |  2024-04-29   |
|      v2.4      |                                               FRs, db design                                                |  2024-04-30   |
|      v2.5      |                               Stakeholders, FRs, Context diag, UCs, Scenarios                               |  2024-05-01   |
|      v2.6      |                                            UCs, Scenarios pt.2,                                             |  2024-05-02   |
|      v2.7      |                                     UCs, Scenarios pt.3, UCs reordered                                      | 2024-05-02_03 |
|      v2.8      |                             Stakeholders, Interfaces, UCs & Scenarios, Glossary pt.2                        | 2024-05-03_04 |
|      v2.9      |                                        Context diag, Depl diag, Glossary pt.3                               |  2024-05-04   |
|      v2.10      |                                        UCD, Content for UCs and Scenarios added, Stories                   |  2024-05-04 (2)   |
|      v2.11      |                                        UML class diag, Glossary + Stories checked                          |  2024-05-04_05    |
|      v2.12      |                                        Review, small fixes in stories                                      |  2024-05-05    |


# Contents

- [Requirements Document - future EZElectronics](#requirements-document---future-ezelectronics)
- [Contents](#contents)
- [Business model](#business-model)
- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
  - [Context Diagram](#context-diagram)
  - [Interfaces](#interfaces)
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non Functional Requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
  - [Use case diagram](#use-case-diagram)
   - [Use case 1, UC1](#uc1-register-product-arrival-to-inventory-manager)
      - [Scenario 1.1](#uc1-scenario-11)
      - [Scenario 1.2](#uc1-scenario-12)
      - [Scenario 1.3](#uc1-scenario-13)
      - [Scenario 1.4](#uc1-scenario-14)
    - [Use case 2, UC2](#uc2-delete-product-arrival-from-inventory-manager)
      - [Scenario 1.1](#uc2-scenario-11)
      - [Scenario 1.2](#uc2-scenario-12)
    - [Use case 3, UC3](#uc3-add-product-to-catalogue-manager)
      - [Scenario 1.1](#uc3-scenario-11)
      - [Scenario 1.2](#uc3-scenario-12)
      - [Scenario 1.3](#uc3-scenario-13)
    - [Use case 4, UC4](#uc4-modify-product-in-catalogue-manager)
      - [Scenario 1.1](#uc4-scenario-11)
      - [Scenario 1.2](#uc4-scenario-12)
    - [Use case 5, UC5](#uc5-delete-product-from-catalogue-manager)
      - [Scenario 1.1](#uc5-scenario-11)
      - [Scenario 1.2](#uc5-scenario-12)
    - [Use case 6, UC6](#uc6-retrieve-detailed-data-for-product-model-customer)
      - [Scenario 1.1](#uc6-scenario-11)
      - [Scenario 1.2](#uc6-scenario-12)
    - [Use case 7, UC7](#uc7-filter-products-user)
      - [Scenario 1.1](#uc7-scenario-11)
      - [Scenario 1.2](#uc7-scenario-12)
      - [Scenario 1.3](#uc7-scenario-13)
    - [Use case 8, UC8](#uc8-sort-products-user)
      - [Scenario 1.1](#uc8-scenario-11)
      - [Scenario 1.2](#uc8-scenario-12)
    - [Use case 9, UC9](#uc9-create-customer-account-customer)
      - [Scenario 1.1](#uc9-scenario-11)
      - [Scenario 1.2](#uc9-scenario-12)
      - [Scenario 1.3](#uc9-scenario-13)
    - [Use case 10, UC10](#uc10-create-manager-account-tech-admin)
      - [Scenario 1.1](#uc10-scenario-11)
      - [Scenario 1.2](#uc10-scenario-12)
      - [Scenario 1.3](#uc10-scenario-13)
    - [Use case 11, UC11](#uc11-create-business-admin-account-tech-admin)
      - [Scenario 1.1](#uc11-scenario-11)
      - [Scenario 1.2](#uc11-scenario-12)                 
      - [Scenario 1.3](#uc11-scenario-13)
    - [Use case 12, UC12](#uc12-delete-customer-account-customer)
      - [Scenario 1.1](#uc12-scenario-11)
      - [Scenario 1.1](#uc12-scenario-12)
    - [Use case 13, UC13](#uc13-delete-manager-account-tech-admin)
      - [Scenario 1.1](#uc13-scenario-11)
      - [Scenario 1.2](#uc13-scenario-12)                    
    - [Use case 14, UC14](#uc14-delete-business-admin-account-tech-admin)
      - [Scenario 1.1](#uc14-scenario-11)    
      - [Scenario 1.2](#uc14-scenario-12)
    - [Use case 15, UC15](#uc15-login-user)
      - [Scenario 1.1](#uc15-scenario-11)        
      - [Scenario 1.2](#uc15-scenario-12) 
    - [Use case 16, UC16](#uc16-logout-user)
      - [Scenario 1.1](#uc16-scenario-11)
      - [Scenario 1.2](#uc16-scenario-12)                 
    - [Use case 17, UC17](#uc17-get-personal-user-data-by-username-user)
      - [Scenario 1.1](#uc17-scenario-11)
      - [Scenario 1.2](#uc17-scenario-12)
    - [Use case 18, UC18](#uc18-get-user-data-by-role-tech-admin)
      - [Scenario 1.1](#uc18-scenario-11)
      - [Scenario 1.2](#uc18-scenario-12)
    - [Use case 19, UC19](#uc19-modify-user-account-parameters-customer)
      - [Scenario 1.1](#uc19-scenario-11)
      - [Scenario 1.2](#uc19-scenario-12)
    - [Use case 20, UC20](#uc20-reset-user-password-user)
      - [Scenario 1.1](#uc20-scenario-11)
      - [Scenario 1.2](#uc20-scenario-12)
    - [Use case 21, UC21](#uc21-set-default-delivery-address-customer)
      - [Scenario 1.1](#uc21-scenario-11)
      - [Scenario 1.2](#uc21-scenario-12)
    - [Use case 22, UC22](#uc22-set-default-payment-card-details-customer)
      - [Scenario 1.1](#uc22-scenario-11)
      - [Scenario 1.2](#uc22-scenario-12)
    - [Use case 23, UC23](#uc23-add-product-to-current-cart-customer)
      - [Scenario 1.1](#uc23-scenario-11)
      - [Scenario 1.2](#uc23-scenario-12)
      - [Scenario 1.3](#uc23-scenario-13)
      - [Scenario 1.4](#uc23-scenario-14)
      - [Scenario 1.5](#uc23-scenario-15)
    - [Use case 24, UC24](#uc24-remove-product-from-current-cart-customer)
      - [Scenario 1.1](#uc24-scenario-11)
      - [Scenario 1.2](#uc24-scenario-12)
    - [Use case 25, UC25](#uc25-delete-current-cart-content-customer)
      - [Scenario 1.1](#uc25-scenario-11)
    - [Use case 26, UC26](#uc26-see-current-cart-content-customer)
      - [Scenario 1.1](#uc26-scenario-11)
    - [Use case 27, UC27](#uc27-modify-quantity-of-items-for-a-product-model-in-current-cart-customer)
      - [Scenario 1.1](#uc27-scenario-11)
      - [Scenario 1.2](#uc27-scenario-12)                 
      - [Scenario 1.3](#uc27-scenario-13)
      - [Scenario 1.4](#uc27-scenario-14)
    - [Use case 28, UC28](#uc28-do-cart-checkout-customer)
      - [Scenario 1.1](#uc28-scenario-11)
      - [Scenario 1.2](#uc28-scenario-12)
      - [Scenario 1.3](#uc28-scenario-13)
      - [Scenario 1.4](#uc28-scenario-14)
      - [Scenario 1.5](#uc28-scenario-15)
      - [Scenario 1.6](#uc28-scenario-16)
      - [Scenario 1.7](#uc28-scenario-17)
      - [Scenario 1.8](#uc28-scenario-18)
    - [Use case 29, UC29](#uc29-see-order-history-customer)
      - [Scenario 1.1](#uc29-scenario-11)      
    - [Use case 30, UC30](#uc30-see-past-order-data-customer)
      - [Scenario 1.1](#uc30-scenario-11)    
    - [Use case 31, UC31](#uc31-track-order-customer)
      - [Scenario 1.1](#uc31-scenario-11)        
      - [Scenario 1.2](#uc31-scenario-12) 
      - [Scenario 1.3](#uc31-scenario-13)
    - [Use case 32, UC32](#uc32-see-discounts-manager)
      - [Scenario 1.1](#uc32-scenario-11)
    - [Use case 33, UC33](#uc33-add-discount-manager)
      - [Scenario 1.1](#uc33-scenario-11)
      - [Scenario 1.2](#uc33-scenario-12)
      - [Scenario 1.3](#uc33-scenario-13)
      - [Scenario 1.4](#uc33-scenario-14)
    - [Use case 34, UC34](#uc34-remove-discount-manager)
      - [Scenario 1.1](#uc34-scenario-11)
      - [Scenario 1.2](#uc34-scenario-12)
    - [Use case 35, UC35](#uc35-modify-discount-manager)
      - [Scenario 1.1](#uc35-scenario-11)
      - [Scenario 1.2](#uc35-scenario-12)
      - [Scenario 1.3](#uc35-scenario-13)
      - [Scenario 1.4](#uc35-scenario-14)
    - [Use case 36, UC36](#uc36-see-wishlist-content-customer)
      - [Scenario 1.1](#uc36-scenario-11)
      - [Scenario 1.2](#uc36-scenario-12)
    - [Use case 37, UC37](#uc37-add-product-to-wishlist-customer)
      - [Scenario 1.1](#uc37-scenario-11)
      - [Scenario 1.2](#uc37-scenario-12)
      - [Scenario 1.3](#uc37-scenario-13)
    - [Use case 38, UC38](#uc38-remove-product-from-wishlist-customer)
      - [Scenario 1.1](#uc38-scenario-11)
      - [Scenario 1.2](#uc38-scenario-12)
    - [Use case 39, UC39](#uc39-delete-wishlist-content-customer)
      - [Scenario 1.1](#uc39-scenario-11)
    - [Use case 40, UC40](#uc40-add-product-from-wishlist-to-current-cart-customer)
      - [Scenario 1.1](#uc40-scenario-11)
      - [Scenario 1.2](#uc40-scenario-12)
      - [Scenario 1.3](#uc40-scenario-13)
      - [Scenario 1.4](#uc40-scenario-14)
      - [Scenario 1.5](#uc40-scenario-15)
    - [Use case 41, UC41](#uc41-see-review-customer)
      - [Scenario 1.1](#uc41-scenario-11)
      - [Scenario 1.2](#uc41-scenario-12)
    - [Use case 42, UC42](#uc42-add-review-customer)
      - [Scenario 1.1](#uc42-scenario-11)
      - [Scenario 1.2](#uc42-scenario-12)
    - [Use case 43, UC43](#uc43-delete-review-customer)
      - [Scenario 1.1](#uc43-scenario-11)
    - [Use case 44, UC44](#uc44-modify-review-customer)
      - [Scenario 1.1](#uc44-scenario-11)
      - [Scenario 1.2](#uc44-scenario-12)
    - [Use case 45, UC45](#uc45-change-language-user)
      - [Scenario 1.1](#uc45-scenario-11)
      - [Scenario 1.2](#uc45-scenario-12)                 
    - [Use case 46, UC46](#uc46-chat-interaction-customer)
      - [Scenario 1.1](#uc46-scenario-11)  
      - [Scenario 1.2](#uc46-scenario-12)   
    - [Use case 47, UC47](#uc47-switch-to-lightdark-mode-user)
      - [Scenario 1.1](#uc47-scenario-11)        
      - [Scenario 1.2](#uc47-scenario-12) 
    - [Use case 48, UC48](#uc48-guest-access-guest)
      - [Scenario 1.1](#uc48-scenario-11)
      - [Scenario 1.2](#uc48-scenario-12)                 
      - [Scenario 1.3](#uc48-scenario-13)   
    - [Use case 49, UC49](#uc49-compute-statistics-business-admin)
      - [Scenario 1.1](#uc49-scenario-11)
      - [Scenario 1.2](#uc49-scenario-12)                 
- [Glossary](#glossary)
- [Deployment Diagram](#deployment-diagram)

# Informal description

EZElectronics (read EaSy Electronics) is a software application designed to help managers of electronics stores to manage their products and offer them to customers through a dedicated website. Managers can assess the available products, record new ones, and confirm purchases. Customers can see available products, add them to a cart and see the history of their past purchases.

# Business model

A company specialized in selling electronics products called EZElectronics reaches our team <!--(team 9 - the best team in the universe! X_X)-->with a request to create a web application for selling electronics products online.

- the client is EZElectronics.
- the SW Development company is team 9 (i.e. our team).
- who pays for development and operation - the client pays to the SW Development company for the development of the web app
- external advertisement is omitted inside the web app
- who writes data to website, i.e. who registers new products on the website - EZElectronics managers
- who reads data from website:
  - who buys the products on the website - EZElectronics customers
  - who manages the product availability on the website - EZElectronics managers
  - who compute statistics about products - EZElectronics business admins

# Stakeholders

|       Stakeholder name       |                                                                         Description                                                                         |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          Customers           |                              Users interested in buying products offered by EZElectronics registered with a Customer account.                               |
|          Guest User          |                       User interested in buying products offered by EZElectronics without being regestiered, i.e. without an account.                       |
|          Tech Admin          |                                                     Those responsible for maintaining the application.                                                      |
|           Managers           |                        Those directly responsible for managing the products, inventory and sales, registered with a Manager account.                        |
|        SW Dev Company        |                                                      Those responsible for developing the application.                                                      |
|   Payment Service Provider   |                          A payment service provider is a third-party company that allows businesses to accept electronic payments                           |
|        Business Admin        |                         Those who analyse statistics with a Business Admin account to come up with ideas and plans to sell things.                          |
|          Investors           |                                        Those who allocate financial capital with the expectation of a future profit.                                        |
|      Regulatory Bodies       |                                                    Those who deal with regulations and data protection.                                                     |
|         Competitors          |                                       Organizations engaged in commercial or economic competition with EzElectronics.                                       |
|       Shipping Company       |                         External entity managing the distribution of orders from EZElectronics website to Customer and vice versa.                          |
| Call Center Service Provider | External entity managing the communication with Customers of EZElectronics by providing further information on product specifications and order management. |

# Context Diagram and Interfaces

## Context Diagram

![](/images/Context_Diagram_V2.png)

## Interface

|            Actor             | Logical Interface | Physical Interface |
| :-------------------------- | :--------------- | :---------------- |
|          Customers           |   Browser (GUI)   |   PC + internet    |
|        Guest customer        |   Browser (GUI)   |   PC + internet    |
|           Managers           |   Browser (GUI)   |   PC + internet    |
|         Tech Admins          |     Terminal      |   PC + intranet    |
|        SW Dev Company        | Browser(GUI)+IDE  |   PC + internet    |
|        Business Admin        |   Browser (GUI)   |   PC + internet    |
|   Payment Service Provider   |       APIs        |      internet      |
|       Shipping Company       |       APIs        |      internet      |
| Call Center Service Provider |       APIs        |      internet      |

# Stories and personas

### STORY 1: Customer with an account buys products (Customer)

A user accesses EzElectronics website to buy some products.
The user may firstly create an account on the EzElectronics website and then proceed with browsing products (i.e. they are considered to be a Customer) or may directly start browsing products without being logged into an account (i.e. they are considered to be a Guest user).
The Customer may register on the EzElectronics website by going to a dedicated page for account creation and filling up all requested mandatory parameters for an account (name, surname, email, username (unique), password) and possibly some optional paramenters (telephone number, birthdate). After creating their account, the Customer is redirected to the page with all products offered by EzElectronics. The Customer may apply some filters to the produts (category, model, price, average rating, brand, discount) and/or sort the products (by price, average rating or release date of product). To see more details for a given product, the Customer may click on any product to get redirected to a dedicated page where further details, more images and a list of reviews for the selected product are provided. The Customer may add any product offered by EzElectronics to their cart and/or to their wishlist. Once the Customer adds a product to their cart, a small window with a "mini" view of the cart pops up containing the just added product and any other product added to the cart previously. In any later moment, the Customer may remove from their cart/wishlist any previously added product or delete the entire content of their cart/wishlist. In the cart (either from the mini-view of the cart or on a dedicated page to the cart), the Customer may increase/decrease the quantity (number of units) of any product model that has already been added to cart. At any time, the Customer can see the content of their cart and wishlist on a dedicated page for the cart and the wishlist. Moreover, the Customer may add a product from their wishlist to the cart. The Customer may decide to modify their account data, set uo/modify their default delivery address and/or their default card payment data, or delete their account on a dedicated page for the user account data. To finalize the online shopping, the Customer must do checkout of their cart. In the checkout process, the Customer may select their default delivery address and/or their default payment data or provide others. After an order is made, the Customer may track the status of their order on a dedicated page and may be redirected to a tracking page of an external shipping company to track the order. Once the order is delivered to the Customer, at any moment later, they may provide a review for any purchased product from EzElectronics' website by submitting a mandatory 1-to-5 star rating and, optionally, inserting a text comment. After a review is submitted, the Customer may modify or delete it in any moment later. A list of all past orders is kept and gets updated when a new order is made. The Customer may decide to log out of their account in any moment. The contents of the wishlist and the cart remain saved after the Customer is logged out of their account and are reloaded every time when the Customer logs in into their account on EzElectronics website with their credentials (username and password). The Customer may reset their password at any moment.

### STORY 2: Manager manages product items, product models and discounts (Manager)

A user accesses EzElectronics website to manage the available product items, product models and discounts offered by EzElectronics website.
The user must log in with an account with role 'Manager' (i.e. they are considered to be a Manager). Their account is created beforehand by a Tech admin employee of EzElectronics and the Manager is provided in advance with the necessary login credentials (unique username and password) to be able to access EzElectronics website with the respective role.
After being logged in, the Manager may access a list of pages dedicated respectively to the EzElectronics Inventory, Catalogue and Discounts database tables. On each of these pages, the Manager may see all entries in the form of tables and possibly may filter the entries in the tables by some filtering criteria: category, model, sales status (only sold, only unsold, or both) and/or sort the table entries by clicking onto the column name header. On the EzElectronics Inventory page, the Manager may register the arrival of N product items of a certain product model XYZ with arrival date YYYY-MM-DD, and may remove already registered product items from the EzElectronics Inventory database table. On the EzElectronics Catalogue page, the Manager may add a new product model with additional parameters: category, price, brand, release date, details, image(s), and may modify/delete an already existing product model entry. On the EzElectronics Discounts page, the Manager may add a discount for a product model or a category with additional parameters: start date, end date, percentage, and may modify/delete an already existing discount entry. The Manager may see their user account data on a dedicated page and may log out of their account and reset their user account password at any moment.

### STORY 3: Customer without an account buys products (Guest user)

A user accesses EzElectronics website to buy some products.
The user may directly start browsing products without being logged into an account (i.e. they are considered to be a Guest user).
By accessing EzElectronics website, the Guest user is redirected to the page with all products offered by EzElectronics. The Guest user may apply some filters to the produts (category, model, price, average rating, brand, discount amount) and/or sort the products (by price, average rating or release date of product). To see more details for a given product, the Guest user may click on any product to get redirected to a dedicated page where further details, more images and a list of reviews for the selected product are provided. The Guest user may add any product offered by EzElectronics to their cart. Once the Guest user adds a product to their cart, a small window with a "mini" view of the cart pops up containing the just added product and any other product added to the cart previously. In any later moment, the Guest user may remove from their cart any previously added product or delete the entire content of their cart. In the cart (either from the mini-view of the cart or on a dedicated page to the cart), the Guest user may increase/decrease the quantity (number of units) of any product model that has already been added to cart. At any time, the Guest user can see the content of their cart on a dedicated page to the cart and the wishlist. To finalize the online shopping, the Guest user must do checkout of their cart. In the checkout process, the Guest user must provide a delivery address and payment data or instead may sign up/log in and choose the default delivery address and/or the default payment data associated to the account. After an order is made, the Guest user may track the status of their order with a corresponding tracking code provided by email after checkout is completed. Then the order status may be monitored by accessing a tracking page of an external shipping company. 

(The Guest user must be logged in with an account (i.e. they become a Customer, see STORY 1) in order to have a wishlist, to have wishlist content saved, to add products from wishlist to cart, to keep track of order history, to leave/modify reviews for purchased products, to set up/modify a default delivery address and/or default payment data.)

### STORY 4: Business Admin monitors statistics (Business Admin)

A user accesses EzElectronics website to monitor some statistics related to EzElectronics KPIs.
The user must log in with an account with role 'Business Admin' (i.e. they are considered to be a Business Admin). Their account is created beforehand by a Tech admin employee of EzElectronics and the Business Admin is provided in advance with the necessary login credentials (unique username and password) to be able to access EzElectronics website with the respective role.
After being logged in, the Business Admin may access interactive dashboards, tables, plots and diagrams by selecting one or more criteria: category, model, discount, reviews and specifying the time interval over which the related statistics should be computed. Immediate summary statistics about #Customers, Total Income, #Sold Product Items, #Total Orders are availble for the 'Last 24 hours', 'Last week', 'Last month', 'Last year' and a 'Custom time period'. The Business Admin may see their user account data on a dedicated page and may log out of their account and reset their user account password at any moment.

# Functional and non functional requirements

## Functional Requirements

| ID        | Description                                                      |
| :-------- | :--------------------------------------------------------------- |
| FR1       | Manage products                                                  |
| FR1.1     | Register product arrival to inventory                            |
| FR1.2     | Delete product arrival from inventory                            |
| FR1.3     | Add product to catalogue                                         |
| FR1.4     | Modify product in catalogue                                      |
| FR1.5     | Delete product from catalogue                                    |
| FR1.6     | Retrieve detailed data for product model                         |
| FR1.7     | Retrieve multiple product info                                   |
| FR1.7.1   | Filter product(s)                                                |
| FR1.7.1.1 | Filter by category                                               |
| FR1.7.1.2 | Filter by model                                                  |
| FR1.7.1.3 | Filter by sales status (sold/unsold)                             |
| FR1.7.1.4 | Filter by price                                                  |
| FR1.7.1.5 | Filter by brand                                                  |
| FR1.7.1.6 | Filter by average rating of reviews                              |
| FR1.7.1.7 | Filter by discount                                               |
| FR1.8     | Sort product(s)                                                  |
| FR1.8.1   | Sort by price                                                    |
| FR1.8.2   | Sort by average rating of reviews                                |
| FR1.8.3   | Sort by release date (newest-oldest)                             |
| FR1.9     | Add/Delete image(s) of product model                             |
|           |                                                                  |
| FR2       | Manage user accounts                                             |
| FR2.1     | Create user account                                              |
| FR2.1.1   | Create Customer account                                          |
| FR2.1.2   | Create Manager account                                           |
| FR2.1.3   | Create Business Admin account                                    |
| FR2.2     | Delete user account                                              |
| FR2.2.1   | Delete Customer account                                          |
| FR2.2.2   | Delete Manager account                                           |
| FR2.2.3   | Delete Business Admin account                                    |
| FR2.3     | Authentication of user account (login, logout)                   |
| FR2.4     | Retrieve single user(s) account info by username                 |
| FR2.5     | Retrieve multiple user(s) account info by role                   |
| FR2.6     | Modify user account parameters                                   |
| FR2.7     | Reset user password                                              |
| FR2.8     | Set default delivery address                                     |
| FR2.9     | Set default payment card details                                 |
|           |                                                                  |
| FR3       | Manage carts                                                     |
| FR3.1     | Create cart                                                      |
| FR3.2     | Add product to the current cart                                  |
| FR3.3     | Remove product from the current cart                             |
| FR3.4     | Delete current cart content                                      |
| FR3.5     | See products of the current cart                                 |
| FR3.6     | Modify quantity of items for a product model in the current cart |
| FR3.7     | Check out current cart                                           |
|           |                                                                  |
| FR4       | Manage orders                                                    |
| FR4.1     | Mark product as sold                                             |
| FR4.2     | Compute final price with discounts                               |
| FR4.3     | Manage payment methods                                           |
| FR4.4     | Include and validate delivery address                            |
| FR4.5     | See order history                                                |
| FR4.6     | See past order data                                              |
| FR4.7     | Track order                                                      |
|           |                                                                  |
| FR5       | Manage discounts                                                 |
| FR5.1     | See discount(s)                                                  |
| FR5.2     | Add discount per model/category                                  |
| FR5.3     | Remove discount per model/category                               |
| FR5.4     | Modify discount per model/category                               |
|           |                                                                  |
| FR6       | Manage wishlist                                                  |
| FR6.1     | Create wishlist                                                  |
| FR6.2     | See product(s) in wishlist                                       |
| FR6.3     | Add product(s) to wishlist                                       |
| FR6.4     | Remove product(s) from wishlist                                  |
| FR6.5     | Delete wishlist content                                          |
| FR6.6     | Add product(s) from wishlist to cart                             |
|           |                                                                  |
| FR7       | Manage reviews                                                   |
| FR7.1     | See review                                                       |
| FR7.2     | Add review (for purchased product)                               |
| FR7.3     | Delete review                                                    |
| FR7.4     | Modify review                                                    |
| FR7.5     | Compute average rating of reviews                                |
|           |                                                                  |
| FR8       | Change Language                                                  |
| FR8.1     | IT translation                                                   |
| FR8.2     | EN translation                                                   |
|           |                                                                  |
| FR9       | Chat support offered by a call center service provider           |
|           |                                                                  |
| FR10      | Switch to dark/light mode                                        |
|           |                                                                  |
| FR11      | Manage Guest access                                              |
|           |                                                                  |
| FR12      | Compute statistics                                               |

## Non Functional Requirements

|   ID   |                   Type                   |                                                      Description                                                       |         Refers to         |
| :---- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------- |
|  NFR1  |        Reliability / Availability        |                                                                                                                        |    [FR1-FR7],FR11-FR12    |
| NFR1.1 |                  Uptime                  |                                   Website should be up and working 99.9% of the time                                   |          All FRs          |
| NFR1.2 |               Data backups               |                                          Regular backups to prevent data loss                                          |        [FR1-FR7], FR12        |
| NFR1.2 |            Disaster recovery             |                  Ability to recover from a catastrophic failure and get back to operational activity                   |        [FR1-FR7], FR12        |
|        |                                          |                                                                                                                        |                           |
|  NFR2  |                 Security                 |                                                                                                                        |         [FR1-FR4],11          |
| NFR2.1 |           Password encryption            |                                 User passwords should be encrypted and stored securely                                 | FR2.1,FR2.3,[FR2.5-FR2.7] |
| NFR2.2 |              Authentication              |                             Users have access to all functionalities after authentication                              |           FR2.3           |
| NFR2.3 |       Secure payment transactions        |                              User can pay securely and his/her payment data are encrypted                              |        FR3.5, FR4         |
| NFR2.4 | Protection of user data and payment info |                                           Treat user data in a secure manner                                           |        FR2, FR4.3         |
|        |                                          |                                                                                                                        |                           |
|  NFR3  |                Usability                 |                                                                                                                        |          All FRs          |
| NFR3.1 |                   GUI                    |                                         User-friendly and intuitive interface                                          |          All FRs          |
| NFR3.2 |             Functionalities              |                                         Existence of functions needed by user                                          |   [FR1-FR4], [FR7-FR9]    |
| NFR3.3 |           Language translation           |               Accessibility offered in Italian and English language to target a wider range of customers               |            FR8            |
| NFR3.4 |                Guest user                |               Functionalities of the website are provided without necessarily having a personal account                |           FR11            |
| NFR3.5 |             Dark/Light Mode              |               Possibility to switch between two modes for each webpage (dark and light) to adapt better                |           FR10            |
|        |                                          |                                                                                                                        |                           |
|  NFR4  |               Performance                |                                                                                                                        |    [FR1-FR5], FR7, FR12     |
| NFR4.1 |                Throughput                |                           Server should support a minimum of 5000 users without degradation                            |    [FR1-FR4], FR7, FR11     |
|        |                                          |                                                                                                                        |                           |
|  NFR5  |                Efficiency                |                                                                                                                        |   [FR1-FR7], FR11, FR12   |
| NFR5.1 |              Response time               |                                Response time per user function should be lower than 1s                                 |          All FRs          |
|        |                                          |                                                                                                                        |                           |
|  NFR6  |              Compatibility               |                     Functionalities offered by website are available in different Browser versions                     |          All FRs          |
|        |                                          |                                                                                                                        |                           |
|  NFR7  |             Maintainability              | Code and files should be well structured and formatted to facilitate maintenance operations, deployment and versioning |          All FRs          |
|        |                                          |                                                                                                                        |                           |

# Use case diagram and use cases

## Use case diagram

![](/images/UCD_V2.png)

### UC1, REGISTER PRODUCT ARRIVAL TO INVENTORY (MANAGER)

|   Actors Involved    |                                                   Manager                                                    |
| :------------------: | :----------------------------------------------------------------------------------------------------------: |
| Informal description |                  Manager wants to register product arrival(s) to the Inventory.                   |
|     Precondition     |                  Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.                                             |
|    Post condition    |                        A product arrival is registered in the Inventory.                        |
|   Nominal Scenario   |     Manager registers a product arrival to Inventory (product model already exists in the Catalogue). (1.1)     |
|       Variants       | Manager registers a product arrival to Inventory (product model does not exist in the Catalogue). (1.2) |
|      Exceptions      |                             Error occurs: Arrival date after current date. (1.3)                             |
|      Exceptions      |                  Error occurs: Product code already exists in Inventory. (1.4)                  |

#### UC1 SCENARIO 1.1

|  Scenario 1.1  |    Manager registers a product arrival to the Inventory. Product model already exists in the Catalogue     |                                                                          |
| :------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|  Precondition  |         Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.          |                                                                          |
| Post condition |                      A product arrival of N items of a product model is registered in the Inventory.      |                                                                          |
|   **Step#**    |                                            **Actor: Manager**                                            |                                **System**                                |
|       1        | Insert all necessary parameters to register the arrival of N items of a specific product model. |                     |
|       2        |                                                                                                          |        Check if current date is after arrival date. Check OK.         |
|       3        |                                                                                     | Check if item code for each product item to be registered is not present in Inventory. Check OK. |
|       4        |                                                                                                          |       Check if product model exists in the Catalogue. Check OK.       |
|       5        |                                                                                                          |           Register arrival of N items of product model in Inventory.            |
|       6        |                                                                                                          |                Update quantity for corresponding product model in Catalogue.   |
|       7        |                                                                                                          | Show confirmation message to Manager of product arrival registered successfully. |

#### UC1 SCENARIO 1.2

|  Scenario 1.2  | Manager registers a product arrival to the Inventory. Product model does not exist in the Catalogue |                                                                          |
| :------------: | :-------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|  Precondition  |         Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.          |                                                                          |
| Post condition |                      A product arrival of N items of a product model is registered in the Inventory.     |                                                                          |
|   **Step#**    |                                            **Actor: Manager**                                             |                                **System**                                |
|       1        | Insert all necessary parameters to register the arrival of N items of a specific product model. |                     |
|       2        |                                                                                                          |        Check if current date is after arrival date. Check OK.         |
|       3        |                                                                                     | Check if item code for each product item to be registered is not present in Inventory. Check OK. |
|       4        |                                                                                                           |     Check if product model exists in the Catalogue. Check NOT ok.     |
|       5        |                                                                                                           |               Insert product model to Catalogue.               |
|       6        |                                                                                                          |   Register arrival of N items of product model in Inventory.            |
|       7        |                                                                                                |  Update quantity for corresponding product model in Catalogue.                |
|       8        |                                                                                                           | Show confirmation message to Manager for product arrival registered successfully. |

#### UC1 SCENARIO 1.3

|  Scenario 1.3  |                                     Arrival date after current date.                                     |                                                                    |
| :------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------: |
|  Precondition  |         Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.          |                                                                          |
| Post condition |                      A product arrival of N items of a product model is NOT registered in the Inventory.       |                                                                          |
|   **Step#**    |                                            **Actor: Manager**                                            |                             **System**                             |
|       1        | Insert all necessary parameters to register the arrival of N items of a specific product model. |                     |
|       2        |                                                                                                          |        Check if current date is after arrival date. Check NOT OK.         |
|       3        |                                                                                                          | Show error message to Manager for arrival date after current date. |

#### UC1 SCENARIO 1.4

|  Scenario 1.4  |                          Product code already exists in Inventory.   |                                                                                           |
| :------------: | :-------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
|  Precondition  |         Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.          |                                                                          |
| Post condition |                      A product arrival of N items of a product model is NOT registered in the Inventory.         |                                                                          |
|   **Step#**    |                                            **Actor: Manager**                                            |                                        **System**     |
|       1        | Insert all necessary parameters to register the arrival of N items of a specific product model. |                     |
|       2        |                                                                                                          |        Check if current date is after arrival date. Check OK.         |
|       3        |                                                                                     | Check if item code for each product item to be registered is not present in Inventory. Check NOT OK. |
|       4        |                                                                                  | Show error message to Manager about item code already present in Inventory. |

### UC2, DELETE PRODUCT ARRIVAL FROM INVENTORY (MANAGER)

|   Actors Involved    |                             Manager                             |
| :------------------: | :-------------------------------------------------------------: |
| Informal description | Manager deletes a product item from Inventory. |
|     Precondition     |   Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.                       |
|    Post condition    |   A specific product item is deleted from Inventory.    |
|   Nominal Scenario   |  A product item is deleted successfully from the Inventory. (1.1)  |
|       Variants       |                                                                 |
|      Exceptions      |           Error occurs: Product item does not exist. (1.2)           |

#### UC2 SCENARIO 1.1

|  Scenario 1.1  |     A product item is deleted successfully from the Inventory.      |                                                             |
| :------------: | :--------------------------------------------------------------: | :---------------------------------------------------------: |
|     Precondition     |    Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.                      |
| Post condition |  A product item is successfully deleted from Inventory.   |                                                             |
|   **Step#**    |                        **Actor: Manager**                        |                         **System**                          |
|       1        | Input code of product item code to be deleted. |                                                             |
|       2        |                                                                  | Check if code of product item exists in Inventory. Check OK. |
|       3        |                                                                  | Delete code of product item from Inventory. |
|       4        |                                                                  |  Update quantity for corresponding product model in Catalogue.                |
|       5        |                                                                  |  Show confirmation message to Manager for successfull deletion of product item from Inventory.    |

#### UC2 SCENARIO 1.2

|  Scenario 1.2  |                     Product item does not exist.                      |                                                                 |
| :------------: | :--------------------------------------------------------------: | :-------------------------------------------------------------: |
|     Precondition     |    Manager is logged in by means of an account with role 'Manager'. "Inventory Page" is loaded.                      |
| Post condition |       A product is NOT deleted from Inventory.       |                                                                 |
|   **Step#**    |                        **Actor: Manager**                        |                           **System**                            |
|       1        | Input code of product item code to be deleted. |                                                                 |
|       2        |                                                                  | Check if code of product item exists in Inventory. Check OK. |
|       3        |                                                                  |  Show error message to Manager about not existing product.    |

### UC3, ADD PRODUCT TO CATALOGUE (MANAGER)

|   Actors Involved    |                                  Manager                                  |
| :------------------: | :-----------------------------------------------------------------------: |
| Informal description | Manager wants to insert a product model to Catalogue. |
|     Precondition     |    Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.     |
|    Post condition    |             Manager has inserted a product model to Catalogue.              |
|   Nominal Scenario   |          A product model is inserted successfully to Catalogue.          |
|       Variants       |                                                                           |
|      Exceptions      |      Error occurs: Invalid input parameters of product model. (1.2)       |
|      Exceptions      |    Error occurs: Product model already present in Catalogue. (1.3)    |

#### UC3 SCENARIO 1.1

|  Scenario 1.1  |                  A product model is inserted successfully to Catalogue.                  |                                                                            |
| :------------: | :---------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |   Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |                                                        |
| Post condition |                  A product model is inserted successfully to Catalogue.                  |                                                                            |
|   **Step#**    |                                    **Actor: Manager**                                     |                                 **System**                                 |
|       2        | Insert zero or more images of the product model to be added to Catalogue.     |                                                                            |
|       1        | Insert all necessary parameters of a product model to be added to Catalogue. |                                                                            |
|       3        |                                                                                           |         Check if product model parameters are valid. Check ok.         |
|       4        |                                                                                           |         Check if product model not present in Catalogue. Check ok.         |
|       5        |                                                                                           |          Insert product model to Catalogue.                       |
|       6        |                                                                                           | Show confirmation message to Manager for product model inserted successfully to Catalogue. |

#### UC3 SCENARIO 1.2

|  Scenario 1.2  |                        Invalid input parameters of product model.                         |                                                                     |
| :------------: | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------------------: |
|  Precondition  |   Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |                                                                     |
| Post condition |                      A product model is NOT inserted to Catalogue.                       |                                                                     |
|   **Step#**    |                                    **Actor: Manager**                                     |                             **System**                              |
|       1        | Insert all necessary parameters of a product model to be added to Catalogue. |                                                                     |
|       2        | Insert zero or more images of the product model to be added to Catalogue.     |                                                                            |
|       3        |                                                                                           |     Check if product model parameters are valid. Check NOT ok.      |
|       4        |                                                                                           | Show error message to Manager for invalid product model parameters. |

#### UC3 SCENARIO 1.3

|  Scenario 1.3  |                      Product model already present in Catalogue.                      |                                                                              |
| :------------: | :---------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|  Precondition  |            Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |                                  |
| Post condition |                     A product is NOT inserted successfully to Catalogue.                     |                                                                              |
|   **Step#**    |                                    **Actor: Manager**                                     |                                  **System**                                  |
|       1        | Insert all necessary parameters of a product model to be added to Catalogue. |                                                                              |
|       2        | Insert zero or more images of the product model to be added to Catalogue.     |                                                                            |
|       3        |                                                                                           |            Check if product model parameters are valid. Check ok.            |
|       4        |                                                                                           |        Check if product model not present in Catalogue. Check NOT ok.        |
|       5        |                                                                                           | Show error message to Manager for product model already present in Catalogue. |

### UC4, MODIFY PRODUCT IN CATALOGUE (MANAGER)

|   Actors Involved    |                                                Manager                                                |
| :------------------: | :---------------------------------------------------------------------------------------------------: |
| Informal description | Manager wants to modify the data of an existing product model in Catalogue. |
|  Precondition  |   Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |                                                        |
|    Post condition    |                    Manager has modified product model data in Catalogue.                     |
|   Nominal Scenario   |                   Product model data are modified successfully in Catalogue. (1.1)                    |
|       Variants       |                                                                                                       |
|      Exceptions      |                    Error occurs: Invalid input parameters of product model. (1.2)                     |

#### UC4 SCENARIO 1.1

|  Scenario 1.1  | Product model data are modified successfully in the catalogue           |                                                    |
| :------------: | :--------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|  Precondition  |   Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |                                                        |
| Post condition |        Product model data are modified successfully in Catalogue.        |
|   **Step#**    |                              **Actor: Manager**                              |                                                        **System**            |
|       1        | Select an existing product model to be modified in Catalogue. |                                                                                                                          |
|       2        |                                                                    | Show details of selected product model. Wait user to input values for one or more data fields that can be modified. |
|       3        |              Input values for field(s) to be modified. Confirm.     |                                                                                                                          |
|       4        |                                                                              |                                  Check if product model parameters are valid. Check ok.                 |
|       5        |                                                                              |                                     Update product model with the new values in Catalogue.                 |
|       6        |                                                                              |                    Show confirmation message to Manager for product model data modified successfully.    |

#### UC4 SCENARIO 1.2

|  Scenario 1.2  |                  Invalid input parameters of product model                   |                                                                                                                          |
| :------------: | :--------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|  Precondition  |   Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |                                                        |
| Post condition |            Product model data are NOT modified in Catalogue.             |
|   **Step#**    |                              **Actor: Manager**                              |                                                        **System**                                                        |
|       1        | Select an existing product model to be modified in Catalogue. |                                                                                                                          |
|       2        |                                                                              | Show details of selected product model. Wait user to input values for one or more data fields that can be modified. |
|       3        |              Input values for field(s) to be modified. Confirm.   |                                                            |
|       4        |                                                                              |                                Check if product model parameters are valid. Check NOT ok.                |
|       5        |                                                                              |                           Show error message to Manager for invalid product model parameters.                            |

### UC5, DELETE PRODUCT FROM CATALOGUE (MANAGER)

|   Actors Involved    |                                          Manager                                          |
| :------------------: | :---------------------------------------------------------------------------------------: |
| Informal description |         Manager wants to delete a product model from Catalogue.         |
|     Precondition     |            Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.             |
|    Post condition    |                    Manager has deleted a product model from Catalogue.                    |
|   Nominal Scenario   |             A product model is deleted successfully from Catalogue. (1.1)             |
|       Variants       |                                                                                           |
|      Exceptions      | Error occurs: Product model cannot be deleted (product model present in inventory). (1.2) |

#### UC5 SCENARIO 1.1

|  Scenario 1.1  |    A product model is deleted successfully from Catalogue.     |                                                                                             |
| :------------: | :----------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|  Precondition  | Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded. |                                                                                             |
| Post condition |           A product model is deleted from the Catalogue.           |                                                                                             |
|   **Step#**    |                         **Actor: Manager**                         |                                         **System**                                          |
|       1        | Select a product model to be deleted from Catalogue.  |                                                                                             |
|       2        | Click on 'Delete product model' button to delete the selected product model.  |                                                       |
|       3        |                                                                    |               Check if product model not present in Inventory. Check ok.                |
|       4        |                                                                    |                            Delete selected product model from Catalogue.                             |
|       5        |                                                                    | Show confirmation message to Manager for product model deleted successfully from Catalogue. |

#### UC5 SCENARIO 1.2

|  Scenario 1.2  | Product model cannot be deleted (product model present in Inventory) |                                                                             |
| :------------: | :------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|  Precondition  |  Manager is logged in by means of an account with role 'Manager'. "Catalogue" page is loaded.  |                                                                             |
| Post condition |          A product model is NOT deleted from Catalogue.          |                                                                             |
|   **Step#**    |                          **Actor: Manager**                          |                                 **System**                                  |
|       1        | Select a product model to be deleted from Catalogue.  |                                                                                             |
|       2        | Click on 'Delete product model' button to delete the selected product model.  |                                                       |
|       3        |                                                                      |     Check if product model not present in Inventory. Check NOT ok.      |
|       4        |                                                                      | Show error message to Manager for product model NOT deleted from Catalogue. |


### UC6, RETRIEVE DETAILED DATA FOR PRODUCT MODEL (CUSTOMER)

|   Actors Involved    |                                     Customer                                      |
| :------------------: | :-----------------------------------------------------------------------------------------------: |
| Informal description | Customer wants to retrieve detailed product data by clicking on a product model on "Products" page. |
|     Precondition     |             Customer is logged in by means of an account with role 'Customer'. "Products" page is loaded.             |
|    Post condition    |                             Customer retrieves detailed data about product model.                             |
|   Nominal Scenario   |                          Detailed data about product model is retrieved successfully. (1.1)                          |
|       Variants       |                                                                                                   |
|      Exceptions      |                     Error occurs (404): Selected product model does not exist. (1.2)                      |

#### UC6 SCENARIO 1.1

|  Scenario 1.1  |                 Detailed data about product model is retrieved successfully.                |                                                      |
| :------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------: |
|  Precondition  | Customer is logged in by means of an account with role 'Customer'. "Products" page is loaded. |                                                      |
| Post condition |                 Customer retrieves detailed data about product model.                 |                                                      |
|   **Step#**    |                            **Actor: Customer**                            |                      **System**                      |
|       1        |                    Select a product model.                    |                                                      |
|       2        |                                                                           | Query Catalogue for selected product model. Retrieve all data about the selected product model. |
|       3        |                                                                           |            Load "Detailed product" page.             |
|       4        |                                                                           |            Show detailed data about product model to Customer.            |

#### UC6 SCENARIO 1.2

|  Scenario 1.2  |                      Selected product model does not exist.                       |                                                                         |
| :------------: | :-----------------------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  | Customer is logged in by means of an account with role 'Customer'. "Products" page is loaded. |                                                      |
| Post condition |                 Customer does NOT retrieve detailed data about product model.                 |                                                      |
|   **Step#**    |                            **Actor: Customer**                            |                               **System**                                |
|       1        |                    Selects a product model.                    |                                                      |
|       2        |                                                                           |          Error occurs while querying Catalogue about the selected product model.           |
|       3        |                                                                           | Show error message to Customer for unsuccessful retrieval of detailed data for selected product model. |


### UC7, FILTER PRODUCTS (USER)

|   Actors Involved    |          User (Customer, Manager, Business Admin)                            |
| :------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| Informal description | A Customer can filter products in "Products" page. A Manager can filter products in "Inventory" page and "Catalogue" page and discounts for product/category in "Discount" page. A Business Admin can filter products in "Monitor Statistics" page. A User can filter products by one or more of the following criteria: category, model, price, brand, average rating, discount. A Manager and a Business Admin can additionally filter products by sales status (sold, unsold). A Manager can filter discounts by one or more of the following criteria: start date, end date, category, model, discount value. |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager' or 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory", "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. |
|    Post condition    |                                          Products or discounts are filtered by one or more filtering criteria.                                                                         |
|   Nominal Scenario   |                               Filter products or discounts by filtering criteria. Show a non-empty list of filtered products to User. (1.1)                        |
|       Variants       |                               Filter products or discounts by filtering criteria. Show an empty list of filtered products to User. (1.2)         |
|      Exceptions      |                     Error occurs: Products or discounts are not filtered. (1.3)                                                                 |

#### UC7 SCENARIO 1.1

|  Scenario 1.1  |                    Filter products or discounts by filtering criteria. Show a non-empty list of filtered products to User.                     |                                                               |
| :------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager', 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory", "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. ||
| Post condition |                                     Products or discounts are filtered by one or more filtering criteria.                                      |                              |
|   **Step#**    |                                                **Actor: User**                                                |                          **System**                           |
|       1        |                                          Specify one or more filtering criteria.                                           |                                                               |
|       2        |                                                                                                                                   | Query corresponding database table with filtering criteria. |
|       3        |                                                                                                                                   |          Retrieve all resulting rows (at least one).          |
|       4        |                                                                                                                                   |      Show non-empty list with filtered products to User.      |

#### UC7 SCENARIO 1.2

|  Scenario 1.2  |                      Filter products or discounts by filtering critera. Show an empty list of filtered products to User.                       |                                                               |
| :------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager', 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory", "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. ||
| Post condition |                                     Products or discounts are filtered by one or more filtering criteria.                                      |                                                               |
|   **Step#**    |                                                **Actor: User**                                                |                          **System**                           |
|       1        |                                          Specify one or more filtering criteria.                                           |                                                               |
|       2        |                                                                                                                                   | Query corresponding database table with filtering criteria. |
|       3        |                                                                                                                                   |              Retrieve all resulting rows (none).              |
|       4        |                                                                                                                                   |                   Show empty list to User.                    |

#### UC7 SCENARIO 1.3

|  Scenario 1.3  |                                                      Products or discounts are not filtered.                    |                                                                       |
| :------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager', 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory", "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. ||
| Post condition |                                                    Products or discounts are not filtered.                  |                |
|   **Step#**    |                                                          **Actor: User**              |                              **System**       |
|       1        |                                 Specify one or more filtering criteria.     |                                                                       |
|       2        |                                                                            |     Error occurs while querying corresponding database table with filtering criteria.     |
|       3        |                                                                   | Show error message to User for failed retrieval of filtered products. |

### UC8, SORT PRODUCTS (USER)

|   Actors Involved    |                                            User (Customer, Manager, Business Admin)                           |
| :------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| Informal description | A Customer can sort products in "Products" page. A Manager can sort products in "Inventory" page and "Catalogue" page and discounts for product/category in "Discount" page. A Business Admin can sort products in "Monitor Statistics" page. User can sort products by one or more of the following criteria: price, average rating and/or release date. A Manager can sort discounts by one or more of the following criteria: start date, end date, category, model, discount value. |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager', 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory" or "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. |
|    Post condition    |                           Products or discounts are sorted by one or more sorting criteria.                           |
|   Nominal Scenario   |                                Sort products or discounts by sorting criteria. (1.1)                                |
|       Variants       |                                                                                                                       |
|      Exceptions      |                                            Products or discounts are not sorted. (1.2)                                             |

#### UC8 SCENARIO 1.1

|  Scenario 1.1  |                                   Sort products or discounts by sorting criteria.                                   |                                    |
| :------------: | :-------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager', 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory" or "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. ||
| Post condition |                                   Products or discounts are sorted by one or more sorting criteria.                                   |                                    |
|   **Step#**    |                                                    **Actor: User**                                                    |             **System**             |
|       1        |                        Specify one or more sorting criteria.                         |                                    |
|       2        |                                                                                                                                   | Query corresponding database table with sorting criteria. |
|       3        |                                                                                                                       |     Retrieve all resulting rows.      |
|       4        |                                                                                                                       | Show list with sorted products to User. |

#### UC8 SCENARIO 1.2

|  Scenario 1.2  |                                            Products or discounts are not sorted.                                              |                                             |
| :------------: | :-------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------: |
|     Precondition    |  User is logged in by means of an account with role 'Customer', 'Manager', 'Business Admin'. "Products" page is loaded, if User is Customer. "Inventory" or "Catalogue" or "Discount" page is loaded, if User is Manager. "Monitor Statistics" page is loaded, if User is Business Admin. ||
| Post condition |                                               Products or discounts are not sorted.                                                |                                             |
|   **Step#**    |                                                    **Actor: User**                                                    |                 **System**                  |
|       1        |                       Specify one or more sorting criteria.                                        |                                             |
|       2        |                                                                                                |     Error occurs while querying corresponding database table with sorting conditions.     |
|       3        |                                                                                               | Show error message to User for failed retrieval of sorted products. |


### UC9, CREATE CUSTOMER ACCOUNT (CUSTOMER)

|   Actors Involved    |                             Customer                             |
| :------------------: | :--------------------------------------------------------------: |
| Informal description | Customer wants to create a new account on EzElectronics website. |
|     Precondition     |                 Customer does not have an account. "Login/Sign up" page is loaded.                  |
|    Post condition    |       Customer is registered and has a new accont created.       |
|   Nominal Scenario   |             New account successfully created. (1.1)              |
|       Variants       |                                                                  |
|      Exceptions      |           Error occurs: Username already exists. (1.2)           |
|      Exceptions      |          Error occurs: Wrong/Missing parameters. (1.3)           |

#### UC9 SCENARIO 1.1

|  Scenario 1.1  |                 New account successfully created.                 |                                                                      |
| :------------: | :---------------------------------------------------------: | :------------------------------------------------------------------: |
|  Precondition  |             Customer does not have an account. "Login/Sign up" page is loaded.  |                                                                      |
| Post condition |        Customer has created an account successfully.        |                                                                      |
|   **Step#**    |                     **Actor: Customer**                     |                              **System**                              |
|       1        | Insert requested parameters for account creation. |                                                                      |
|       2        |                                                             |              Check if username is available. Check ok.               |
|       3        |                                                             |      Check if all other account parameters are valid. Check ok.      |
|       4        |                                                             |                 Register Customer data in User database table.                  |
|       5        |                                                             |                   Create wishlist of the Customer.                    |
|       6        |                                                             |         Create an empty default delivery address of the Customer.         |
|       7        |                                                             |       Create an empty default payment card details of the Customer.       |
|       8        |                                                             | Show a confirmation message to User for successful account creation. |
|       9        |                                                             |                         Load "Products" page.                         |

#### UC9 SCENARIO 1.2

|  Scenario 1.2  |                  Username already exists.                   |                                                                                        |
| :------------: | :---------------------------------------------------------: | :------------------------------------------------------------------------------------: |
|  Precondition  |             Customer does not have an account. "Login/Sign up" page is loaded.              |                                                                                        |
| Post condition |            Customer has NOT created an account.             |                                                                                        |
|   **Step#**    |                     **Actor: Customer**                     |                                       **System**                                       |
|       1        | Insert requested parameters for account creation. |                                                                                        |
|       2        |                                                             |                     Check if username is available. Check NOT ok.                      |
|       3        |                                                             | Show error message to Customer for username not available. |
|       4        |                                                             |                          Prompt for account creation data again.                          |

#### UC9 SCENARIO 1.3

|  Scenario 1.3  |              Wrong/Missing account parameters.              |                                                                                            |
| :------------: | :---------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|  Precondition  |             Customer does not have an account. "Login/Sign up" page is loaded.              |                                                                                            |
| Post condition |            Customer has NOT created an account.             |                                                                                            |
|   **Step#**    |                     **Actor: Customer**                     |                                         **System**                                         |
|       1        | Insert requested parameters for account creation. |                                                                                            |
|       2        |                                                             |                         Check if username is available. Check ok.                          |
|       3        |                                                             |               Check if all other account parameters are valid. Check NOT ok.               |
|       4        |                                                             | Show error message to Customer for wrong/missing account parameters. |
|       5        |                                                             |                            Prompt for account creation data again.                            |


### UC10, CREATE MANAGER ACCOUNT (TECH ADMIN)

|   Actors Involved    |                                 Tech Admin                                 |
| :------------------: | :------------------------------------------------------------------------: |
| Informal description | Tech Admin wants to create a new Manager account on EzElectronics website. |
|     Precondition     |                       Manager is not yet registered.                       |
|    Post condition    |            Manager is registered and has a new accont created.             |
|   Nominal Scenario   |              New Manager account successfully created. (1.1)               |
|       Variants       |                                                                            |
|      Exceptions      |             Error occurs (409): Username already exists. (1.2)             |
|      Exceptions      |               Error occurs: Wrong/Missing parameters. (1.3)                |

#### UC10 SCENARIO 1.1

|  Scenario 1.1  |                               Manager account creation successful                                |                                                                            |
| :------------: | :----------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |                                Manager does not have an account.                                 |                                                                            |
| Post condition |                      Tech Admin has created a Manager account successfully.                      |                                                                            |
|   **Step#**    |                                      **Actor: Tech Admin**                                       |                                 **System**                                 |
|       1        | Insert requested parameters for Manager account creation in an "Add Manager" script. |                                                                            |
|       2        |                           Run an "Add Manager" script.                           |                                                                            |
|       3        |                                                                                                  |                 Check if username is available. Check ok.                  |
|       4        |                                                                                                  |         Check if all other account parameters are valid. Check ok.         |
|       5        |                                                                                                  |                     Register Manager in User database table.                     |
|       6        |                                                                                                  | Show a confirmation message to Tech Admin for successful account creation. |

#### UC10 SCENARIO 1.2

|  Scenario 1.2  |                                     Username already exists.                                     |                                                                                          |
| :------------: | :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
|  Precondition  |                                Manager does not have an account.                                 |                                                                                          |
| Post condition |                          Tech Admin has not created a Manager account.                           |                                                                                          |
|   **Step#**    |                                      **Actor: Tech Admin**                                       |                                        **System**                                        |
|       1        | Insert requested parameters for Manager account creation in an "Add Manager" script. |                                                                                          |
|       2        |                           Execute an "Add Manager" script.                           |                                                                                          |
|       3        |                                                                                                  |                      Check if username is available. Check NOT ok.                       |
|       4        |                                                                                                  | Show error message to Tech Admin specifying for provided username not available. |

#### UC10 SCENARIO 1.3

|  Scenario 1.3  |                                Wrong/Missing account parameters.                                 |                                                                                              |
| :------------: | :----------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|  Precondition  |                                Manager does not have an account.                                 |                                                                                              |
| Post condition |                          Tech Admin has not created a Manager account.                           |                                                                                              |
|   **Step#**    |                                      **Actor: Tech Admin**                                       |                                          **System**                                          |
|       1        | Insert requested parameters for Manager account creation in an "Add Manager" script. |                                                                                              |
|       2        |                           Execute an "Add Manager" script.                           |                                                                                              |
|       3        |                                                                                                  |                          Check if username is available. Check ok.                           |
|       4        |                                                                                                  |                Check if all other account parameters are valid. Check NOT ok.                |
|       5        |                                                                                                  | Show error message to Tech Admin for wrong/missing account parameters. |

### UC11, CREATE BUSINESS ADMIN ACCOUNT (TECH ADMIN)

|   Actors Involved    |                                    Tech Admin                                     |
| :------------------: | :-------------------------------------------------------------------------------: |
| Informal description | Tech Admin wants to create a new Business Admin account on EzElectronics website. |
|     Precondition     |                       Business Admin is not yet registered.                       |
|    Post condition    |            Business Admin is registered and has a new accont created.             |
|   Nominal Scenario   |              New Business Admin account successfully created. (1.1)               |
|       Variants       |                                                                                   |
|      Exceptions      |                Error occurs (409): Username already exists. (1.2)                 |
|      Exceptions      |                   Error occurs: Wrong/Missing parameters. (1.3)                   |

#### UC11 SCENARIO 1.1

|  Scenario 1.1  |                                   Business Admin account creation successful                                   |                                                                            |
| :------------: | :------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |                                    Business Admin does not have an account.                                    |                                                                            |
| Post condition |                         Tech Admin has created a Business Admin account successfully.                          |                                                                            |
|   **Step#**    |                                             **Actor: Tech Admin**                                              |                                 **System**                                 |
|       1        | Insert requested parameters for Business Admin account creation in an "Add Business Admin" script. |                                                                            |
|       2        |                              Run an "Add Business Admin" script.                               |                                                                            |
|       3        |                                                                                                                |                 Check if username is available. Check ok.                  |
|       4        |                                                                                                                |         Check if all other account parameters are valid. Check ok.         |
|       5        |                                                                                                                |                 Register Business Admin in user database.                  |
|       6        |                                                                                                                | Show a confirmation message to Tech Admin for successful account creation. |

#### UC11 SCENARIO 1.2

|  Scenario 1.2  |                                            Username already exists.                                            |                                                                                          |
| :------------: | :------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
|  Precondition  |                                    Business Admin does not have an account.                                    |                                                                                          |
| Post condition |                              Tech Admin has not created a Business Admin account.                              |                                                                                          |
|   **Step#**    |                                             **Actor: Tech Admin**                                              |                                        **System**                                        |
|       1        | Insert requested parameters for Business Admin account creation in an "Add Business Admin" script. |                                                                                          |
|       2        |                              Execute an "Add Business Admin" script.                               |                                                                                          |
|       3        |                                                                                                                |                      Check if username is available. Check NOT ok.                       |
|       4        |                                                                                                                | Show error message to Tech Admin specifying that the provided username is not available. |

#### UC11 SCENARIO 1.3

|  Scenario 1.3  |                                       Wrong/Missing account parameters.                                        |                                                                                              |
| :------------: | :------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|  Precondition  |                                    Business Admin does not have an account.                                    |                                                                                              |
| Post condition |                              Tech Admin has not created a Business Admin account.                              |                                                                                              |
|   **Step#**    |                                             **Actor: Tech Admin**                                              |                                          **System**                                          |
|       1        | Insert requested parameters for Business Admin account creation in an "Add Business Admin" script. |                                                                                              |
|       2        |                              Execute an "Add Business Admin" script.                               |                                                                                              |
|       3        |                                                                                                                |                          Check if username is available. Check ok.                           |
|       4        |                                                                                                                |                Check if all other account parameters are valid. Check NOT ok.                |
|       5        |                                                                                                                | Show error message to Tech Admin specifying that there are wrong/missing account parameters. |


### UC12, DELETE CUSTOMER ACCOUNT (CUSTOMER)

|   Actors Involved    |                        Customer                         |
| :------------------: | :------------------------------------------------------------: |
| Informal description |               Customer wants to delete their user account.                |
|     Precondition     |             Customer is logged in by means of an account with role 'Customer'. "User" page is loaded.             |
|    Post condition    |              Customer has deleted their own account.               |
|   Nominal Scenario   |            Specified Customer account is deleted successfully. (1.1)            |
|       Variants       |                                                                |
|      Exceptions      |     Error occurs (404): Target Customer does not exist. (1.2)      |

#### UC12 SCENARIO 1.1

|  Scenario 1.1  |        Specified Customer account is deleted successfully.         |                                               |
| :------------: | :-----------------------------------------: | :-------------------------------------------: |
|     Precondition     |             Customer is logged in by means of an account with role 'Customer'. "User" page is loaded.             |
| Post condition |     Customer has deleted their own account.      |                                               |
|   **Step#**    |               **Actor: Customer**               |                  **System**                   |
|       1        | Click on the 'Delete account' button. |                                               |
|       2        |                                             |  Prompt Customer to confirm the delete operation of their own account.   |
|       3        | Confirm delete account operation.           |                                               |
|       4        |                                             |  Delete the Customer account from User database table.   |
|       5        |                                             |   Show confirmation to Customer for deleted account for 10 seconds.   |
|       6        |                                             | Load "Products" page. |

#### UC12 SCENARIO 1.2

|  Scenario 1.2  |       Target Customer does not exist.         |                                                                 |
| :------------: | :-----------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  |  Customer is logged in. "Customer" page is loaded.  |                                                                 |
| Post condition |     Specified Customer account is NOT deleted.      |                                                                 |
|   **Step#**    |               **Actor: Customer**               |                           **System**                            |
|       1        | Click on the 'Delete account' button. |                                                                 |
|       2        |                                             |  Prompt Customer to confirm the delete operation of their own account.   |
|       3        | Confirm delete account operation.           |                                               |
|       4        |                                             | Error occurs while deleting the Customer account from the database. |
|       5        |                                             | Show error message to Customer for unsuccessful account deletion.      |


### UC13, DELETE MANAGER ACCOUNT (TECH ADMIN)

|   Actors Involved    |                             Tech Admin                              |
| :------------------: | :-----------------------------------------------------------------: |
| Informal description | Tech Admin wants to delete a Manager account specified by username. |
|     Precondition     |                       Manager has an account.                       |
|    Post condition    |                Specified Manager account is deleted.                |
|   Nominal Scenario   |             Specified Manager account is deleted. (1.1)             |
|       Variants       |                                                                     |
|      Exceptions      |     Error occurs: Target Manager account does not exist. (1.2)      |

#### UC13 SCENARIO 1.1

|  Scenario 1.1  |                           Specified Manager account is deleted.                          |                                                                            |
| :------------: | :--------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |                                       Manager has an account.                                        |                                                                            |
| Post condition |                                Specified Manager account is deleted.                                 |                                                                            |
|   **Step#**    |                                        **Actor: Tech Admin**                                         |                                 **System**                                 |
|       1        | Insert the requested username for Manager account deletion in a "Delete Manager" script. |                                                                            |
|       2        |                            Execute a "Delete Manager" script.                            |                                                                            |
|       3        |                                                                                                      |               Delete the Manager account from User database table.               |
|       4        |                                                                                                      | Show a confirmation message to Tech Admin for successful account deletion of specified Manager username. |

#### UC13 SCENARIO 1.2

|  Scenario 1.2  |                                Target Manager account does not exist.                                |                                                                     |
| :------------: | :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------: |
|  Precondition  |                                                                                                      |                                                                     |
| Post condition |                              Specified Manager account is NOT deleted.                               |                                                                     |
|   **Step#**    |                                        **Actor: Tech Admin**                                         |                             **System**                              |
|       1        | Insert the requested username for Manager account deletion in a "Delete Manager" script. |                                                                     |
|       2        |                            Execute a "Delete Manager" script.                            |                                                                     |
|       2        |                                                                                                      | Error occurs while deleting the Manager account from user database. |
|       3        |                                                                                                      |        Show error message to User for unsuccessful account deletion of specified Manager username.        |

### UC14, DELETE BUSINESS ADMIN ACCOUNT (TECH ADMIN)

|   Actors Involved    |                                 Tech Admin                                 |
| :------------------: | :------------------------------------------------------------------------: |
| Informal description | Tech Admin wants to delete a Business Admin account specified by username. |
|     Precondition     |                       Business Admin has an account.                       |
|    Post condition    |                Specified Business Admin account is deleted.                |
|   Nominal Scenario   |             Specified Business Admin account is deleted. (1.1)             |
|       Variants       |                                                                            |
|      Exceptions      |     Error occurs: Target Business Admin account does not exist. (1.2)      |

#### UC14 SCENARIO 1.1

|  Scenario 1.1  |                              Tech Admin deletes the specified Business Admin account.                              |                                                                            |
| :------------: | :----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |                                           Business Admin has an account.                                           |                                                                            |
| Post condition |                                    Specified Business Admin account is deleted.                                    |                                                                            |
|   **Step#**    |                                               **Actor: Tech Admin**                                                |                                 **System**                                 |
|       1        | Insert the requested username for Business Admin account deletion in a "Delete Business Admin" script. |                                                                            |
|       2        |                               Execute a "Delete Business Admin" script.                                |                                                                            |
|       3        |                                                                                                                    |           Delete the Business Admin account from User database table.            |
|       4        |                                                                                                                    | Show a confirmation message to Tech Admin for successful account deletion of specified Business admin username. |

#### UC14 SCENARIO 1.2

|  Scenario 1.2  |                                   Target Business Admin account does not exist.                                    |                                                                            |
| :------------: | :----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |                                                                                                                    |                                                                            |
| Post condition |                                  Specified Business Admin account is NOT deleted.                                  |                                                                            |
|   **Step#**    |                                               **Actor: Tech Admin**                                                |                                 **System**                                 |
|       1        | Insert the requested username for Business Admin account deletion in a "Delete Business Admin" script. |                                                                            |
|       2        |                               Execute a "Delete Business Admin" script.                                |                                                                            |
|       2        |                                                                                                                    | Error occurs while deleting the Business Admin account from User database table. |
|       3        |                                                                                                                    |           Show error message to Tech Admin for unsuccessful account deletion for specified Business admin username.            |

### UC15, LOGIN (USER)

|   Actors Involved    |                 User(Customer, Manager, Business Admin)                  |
| :------------------: | :----------------------------------------------------------------------: |
| Informal description |                       User wants to log in to their account.                        |
|     Precondition     |             User has an account. User is not logged in yet. "Login/Sign up" page is loaded.              |
|    Post condition    |                            User is logged in.                            |
|   Nominal Scenario   |                          Login successful (1.1)                          |
|       Variants       |                                                                          |
|      Exceptions      | Error occurs: Login not successful. Username not found/wrong password (wrong credentials) (1.2) |

#### UC15 SCENARIO 1.1

|  Scenario 1.1  |                   Login successful                    |                                           |
| :------------: | :---------------------------------------------------: | :---------------------------------------: |
|     Precondition     |             User has an account. User is not logged in yet. "Login/Sign up" page is loaded.              | |
| Post condition |                  User is logged in.                  |                                           |
|   **Step#**    | **Actor: User**                                       |                **System**                 |
|       1        |            Insert login credentials.            |                                           |
|       2        |                                                       | Check match forusername and password in User database table. Check ok. |
|       3        |                  User is logged in.                   |                                           |

#### UC15 SCENARIO 1.2

|  Scenario 1.2  |       Login not successfull, wrong credentials        |                                               |
| :------------: | :---------------------------------------------------: | :-------------------------------------------: |
|  Precondition  |              User must have an account. "Login/Sign up" page is loaded.              |                                               |
| Post condition |                User is not logged in.                  |                                               |
|   **Step#**    | **Actor: User**                                        |                  **System**                   |
|       1        |            Insert login credentials.            |                                               |
|       2        |                                                       | Check match for username and password. Match NOT ok. |
|       3        |                                                       | Show error message to User for wrong credentials. |
|       4        |                                                       |          Ask for credentials again.           |



### UC16, LOGOUT (USER)

|   Actors Involved    |              User (Customer, Manager, Business Admin)               |
| :------------------: | :----------------------------------------------------------------: |
| Informal description | User wants to log out from their account on EzElectronics website. |
|     Precondition     |              User has an account. User is logged in.               |
|    Post condition    |           User is logged out.            |
|   Nominal Scenario   |                      Logout successful. (1.1)                      |
|       Variants       |                                                                    |
|      Exceptions      |             Error occurs: Logout not successful (1.2)              |

#### UC16 SCENARIO 1.1

|  Scenario 1.1  |                           Logout successful                            |                         |
| :------------: | :--------------------------------------------------------------------: | :---------------------: |
|  Precondition  |             User must have an account. User is logged in.              |                         |
| Post condition |             User is logged out.              |                         |
|   **Step#**    |          **Actor: User**                                              |       **System**        |
|       1        | Click on the 'Logout' button in the top right corner of any page. |                         |
|       2        |                                                                        | Do logout of that User. |
|       3        |                                                                        |  Load "Products" page.   |

#### UC16 SCENARIO 1.2

|  Scenario 1.2  |                         Logout not successfull                         |                                                     |
| :------------: | :--------------------------------------------------------------------: | :-------------------------------------------------: |
|  Precondition  |             User must have an account. User is logged in.              |                                                     |
| Post condition |                        User is NOT logged out.                         |                                                     |
|   **Step#**    |          **Actor: User**                                              |                     **System**                      |
|       1        | Click on the 'Logout' button in the top right corner of any page. |                                                     |
|       2        |                                                                        |  Error occurs while doing the logout of the User.   |
|       3        |                                                                        | Show error message to User for unsuccessful logout. |


### UC17, GET PERSONAL USER DATA BY USERNAME (USER)

|   Actors Involved    |       User       |
| :------------------: | :---------------------------------------------------: |
| Informal description |    User wants to retrieve their proper user account data.     |
|     Precondition     |        User has an account. User is logged in.        |
|    Post condition    |           User retrieves proper user account data.            |
|   Nominal Scenario   |        User retrieves proper user account data. (1.1)         |
|       Variants       |                                                       |
|      Exceptions      | Error occurs (404): Target user not accessible temporarily. (1.2) |

#### UC17 SCENARIO 1.1

|  Scenario 1.1  |                 User retrieves proper user account data.                  |                                                    |
| :------------: | :---------------------------------------------------------------: | :------------------------------------------------: |
|  Precondition  |              User has an account. User is logged in.              |                                                    |
| Post condition |                 User retrieves proper user account data.                  |                                                    |
|   **Step#**    |                          **Actor: User**                          |                     **System**                     |
|       1        | Click on the 'User' button in the top right corner of any page. |                                                    |
|       2        |                                                                   |      Query User database table. Retrieve all user data fields.           |
|       3        |                                                                   |                 Load "User" page.                  |
|       4        |                                                                   |              Show user account data to User.               |

#### UC17 SCENARIO 1.2

|  Scenario 1.2  |                    Target user data not accesssible temporarily.                    |                                                            |
| :------------: | :---------------------------------------------------------------: | :--------------------------------------------------------: |
|  Precondition  |              User has an account. User is logged in.              |                                                            |
| Post condition |                 User dooes not retrieve proper user account data.                  |                                                            |
|   **Step#**    |                          **Actor: User**                          |                         **System**                         |
|       1        | Click on the 'User' button in the top right corner of any page. |                                                            |
|       2        |                                                                   | Error occurs while querying User database table/retrieving user data fields. |
|       3        |                                                                   |  Show error message to User for user account data not accessible temporarily.   |

### UC18, GET USER DATA BY ROLE (TECH ADMIN)

|   Actors Involved    |                                         Tech admin                                         |
| :------------------: | :----------------------------------------------------------------------------------------: |
| Informal description |        Tech admin retrieves from User database table all user accounts with a specified role.         |
|     Precondition     | Tech admin is logged in through a terminal. |
|    Post condition    |                 Tech admin retrieves list of user data by role.                 |
|   Nominal Scenario   |                      Tech admin retrieves list of user data by role. (1.1) |
|       Variants       |                                                                                            |
|      Exceptions      |          Error occurs (404): User accounts by a specific role are not retrieved. (1.2)         |

#### UC18 SCENARIO 1.1

|  Scenario 1.1  |             Tech admin retrieves list of user data by role.            |                                                                |
| :------------: | :------------------------------------------------------------------: | :------------------------------------------------------------: |
|  Precondition  |             Tech admin is logged in through a terminal.              |                                                                |
| Post condition |           Tech admin retrieves list of user data by role.            |                                                                |
|   **Step#**    |                     **Actor: Tech Admin**                          |                           **System**                           |
|       1        | Run a command with a parameter to specify the user role.            |                                                                |
|       2        |                                                                      | Query User database table. Retrieve list of user data for specified role. |
|       3        |                                                                      |                       Show the list of user data for specified role to User.                       |

#### UC18 SCENARIO 1.2

|  Scenario 1.2  |                     User accounts by a specific role are not retrieved.                      |                                                              |
| :------------: | :------------------------------------------------------------------: | :----------------------------------------------------------: |
|  Precondition  |              Tech admin is logged in through a terminal.              |                                                              |
| Post condition |           Tech admin does not retrieve user data by role.            |                                                              |
|   **Step#**    |                           **Actor: Tech Admin**                            |                          **System**                          |
|       1        | Run a command with a parameter to specify the user role. |                                                              |
|       2        |                                                                      | Error occurs while querying User database/retrieving user data. |
|       3        |                                                                      | Show error message to User.                  |


### UC19, MODIFY USER ACCOUNT PARAMETERS (CUSTOMER)

|   Actors Involved    |                                Customer                                |
| :------------------: | :--------------------------------------------------------------------: |
| Informal description |          Customer wants to modify his/her account paramaters.          |
|     Precondition     | Customer has an account. Customer is logged in. "User" page is loaded. |
|    Post condition    |               Customer has modified account parameters.                |
|   Nominal Scenario   |            Customer account parameters are modified. (1.1)             |
|       Variants       |                                                                        |
|      Exceptions      |             Error occurs: Wrong/Missing parameters. (1.2)              |

#### UC19 SCENARIO 1.1

|  Scenario 1.1  |               Customer account parameters are modified.                |                                                                          |
| :------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. "User" page is loaded. |                                                                          |
| Post condition |                Customer has modified account parameters.               |                                                                          |
|   **Step#**    |                          **Actor: Customer**                           |                                **System**                                |
|       1        |        Click on the "Modify Account Details" button.         |                                                                          |
|       2        |    Insert requested parameters for account modification.     |                                                                          |
|       3        |                                                                        |           Check if all account parameters are valid. Check ok.           |
|       4        |                                                                 |  Prompt Customer to confirm the modification operation of their own account.   |
|       5        | Confirm modification of account parameters.                                      |                                               |
|       6        |                                                                        |  Modify the Customer account parameters in User database table.   |
|       7        |                                                                        | Show a confirmation message to User for successful account modification. |

#### UC19 SCENARIO 1.2

|  Scenario 1.2  |                   Wrong/Missing account parameters.                    |                                                                                            |
| :------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. "User" page is loaded. |                                                                                            |
| Post condition |                Customer has NOT modified account parameters.               |                                                                          |
|   **Step#**    |                          **Actor: Customer**                           |                                         **System**                                         |
|       1        |        Click on the "Modify Account Details" button.         |                                                                                            |
|       2        |    Insert requested parameters for account modification.     |                                                                                            |
|       4        |                                                                        |                  Check if all account parameters are valid. Check NOT ok.                  |
|       5        |                                                                        | Show error message to Customer for wrong/missing account parameters. |


### UC20, RESET USER PASSWORD (USER)

|   Actors Involved    |                                User                                |
| :------------------: | :--------------------------------------------------------------------: |
| Informal description |          User wants to reset his/her account password.          |
|     Precondition     | User has an account. "Login/Signup" page is loaded. |
|    Post condition    |               User resets their password successfully.                |
|   Nominal Scenario   |            User password successfully reset. (1.1)             |
|       Variants       |                                                                        |
|      Exceptions      |             Error occurs: Username not found. (1.2)                                                              |

#### UC20 SCENARIO 1.1

|  Scenario 1.1  |              User password successfully reset.                |                                                                          |
| :------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|     Precondition     | User has an account. "Login/Signup" page is loaded. |
| Post condition |               User resets their password successfully.                |                                                                          |
|   **Step#**    |                          **Actor: User**                           |                                **System**                                |
|       1        |        Click on the "Reset/Forgotten Password" button.          |                                                                          |
|       2        |                                                                        |           Prompt User for their username.           |
|       3        |        Input username. Confirm.                                        |                                                                          |
|       4        |                                                                        |                    Check if username exists in User. Check ok.                     |
|       5        |        Access link for password reset.                             |                                                                          |
|       6        |                                                                        |                    Prompt user for new password.                     |
|       7        |        Input twice new password.                                       |                                                                          |
|       8        |                                                                        | Show a confirmation message to User for successful password reset. |

#### UC20 SCENARIO 1.2

|  Scenario 1.2  |              Username not found.                                       |                                                                          |
| :------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|     Precondition     | User has an account. "Login/Signup" page is loaded. |
| Post condition |               User resets their password successfully.                |                                                                          |
|   **Step#**    |                          **Actor: User**                           |                                **System**                                |
|       1        |        Click on the "Reset/Forgotten Password" button.         |                                                                          |
|       2        |                                                                        |           Prompt User for their username.           |
|       3        |        Input username. Confirm.      |                                                                          |
|       4        |                                                                        |                    Check if username exists in User. Check NOT ok.                     |
|       5        |                                                                        | Show error message to User for failed password reset.  |

### UC21, SET DEFAULT DELIVERY ADDRESS (CUSTOMER)

|   Actors Involved    |                                Customer                                |
| :------------------: | :--------------------------------------------------------------------: |
| Informal description |          Customer wants to set a delivery address as default.          |
|     Precondition     | Customer has an account. Customer is logged in. "User" page is loaded. |
|    Post condition    |        The address provided by the Customer is set as default.         |
|   Nominal Scenario   |      Customer delivery address successfully set as default. (1.1)      |
|       Variants       |                                                                        |
|      Exceptions      |     Error occurs: Wrong/Missing delivery address parameters. (1.2)     |

#### UC21 SCENARIO 1.1

|  Scenario 1.1  |          Customer delivery address successfully set as default.          |                                                                                   |
| :------------: | :----------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
|  Precondition  |  Customer has an account. Customer is logged in. "User" page is loaded.  |                                                                                   |
| Post condition |           The address provided by the Customer is set as default.          |                                                                                   |
|   **Step#**    |                           **Actor: Customer**                            |                                    **System**                                     |
|       1        |             Click on the "Modify Address" button.              |                                                                                   |
|       2        | Insert requested parameters for delivery address modification. |                                                                                   |
|       3        |              Click on the "Save Address" button.               |                                                                                   |
|       4        |                                                                          |           Check if all delivery address parameters are valid. Check ok.           |
|       5        |                                                                          |                Update Customer delivery address in User database table.                 |
|       6        |                                                                          | Show a confirmation message to User for successful default delivery address modification. |

#### UC21 SCENARIO 1.2

|  Scenario 1.2  |                Wrong/Missing delivery address parameters.                |                                                                                                     |
| :------------: | :----------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
|  Precondition  |  Customer has an account. Customer is logged in. "User" page is loaded.  |                                                                                                     |
| Post condition |        The address provided by the customer is NOT set as default.       |                                                                                                     |
|   **Step#**    |                           **Actor: Customer**                            |                                             **System**                                              |
|       1        |             Click on the "Modify Address" button.              |                                                                                                     |
|       2        | Insert requested parameters for delivery address modification. |                                                                                                     |
|       3        |              Click on the "Save Address" button.               |                                                                                                     |
|       4        |                                                                          |                  Check if all delivery address parameters are valid. Check NOT ok.                  |
|       5        |                                                                          | Show error message to Customer for wrong/missing delivery address parameters. |

### UC22, SET DEFAULT PAYMENT CARD DETAILS (CUSTOMER)

|   Actors Involved    |                                            Customer                                            |
| :------------------: | :--------------------------------------------------------------------------------------------: |
| Informal description | Customer wants to set default payment card details payment method credit/debit card. |
|     Precondition     |             Customer has an account. Customer is logged in. "User" page is loaded.             |
|    Post condition    |               Customer has set as default the provided payment card details.                |
|   Nominal Scenario   |                Customer payment card details successfully set as default. (1.1)                |
|       Variants       |                                                                                                |
|      Exceptions      |               Error occurs: Wrong/Missing parameters of payment card details. (1.2)               |

#### UC22 SCENARIO 1.1

|  Scenario 1.1  |          Customer payment card details successfully set as default.          |                                                                                       |
| :------------: | :--------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|  Precondition  |    Customer has an account. Customer is logged in. "User" page is loaded.    |                                                                                       |
| Post condition |          Customer has set as default the provided payment card details.          |                                                                                       |
|   **Step#**    |                             **Actor: Customer**                              |                                      **System**                                       |
|       1        |             Click on "Modify Card Details" button.             |                                                                                       |
|       2        | Insert requested parameters for modification of payment card details. |                                                                                       |
|       3        |              Click on "Save Card Details" button.              |                                                                                       |
|       4        |                                                                              |           Check if all parameters for payment card details are valid. Check ok.           |
|       5        |                                                                              |                Update Customer payment card details in User database table.                 |
|       6        |                                                                              | Show a confirmation message to User for modification of payment card details successfully. |

#### UC22 SCENARIO 1.2

|  Scenario 1.2  |    Wrong/Missing parameters of payment card details.                |                                                                                                         |
| :------------: | :--------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|  Precondition  |    Customer has an account. Customer is logged in. "User" page is loaded.    |                                                                                                         |
| Post condition |          Customer has set as default the provided payment card details.          |                                                                                       |
|   **Step#**    |                             **Actor: Customer**                              |                                               **System**                                                |
|       1        |             Click on "Modify Card Details" button.             |                                                                                                         |
|       2        | Insert requested parameters for modification of payment card details. |                                                                                       |
|       3        |              Click on "Save Card Details" button.              |                                                                                                         |
|       4        |                                                                              |           Check if all parameters for payment card details are valid. Check ok.           |
|       5        |                                                                              | Show error message to Customer for wrong/missing parameters of payment card details. |

### UC23, ADD PRODUCT TO CURRENT CART (CUSTOMER)

|   Actors Involved    |                           Customer                           |
| :------------------: | :----------------------------------------------------------: |
| Informal description |       Customer wants to add a single item of a product model to the current cart.      |
|     Precondition     |       Customer is logged in. "Products" page or "Detailed Product" page is loaded.       |
|    Post condition    |          Customer adds a single item of the selected product model to the current cart.            |
|   Nominal Scenario   |    A single product item of a product model is successfully added to the current cart. (1.1)     |
|       Variants       |      A single product item of a product model is added successfully to the current cart (without initally having a cart). (1.2)      |
|      Exceptions      |         Error occurs: Product model does not exist in Catalogue. (1.3)          |
|      Exceptions      |         Error occurs: No items of selected product model are available. (1.4)           |
|      Exceptions      |         Error occurs: Product item already present in current cart. (1.5) |

#### UC23 SCENARIO 1.1

|  Scenario 1.1  |       A single product item of a product model is successfully added to the current cart.        |                                                                       |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Products" page or "Detailed Product" page is loaded. Cart exists. |                                                                       |
| Post condition | Customer adds a single item of the selected product model to the current cart. |                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                              **System**                               |
|       1        |   Click on the 'Add to cart' button of a product model.   |                                                                       |
|       2        |                                                               |                    Check if cart exists. Check ok.                    |
|       3        |                                                               |                  Check if product model exists in Catalogue. Check ok.                   |
|       4        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check ok.              |
|       5        |                                                               |          Check if product item of selected product model is not already in the cart. Check ok.           |
|       6        |                                                               |           Add a single product item of the selected product model to the cart.                        |
|       7        |                                                               | Show confirmation to Customer for a single product item of selected product model added successfully to current cart. |

#### UC23 SCENARIO 1.2

|  Scenario 1.2  |    A single product item of a product model is added successfully to the current cart (without initally having a cart).              |                   |
| :------------: | :-------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Products" page or "Detailed Product" page is loaded. Cart does not exist. |                                                                       |
| Post condition |  Customer adds a single item of the selected product model to the current cart.                |                                                                       |
|   **Step#**    |                          **Actor: Customer**                          |                              **System**                               |
|       1        |       Click on the 'Add to cart' button of a product model.       |                                                                       |
|       2        |                                                                       |                  Check if cart exists. Check NOT ok.                  |
|       3        |                                                                       |           Create a cart object associated to the Customer.            |
|       4        |                                                               |                  Check if product model exists in Catalogue. Check ok.                   |
|       5        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check ok.              |
|       6        |                                                               |          Check if product item of selected product model is not already in the cart. Check ok.           |
|       7        |                                                               |           Add a single product item of the selected product model to the cart.                        |
|       8        |                                                               | Show confirmation to Customer for a single product item of selected product model added successfully to current cart. |

#### UC23 SCENARIO 1.3

|  Scenario 1.3  |                    Product model does not exist in Catalogue.                    |                                                                 |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Products" page or "Detailed Product" page is loaded. Cart does not exist. |                                                                       |
| Post condition |          Customer does NOT add a single item of the selected product model to the current cart.               |                       |
|   **Step#**    |                      **Actor: Customer**                      |                           **System**                            |
|       1        |   Click on the 'Add to cart' button of a product model.   |                                                                 |
|       2        |                                                               |                 Check if cart exists. Check ok.                 |
|       3        |                                                               |             Check if product model exists in Catalogue. Check NOT ok.              |
|       4        |                                                               | Show error message to Customer for product model that does not exist in Catalogue. |

#### UC23 SCENARIO 1.4

|  Scenario 1.4  |                     No items of selected product model are available.                     |                     |
| :------------: | :-----------------------------------------------------------: | :--------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Products" page or "Detailed Product" page is loaded. Cart does not exist. |                                                                       |
| Post condition |   Customer does NOT add a single item of the selected product model to the current cart.               |                                                                  |
|   **Step#**    |                      **Actor: Customer**                      |                            **System**                            |
|       1        |   Click on the 'Add to cart' button of a product model.   |                                                                  |
|       2        |                                                               |                 Check if cart exists. Check ok.                  |
|       3        |                                                               |                Check if product model exists in Catalogue. Check ok.                |
|       4        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check NOT ok.              |
|       5        |                                                               | Show error message to Customer for selected product model that is not available in Catalogue. |

#### UC23 SCENARIO 1.5

|  Scenario 1.5  |           Product item already present in current cart.            |                                                                         |
| :------------: | :-----------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Products" page or "Detailed Product" page is loaded. Cart does not exist. |                                                                       |
| Post condition |  Customer does NOT add a single item of the selected product model to the current cart.  |                                                                         |
|   **Step#**    |                      **Actor: Customer**                      |                               **System**                                |
|       1        |   Click on the 'Add to cart' button of a product model.   |                                                                         |
|       2        |                                                               |                     Check if cart exists. Check ok.                     |
|       3        |                                                               |                   Check if product exists. Check ok.                    |
|       4        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check ok.              |
|       7        |                                                               |          Check if product item of selected product model is not already in the cart. Check NOT ok.           |
|       8        |                                                               | Show error message to Customer for a single item of selected product model already present in current cart. |


### UC24, REMOVE PRODUCT FROM CURRENT CART (CUSTOMER)

|   Actors Involved    |                                           Customer                                           |
| :------------------: | :------------------------------------------------------------------------------------------: |
| Informal description |                      Customer wants to remove all product items of a selected product model from the current cart.                       |
|     Precondition     | Customer is logged in. Cart exists. Cart contains at least 1 product item of at least 1 product model. "Cart" page is loaded. |
|    Post condition    |              Customer has removed successfully all product items of a selected product model from the cart.                           |
|   Nominal Scenario   |                  All product items of a selected product model are removed from the cart. (1.1)                  |
|       Variants       |                                                                                                    |
|      Exceptions      |                    Error occurs: Product item not found in current cart. (1.2)                    |

#### UC24 SCENARIO 1.1

|  Scenario 1.1  |                     All product items of a selected product model are removed from the cart.                     |                                                                         |
| :------------: | :------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  |  Customer is logged in. Cart exists. Cart contains at least 1 product item of at least 1 product model. "Cart" page is loaded. |                                          |
| Post condition |    Customer has removed successfully all product items of a selected product model from the cart.      |                                                   |
|   **Step#**    |                                     **Actor: Customer**                                      |                               **System**                                |
|       1        |       Click on the 'Remove from cart' button next to a product item in the cart.        |                                                                         |
|       2        |                                                                                              |           Check if product item is in the current cart. Check ok.            |
|       3        |                                                                                              |           Remove all product items of selected product model from the current cart.            |
|       4        |                                   | Show confirmation to Customer for all product items of selected product model removed successfully. |

#### UC24 SCENARIO 1.2

|  Scenario 1.2  |                     Product item not found in current cart.                      |                                                                      |
| :------------: | :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------: |
|  Precondition  |  Customer is logged in. Cart exists. Cart contains at least 1 product item of at least 1 product model. "Cart" page is loaded. |                                          |
| Post condition |   Customer has NOT removed all product items of a selected product model from the current cart.                |                                                                      |
|   **Step#**    |                                     **Actor: Customer**                                      |                              **System**                              |
|       1        |          Click on the 'Remove from cart' button of a product item in the cart.               |                                                                      |
|       2        |                                                                                              |          Check if product item is in the current cart. Check NOT ok.           |
|       3        |                                                                                              | Show error message to Customer with product item that is not in the cart. |

### UC25, DELETE CURRENT CART CONTENT(CUSTOMER)

|   Actors Involved    |                                          Customer                                           |
| :------------------: | :-----------------------------------------------------------------------------------------: |
| Informal description |             Customer wants to delete the current cart with all product items inside.             |
|     Precondition     |                 Customer is logged in. Cart exists.  Cart contains at least 1 product item of at least 1 product model. "Cart" page is loaded.                  |
|    Post condition    |                     Customer has removed all product items from the current cart. Cart is empty.                      |
|   Nominal Scenario   |                  All product items from current cart are removed. Cart is empty. (1.1)                   |
|       Variants       |                                                                                             |
|      Exceptions      |                                                                                             |

#### UC25 SCENARIO 1.1

|  Scenario 1.1  |       All product items from current cart are removed. Cart is empty.        |                                                       |
| :------------: | :--------------------------------------------------------------: | :---------------------------------------------------: |
|  Precondition  |    Customer is logged in. Cart exists.  Cart contains at least 1 product item of at least 1 product model. "Cart" page is loaded.     |                                                       |
| Post condition |        Customer has removed all product items from the current cart. Cart is empty.         |                                                |
|   **Step#**    |                       **Actor: Customer**                        |                      **System**                       |
|       1        | Click on the 'Delete cart' button of the current cart.           |                                                       |
|       2        |                                                                  | Remove all the product items from the current cart. (UC24) |
|       3        |                                                                  |            Show confirmation to Customer for removal of all product items from current cart.             |

### UC26, SEE CURRENT CART CONTENT (CUSTOMER)

|   Actors Involved    |                             Customer                             |
| :------------------: | :--------------------------------------------------------------: |
| Informal description | Customer wants to retrieve the content of their current cart. |
|     Precondition     |         Customer has an account. Customer is logged in.          |
|    Post condition    |              Customer has retrieved the content of their current cart.    |
|   Nominal Scenario   |            Current cart content successfully retrieved. (1.1)            |
|       Variants       |                                                                  |
|      Exceptions      |                                                                  |

#### UC26 SCENARIO 1.1

|  Scenario 1.1  |                                                   Current cart content successfully retrieved.                                          |                                    |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  Precondition  |                                                          Customer is logged in.                                                           |                                    |
| Post condition |                                                  Customer has retrieved the content of their current cart.                               |                                    |
|   **Step#**    |                                                            **Actor: Customer**                                                            |             **System**             |
|       1        | Customer clicks on button 'Cart' in top right corner of any page or on button 'See Cart' in "Detailed Product" page. |                                    |
|       2        |                                                                                                                                    | Retrieve all product items of the current cart of Customer. |
|       3        |                                                                                                                                           |         Load "Cart" page.          |
|       4        |                                                                                                                                           |   Show current cart content to Customer.   |

### UC27, MODIFY QUANTITY OF ITEMS FOR A PRODUCT MODEL IN CURRENT CART (CUSTOMER)
|   Actors Involved    |                           Customer                           |
| :------------------: | :----------------------------------------------------------: |
| Informal description |       Customer wants to modify (increase/decrease) quantity of product items for a specific product model in cart.      |
|     Precondition     |       Customer is logged in by means of an account with role 'Customer'. "Cart" page is loaded.       |
|    Post condition    |      Customer has modified the quantity of product items for a selected product model (increased/decreased).            |
|   Nominal Scenario   |    Quantity of product items for selected product model is increased successfully in cart. (1.1)     |
|       Variants       |    Quantity of product items for selected product model is decreased successfully in cart.  (1.2)      |
|      Exceptions      |          Error occurs: No other available product items of selected product model. (1.3)           |
|      Exceptions      |          Error occurs: Cannot have quantity of product items for a selected product model ==0. (1.4)           |

#### UC27 SCENARIO 1.1

|  Scenario 1.1  |       Quantity of product items for selected product model is increased successfully in cart.        |                                |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  |Customer is logged in by means of an account with role 'Customer'. "Cart" page is loaded.  |                                                                       |
| Post condition | Customer has increased quantity of product items for selected product model in cart. |                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                              **System**                               |
|       1        |  Click on the 'Increase quantity by 1 (PLUS)' button of a product model.   |                                                                       |
|       2        |                                                               | Check if quantity of selected product model is >= 1 in Catalogue. Check ok.              |
|       3        |                                                               | Increment counter for quantity of corresponding product model in current cart by 1.              |
|       4        |                                                               | Show updated value of counter for quantity of corresponding product model to Customer. |

#### UC27 SCENARIO 1.2

|  Scenario 1.2  |       Quantity of product items for selected product model is decreased successfully in cart.        |                                |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition   |Customer is logged in by means of an account with role 'Customer'. "Cart" page is loaded.  |                                                                       |
| Post condition | Customer has decreased quantity of product items for selected product model in cart. |                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                              **System**                               |
|       1        |  Click on the 'Decrease quantity by 1 (MINUS)' button of a product model.   |                                                                       |
|       2        |                                                               | Check if counter for quantity of corresponding product model is > 1 in current cart. Check ok.              |
|       3        |                                                               | Decrement counter for quantity of corresponding product model in current cart by 1.              |
|       4        |                                                               | Show updated value of counter for quantity of corresponding product model to Customer. |

#### UC27 SCENARIO 1.3

|  Scenario 1.3  |                   No other available product items of selected product model.                   |                                                                 |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition   |Customer is logged in by means of an account with role 'Customer'. "Cart" page is loaded.  |                                                                       |
| Post condition | Customer has NOT increased the quantity of product items for selected product model in cart. |                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                           **System**                            |
|       1        |  Click on the 'Increase quantity by 1 (PLUS)' button of a product model.   |                                                                       |
|       2        |                                                               | Check if quantity of selected product model is > 1 in Catalogue. Check NOT ok.              |
|       3        |                                                               | Show error message to Customer for no other available product items of selected product model. |

#### UC27 SCENARIO 1.4

|  Scenario 1.4  |                      Cannot have quantity of product items for a selected product model ==0                     |                     |
| :------------: | :-----------------------------------------------------------: | :--------------------------------------------------------------: |
|  Precondition   |Customer is logged in by means of an account with role 'Customer'. "Cart" page is loaded.  |                                                                       |
| Post condition | Customer has NOT increased the quantity of product items for selected product model in cart. |                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                            **System**                            |
|       1        |  Click on the 'Decrease quantity by 1 (MINUS)' button of a product model.   |                                                                       |
|       2        |                                                               | Check if counter for quantity of corresponding product model is > 1 in current cart. Check NOT ok.              |
|       3        |                                                               | Show error message to Customer for quantity of product items for a selected product model ==0 not allowed. |


### UC28, DO CART CHECKOUT (CUSTOMER)

|   Actors Involved    |                               Customer                                |
| :------------------: | :-------------------------------------------------------------------: |
| Informal description |            Customer finalizes the cart by doing checkout.             |
|     Precondition     | Customer is logged in. Cart contains at least 1 product item. "Cart" page is loaded.|
|    Post condition    |           Customer has done checkout of their current cart.           |
|   Nominal Scenario   |             Current cart is checked out (1.1).             |
|       Variants       |                                                                       |
|      Exceptions      |        Error occurs: Do checkout without having a cart (1.2).         |
|      Exceptions      |           Error occurs: Do checkout with empty cart (1.3).            |
|      Exceptions      |            Error occurs: Product does not exist (1.4).             |
|      Exceptions      |             Error occurs: Product(s) already sold (1.5).              |
|      Exceptions      |             Error occurs: Delivery address is not valid (1.6).        |
|      Exceptions      |             Error occurs: Payment details not valid (1.7).        |
|      Exceptions      |             Error occurs: Payment transaction fails (1.8).            |

#### UC28 SCENARIO 1.1

|  Scenario 1.1  |                            Current cart is checked out cart                            |                                                                               |
| :------------: | :--------------------------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product item. |                                                                 |
| Post condition |                      Customer has done checkout of their current cart.                       |                                                                                         |
|   **Step#**    |                                     **Actor: Customer**                                      |                                               **System**                                    |
|       1        |                          Click on the 'Checkout' button.                 |                                                                                                         |
|       2        |                                                                                              |                                     Check if cart exists. Check ok.                          |
|       3        |                                                                                              |                                  Check if cart is not empty. Check ok.                  |
|       4        |                                                                                              |                                 Check if all product models in cart exist in Catalogue. Check ok.                      |
|       5        |                                                                                              |                           Check if quantity for each product model in cart is available in Catalogue. Check ok.                  |
|       6        |                                                                                 |     Compute final price of product items in cart with discounts, if any. Show final price to Customer.         |
|       7        | Select delivery address (select default delivery address or insert other delivery address).|                                                                                              |
|       8        |                                                                                              |                           If delivery address != default, check if delivery address is valid. Check ok.                            |
|       9        | Select payment details (select default payment details or insert other payment details).|                                                                                              |
|       10        |                                                                                              |    If payment details != default, check if payment details are valid. Check ok.          |
|       11        |                                                                                              |                                 Execute payment transaction. Payment transcation completed successfully.          |
|      12       |                                                                                     |                          Create order. Generate tracking code of order.                |
|       13       |                                                        | For every product item in cart, set selling date equal to current date, set sales status as sold, write order id in Inventory. |
|       14       |                                                        | For every product item in cart, update quantity of corresponding product model in Catalogue. |
|      15        |                                                                                     |                          Show confirmation message to Customer for successful checkout.    |

#### UC28 SCENARIO 1.2

|  Scenario 1.2  |                 Do checkout without having a cart.                 |                                                          |
| :------------: | :----------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart does not exist. |                                                          |
| Post condition |                     Checkout is not completed.                     |                                                          |
|   **Step#**    |                        **Actor: Customer**                         |                        **System**                        |
|       1        |             Click on the 'Checkout' button.              |                                                          |
|       2        |                                                                    |           Check if cart exists. Check NOT ok.            |
|       3        |                                                                    |                       Create cart.                       |
|       4        |                                                                    | Prompt Customer to add at least one product to cart in order to do checkout. |

#### UC28 SCENARIO 1.3

|  Scenario 1.3  |                       Do checkout with empty cart.                        |                                                          |
| :------------: | :-----------------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart is empty. |                                                          |
| Post condition |                          Checkout not completed.                          |                                                          |
|   **Step#**    |                            **Actor: Customer**                            |                        **System**                        |
|       1        |                 Click on the 'Checkout' button.                 |                                                          |
|       2        |                                                                           |             Check if cart exists. Check ok.              |
|       3        |                                                                           |        Check if cart is not empty. Check NOT ok.         |
|       4        |                                                                           | Prompt Customer to add at least one product to cart to do checkout. |

#### UC28 SCENARIO 1.4

|  Scenario 1.4  |                      Do checkout with one or more not existing products in Catalogue         |                                                                 |
| :------------: | :------------------------------------------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product item. |                                                                 |
| Post condition |                                  Checkout is not completed.                                  |                                                                 |
|   **Step#**    |                                     **Actor: Customer**                                      |                           **System**                            |
|       1        |                          Click on the 'Checkout' button.                           |                                                                 |
|       2        |                                                                                              |                 Check if cart exists. Check ok.                 |
|       3        |                                                                                              |              Check if cart is not empty. Check ok.              |
|       4        |                                                                                              |   Check if all product models in cart exist in Catalogue. Check NOT ok.                      |
|       5        |                                                                                              | Show error message to Customer with product models that do not exist. |

#### UC28 SCENARIO 1.5

|  Scenario 1.5  |                      Do checkout with one or more already sold products                      |                                                            |
| :------------: | :------------------------------------------------------------------------------------------: | :--------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product item. |                                                            |
| Post condition |                                  Checkout is not completed.                                  |                                                            |
|   **Step#**    |                                     **Actor: Customer**                                      |                         **System**                         |
|       1        |                          Click on the 'Checkout' button.                           |                                                            |
|       2        |                                                                                              |              Check if cart exists. Check ok.               |
|       3        |                                                                                              |           Check if cart is not empty. Check ok.            |
|       4        |                                                                                              |   Check if all product models in cart exist in Catalogue. Check ok.                      |
|       5        |                                                                                              |  Check if quantity for each product model in cart is available in Catalogue. Check NOT ok.                  |
|       6        |                                                                                              | Show error message to Customer with the products in cart not available in the specified quantity. |

#### UC28 SCENARIO 1.6

|  Scenario 1.6  |                            Delivery address is not valid.                            |                                                                                                         |
| :------------: | :----------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product item. |                                                                                       |
| Post condition |                                  Checkout is not completed.                                  |                                                            |
|   **Step#**    |                                     **Actor: Customer**                                      |                                               **System**                                 |
|       1        |                          Click on the 'Checkout' button.                 |                                                                                                         |
|       2        |                                                                                              |                                     Check if cart exists. Check ok.                          |
|       3        |                                                                                              |                                  Check if cart is not empty. Check ok.                  |
|       4        |                                                                                              |                                 Check if all product models in cart exist in Catalogue. Check ok.                      |
|       5        |                                                                                              |                           Check if quantity for each product model in cart is available in Catalogue. Check ok.                  |
|       6        |                                                                        |     Compute final price of product items in cart with discounts, if any. Show final price to Customer.         |
|       7        | Select delivery address (select default delivery address or insert other delivery address).|                                                                                              |
|       8        |                                                                                              |   If delivery address != default, check if delivery address is valid. Check NOT ok.                            |
|       9        |                                                                                              | Show error message to Customer for specified delivery address not valid. |

#### UC28 SCENARIO 1.7

|  Scenario 1.7  |                           Payment details not valid.                    |                                                                                                         |
| :------------: | :------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product. |                                                                            |
| Post condition |                      Checkout is not completed.                            |                                                                                                         |
|   **Step#**    |                                     **Actor: Customer**                                      |                                               **System**                                |
|       1        |                          Click on the 'Checkout' button.                 |                                                                                                         |
|       2        |                                                                                              |                                     Check if cart exists. Check ok.                          |
|       3        |                                                                                              |                                  Check if cart is not empty. Check ok.                  |
|       4        |                                                                                              |                                 Check if all product models in cart exist in Catalogue. Check ok.                      |
|       5        |                                                                                              |                           Check if quantity for each product model in cart is available in Catalogue. Check ok.                  |
|       6        |                                                                     |     Compute final price of product items in cart with discounts, if any. Show final price to Customer.         |
|       7        | Select delivery address (select default delivery address or insert other delivery address).|                                                                                              |
|       8        |                                                                                              |   If delivery address != default, check if delivery address is valid. Check ok.                            |
|       9        | Select payment details (select default payment details or insert other payment details).|                                                                                              |
|       10        |                                                                                              |    If payment details != default, check if payment details are valid. Check NOT ok.          |
|       11       |                                                                                              | Show error message to Customer for specified payment details not valid.          |

#### UC28 SCENARIO 1.8

|  Scenario 1.8  |                           Payment transaction fails                     |                                                                                                         |
| :------------: | :------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product. |                                                                            |
| Post condition |                      Checkout is not completed.                            |                                                                                                         |
|   **Step#**    |                                     **Actor: Customer**                                      |                                               **System**                                |
|       1        |                          Click on the 'Checkout' button.                 |                                                                                                         |
|       2        |                                                                                              |                                     Check if cart exists. Check ok.                          |
|       3        |                                                                                              |                                  Check if cart is not empty. Check ok.                  |
|       4        |                                                                                              |                                 Check if all product models in cart exist in Catalogue. Check ok.                      |
|       5        |                                                                                              |                           Check if quantity for each product model in cart is available in Catalogue. Check ok.                  |
|       6        |                                                                            |     Compute final price of product items in cart with discounts, if any. Show final price to Customer.         |
|       7        | Select delivery address (select default delivery address or insert other delivery address).|                                                                                              |
|       8        |                                                                                              |                           If delivery address != default, check if delivery address is valid. Check ok.                            |
|       9        | Select payment details (select default payment details or insert other payment details).|                                                                                              |
|       10        |                                                                                              |    If payment details != default, check if payment details are valid. Check ok.          |
|       11        |                                                                                              |                                 Execute payment transaction. Payment transcation NOT completed successfully.          |
|       12        |                                                                                              | Show error message to Customer for failure of payment transaction.          |

### UC29, SEE ORDER HISTORY (CUSTOMER)

|   Actors Involved    |                              Customer                              |
| :------------------: | :----------------------------------------------------------------: |
| Informal description | Customer wants to retrieve information about their order history . |
|     Precondition     |  Customer has an account. Customer is logged in. |
|    Post condition    |         Customer has retrieved their Order history.               |
|   Nominal Scenario   |            Order history successfully retrieved. (1.1)             |
|       Variants       |                                                                    |
|      Exceptions      |                                                                    |

#### UC29 SCENARIO 1.1

|  Scenario 1.1  |                                                 Order history successfully retrieved.                                                 |                                     |
| :------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------: |
|  Precondition  |             Customer has an account. Customer is logged in.                                                   |                                     |
| Post condition |                        Customer has retrieved their Order history.                                                |                                     |
|   **Step#**    |                                                          **Actor: Customer**                                                          |             **System**              |
|       1        | Click on button 'User' in top right corner. Select option 'See Order History' from dropdown menu.                     |                             |
|       2        |                                                                                                                                       | Retrieve order history of Customer. |
|       3        |                                                                                                                                       |    Load "Order History" page.       |
|       4        |                                                                                                                                       |   Show order history to Customer.   |

### UC30, SEE PAST ORDER DATA (CUSTOMER)

|   Actors Involved    |                             Customer                             |
| :------------------: | :--------------------------------------------------------------: |
| Informal description | Customer wants to retrieve data about a past order. |
|     Precondition     |         Customer has an account. Customer is logged in. "Order History" page is loaded.          |
|    Post condition    |     Customer has retrieved selected past Order data.              |
|   Nominal Scenario   |            Selected past order data successfully retrieved. (1.1)            |
|       Variants       |                                                                  |
|      Exceptions      |                                                                  |

#### UC30 SCENARIO 1.1

|  Scenario 1.1  |                                                Selected past order data successfully retrieved.                                           |                                    |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  Precondition  |                                      Customer has an account. Customer is logged in. "Order History" page is loaded.        |                                    |
| Post condition |                                 Customer has retrieved selected past order data.                                                          |                                       |
|   **Step#**    |                                                            **Actor: Customer**                                                            |             **System**             |
|       1        | Select one of the past orders.                                                                                                            |                                    |
|       2        |                                                                                                                                           | Retrieve data for selected past order of Customer. |
|       3        |                                                                                                                                           |   Show selected past order data to Customer.   |

### UC31, TRACK ORDER (CUSTOMER)

|   Actors Involved    |                                             Customer                                             |
| :------------------: | :----------------------------------------------------------------------------------------------: |
| Informal description |                          Customer wants to track an order they made.                             |
|     Precondition     | Customer has an account. Customer is logged in. Customer has made an order on EzElectronics website. "Order History" page is loaded. |
|    Post condition    |                Customer has retrieved tracking info about their order.                           |
|   Nominal Scenario   |                           Tracking info successfully displayed. (1.1)                            |
|       Variants       |                                                                                                  |
|      Exceptions      |                            Error occurs: Tracking info not displayed. (1.2)                      |
|      Exceptions      |                           Error occurs: Tracking code does not exist. (1.3)                     |

#### UC31 SCENARIO 1.1

|  Scenario 1.1  |             Tracking info successfully displayed.             |                                                                                                 |
| :------------: | :--------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
|  Precondition  |  Customer has an account. Customer is logged in. Customer has made an order on EzElectronics website. "Order History" page is loaded.       |                       |
| Post condition |   Customer has retrieved tracking info about their order.       |                                                                                              |
|   **Step#**    |                       **Actor: Customer**                        |                                           **System**                                            |
|       1        |   Select an order from list with order history. (UC30)       |                                                                                                 |
|       2        | Click on the 'Tracking' button of the order.                     |                                                                                                   |
|       3        |                                                                  | Open a new page managed by the shipping company showing tracking info of selected order. |

#### UC31 SCENARIO 1.2

|  Scenario 1.2  |           Tracking info not displayed.                           |                                                          |
| :------------: | :--------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. Customer made an order on EzElectronics website. "Order History" page is loaded. |                                |
| Post condition |   Customer has NOT retrieved tracking info about their order.     |                                                          |
|   **Step#**    |                       **Actor: Customer**                        |                        **System**                        |
|       1        |   Select an order from list with order history. (UC30)       |                                                                                                 |
|       2        | Click on the 'Tracking' button of the order.                     |                                                          |
|       3        |                                                                  | Error occurs while opening a new page managed by the shipping company. |
|       4        |                                                                  | Show error message to Customer for failure in retrieval of tracking info. |

#### UC31 SCENARIO 1.3

|  Scenario 1.3  |                  Tracking code does not exist.                  |                                                                |
| :------------: | :--------------------------------------------------------------: | :------------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. Customer made an order on EzElectronics website. "Order History" page is loaded. |  |
| Post condition |  Customer has NOT retrieved tracking info about their order.  |                                                                |
|   **Step#**    |                       **Actor: Customer**                        |                           **System**                           |
|       1        |   Select an order from list with order history. (UC30)       |                                                                                                 |
|       2        | Click on the 'Tracking' button of the order.                     |                                                          |
|       3        |                                                                  | Error occurs while retrieving tracking info associated to the tracking code of the selected order. |
|       4        |                                                                  | Show error message to Customer for tracking code not tracking |

### UC32, SEE DISCOUNTS (MANAGER)

|   Actors Involved    |                             Manager                             |
| :------------------: | :--------------------------------------------------------------: |
| Informal description | Manager wants to retrieve data about a discount. |
|     Precondition     |         Manager has an account. Manager is logged in.     |
|    Post condition    |     Manager has retrieved data about selected discount.              |
|   Nominal Scenario   |            Selected discount data successfully retrieved. (1.1)            |
|       Variants       |                                                                  |
|      Exceptions      |                                                                  |

#### UC32 SCENARIO 1.1

|  Scenario 1.1  |                                                Selected discount data successfully retrieved.                                           |                                    |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  Precondition  |                                       Manager has an account. Manager is logged in.                                                      |                                    |
| Post condition |                                Manager has retrieved data about selected discount.                                                       |                                       |
|   **Step#**    |                                                            **Actor: Manager**                                                            |             **System**             |
|       1        |  Click on button 'Discount' in navigation bar.                              |                                    |
|       2        |  Select one of the discounts in Discount table.                               |                                    |
|       3        |                                                                                                                                           | Retrieve data for selected discount. |
|       4        |                                                                                                                                           |   Show selected discount data to Manager.   |

### UC33, STOR (MANAGER)

|   Actors Involved    |                                 Manager                                 |
| :------------------: | :---------------------------------------------------------------------: |
| Informal description |     Manager wants to add a discount for a specific model or category.      |
|     Precondition     |             Manager is logged in with role 'Manager'. "Discount" page is loaded. |
|    Post condition    |          Manager has added a discount for a specific model or category.  |
|   Nominal Scenario   | Discount successfully added for a specific model. (1.1) |
|       Variants       | Discount successfully added for a specific category. (1.2) |
|      Exceptions      |          Error occurs: start date and/or end date are not valid. (1.3)  |
|      Exceptions      |               Error occurs: discount value is not valid. (1.4)                |

#### UC33 SCENARIO 1.1

|  Scenario 1.1  |             Discount successfully added for a specific model.             |                                                               |
| :------------: | :----------------------------------------------------------------------: | :-----------------------------------------------------------: |
|  Precondition  |                  Manager is logged in with role 'Manager'. "Discount" page is loaded.                  |                                                            |
| Post condition |       Manager has added a discount on a specific model.           |                                                                      |
|   **Step#**    |                            **Actor: Manager**                            |                          **System**                           |
|       1        |   Select the model for which to add a discount. Insert discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check OK. |
|       3        |                                                                          |           Check discount value. Check OK.            |
|       4        |                                                                          |                Register discount for specific model in Discount database table.      |
|       5        |                                                                          |       Show confirmation message to Manager for insertion of discount for specific model. |

#### UC33 SCENARIO 1.2

|  Scenario 1.2  |             Discount successfully added to a specific category.             |                                                               |
| :------------: | :-------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|  Precondition  |                   Manager is logged in with role 'Manager'. "Discount" page is loaded.                    |                                                               |
| Post condition |         Manager has added a discount on a specific category.              |                                                               |
|   **Step#**    |                             **Actor: Manager**                              |                          **System**                           |
|       1        |   Select the category for which to add a discount. Insert discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check OK. |
|       3        |                                                                          |           Check discount value. Check OK.            |
|       4        |                                                                          |                Register discount for specific category in Discount database table.      |
|       5        |                                                                          |       Show confirmation message to Manager for insertion of discount for specific category. |

#### UC33 SCENARIO 1.3

|  Scenario 1.3  |                        Start date and/or end date are not valid.                        |                                                                   |
| :------------: | :----------------------------------------------------------------------------------: | :---------------------------------------------------------------: |
|  Precondition  |                        Manager is logged in with role 'Manager'. "Discount" page is loaded.                        |                                                                   |
| Post condition |                             Manager has NOT added a discount.                     |                                                                   |
|   **Step#**    |                                  **Actor: Manager**                                  |                            **System**                             |
|       1        |   Select the model or category for which to add a discount. Insert discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check NOT OK. |
|       3        |                                                                          |       Show error message to Manager for invalid start/end date. |

#### UC33 SCENARIO 1.4

|  Scenario 1.4  |                            Discount value is not valid.                             |                                                                            |
| :------------: | :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  |                        Manager is logged in with role 'Manager'. "Discount" page is loaded.                        |                                                                            |
| Post condition |                               Manager has NOT added a discount.                        |                                                                            |
|   **Step#**    |                                  **Actor: Manager**                                  |                                 **System**                                 |
|       1        |   Select the model or category for which to add a discount. Insert discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check OK. |
|       3        |                                                                          |           Check discount value. Check NOT OK.            |
|       4        |                                                                          |       Show error message to Manager for invalid discount value. |

### UC34, REMOVE DISCOUNT (MANAGER)

|   Actors Involved    |                                                  Manager                                                  |
| :------------------: | :-------------------------------------------------------------------------------------------------------: |
| Informal description |                     Manager wants to remove discount from a specific model or category.                     |
|     Precondition     | Manager is logged in with role 'Manager'. At least one discount on a specific model or category exists. "Discount" page is loaded. |
|    Post condition    |                      Manager has removed a discount from a specific model or category.                          |
|   Nominal Scenario   |                      Discount successfully removed from a specific model. (1.1)                     |
|       Variants       |                     Discount successfully removed from a specific category. (1.2)                             |
|      Exceptions      |                                                                                                                |

#### UC34 SCENARIO 1.1

|  Scenario 1.1  |                    Discount successfully removed for a specific model                    |                                                  |
| :------------: | :--------------------------------------------------------------------------------------: | :----------------------------------------------: |
|  Precondition  | Manager is logged in with role 'Manager'. At least one discount on a specific model exists. "Discount" page is loaded. |                                   |
| Post condition |            Manager has removed a discount from a specific model.                         |                                                  |
|   **Step#**    |                                    **Actor: Manager**                                    |                    **System**                    |
|       1        |    Select a discount for a model. Click on the 'Delete discount' button.                             |                                           |
|       2        |                                                                                          |  Delete selected discount for a specific model from Discount database table. |
|       3        |                                                                          |       Show confirmation message to Manager for removal of discount for specific model. |

#### UC34 SCENARIO 1.2

|  Scenario 1.2  |                    Discount successfully removed for a specific category                    |                                                     |
| :------------: | :-----------------------------------------------------------------------------------------: | :-------------------------------------------------: |
|  Precondition  | Manager is logged in with role 'Manager'. At least one discount on a specific category exists. "Discount" page is loaded. |                                                     |
| Post condition |         Manager has removed a discount from a specific category.                            |                                                     |
|   **Step#**    |                                     **Actor: Manager**                                      |                     **System**                      |
|       1        |    Select a discount for a category. Click on the 'Delete discount' button.                             |                                           |
|       2        |                                                                                          |  Delete selected discount for a specific category from Discount database table. |
|       3        |                                                                          |       Show confirmation message to Manager for removal of discount for specific catefory. |


### UC35, MODIFY DISCOUNT (MANAGER)

|   Actors Involved    |                                                  Manager                                                   |
| :------------------: | :--------------------------------------------------------------------------------------------------------: |
| Informal description |                     Manager wants to modify discount fo a specific model or category.                      |
|     Precondition     | Manager is logged in with role 'Manager'. At least one discount for a specific model or category exists. "Discount" page is loaded. |
|    Post condition    |                         Manager has modified a discount for a specific model or category.                    |
|   Nominal Scenario   |                 Discount successfully modified for a specific model. (1.1)                 |
|       Variants       |                 Discount successfully modified for a specific category. (1.2)                |
|      Exceptions      |        Error occurs: start date and/or end date are not valid. (1.3)         |
|      Exceptions      |              Error occurs: discount value is not valid. (1.4)               |

#### UC35 SCENARIO 1.1

|  Scenario 1.1  |                   Discount successfully modified for a specific model                    |                                                                              |
| :------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|  Precondition  | Manager is logged in with role 'Manager'. At least one discount for a specific model exists. "Discount" page is loaded. |                                                                |
| Post condition |            Manager has modified a discount of a specific model.        |                                                                              |
|   **Step#**    |                                    **Actor: Manager**                                    |                                  **System**                                  |
|       1        |   Select the discount for a model to be modified. Input new discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check OK. |
|       3        |                                                                          |           Check discount value. Check OK.            |
|       4        |                                                                          |                Modify discount for specific model in Discount database table.      |
|       5        |                                                                          |       Show confirmation message to Manager for modification of discount for specific model. |

#### UC35 SCENARIO 1.2

|  Scenario 1.2  |                   Discount successfully modified for a specific category                    |                                                                              |
| :------------: | :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|  Precondition  | Manager is logged in with role 'Manager'. At least one discount for a specific category exists. "Discount" page is loaded. |                                          |
| Post condition |         Manager has modified a discount of a specific category.        |                                                                              |
|   **Step#**    |                                     **Actor: Manager**                                      |                                  **System**                                  |
|       1        |   Select the discount for a category to be modified. Input new discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check OK. |
|       3        |                                                                          |           Check discount value. Check OK.            |
|       4        |                                                                          |                Modify discount for specific category in Discount database table.      |
|       5        |                                                                          |       Show confirmation message to Manager for modification of discount for specific category. |

#### UC35 SCENARIO 1.3

|  Scenario 1.3  |               Start date and/or end date are not valid.                                              |                                                                                       |
| :------------: | :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|  Precondition  |  Manager is logged in with role 'Manager'. At least one discount for a specific model or category exists. "Discount" page is loaded.  |                      |
| Post condition |         Manager has NOT modified a discount for a specific model or category.               |                                                                                       |
|   **Step#**    |                                          **Actor: Manager**                                          |                                      **System**                                       |
|       1        |   Select the discount for a model or category to be modified. Input new discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check NOT OK. |
|       3        |                                                                          |       Show error message to Manager for invalid start/end date. |

#### UC35 SCENARIO 1.4

|  Scenario 1.4  |                    Discount value is not valid.                      |                                                                            |
| :------------: | :--------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|  Precondition  | Manager is logged in with role 'Manager'. At least one discount for a specific model or category exists. "Discount" page is loaded. |                                                         |
| Post condition |      Manager has NOT modified a discount for a specific model or category.                  |                                                                            |
|   **Step#**    |                                          **Actor: Manager**                                          |                                 **System**                                 |
|       1        |   Select the discount for a model or category to be modified. Input new discount parameters. Confirm.  |                                                               |
|       2        |                                                                          |       Check for start date and end date validity. Check OK. |
|       3        |                                                                          |           Check discount value. Check NOT OK.            |
|       4        |                                                                          |       Show error message to Manager for invalid discount value. |

### UC36, SEE WISHLIST CONTENT (CUSTOMER)

|   Actors Involved    |                     Customer                      |
| :------------------: | :-----------------------------------------------: |
| Informal description |   Customer wants to see the content of their wishlist.    |
|     Precondition     |  Customer has an account. Customer is logged in.  |
|    Post condition    |   Customer has retrieved the content of their wishlist.   |
|   Nominal Scenario   |   Wishlist of customer successfully retrieved.    |
|       Variants       |                                                   |
|      Exceptions      | Error occurs: Wishlist of Customer not retrieved. |

#### UC36 SCENARIO 1.1

|  Scenario 1.1  |              Wishlist of Customer successfully retrieved                  |                                |
| :------------: | :-----------------------------------------------------------------------: | :----------------------------: |
|  Precondition  |              Customer has an account. Customer is logged in.              |                                |
| Post condition |                    Wishlist of customer is retrieved.                     |                                |
|   **Step#**    |                        **Actor: Customer**                                |           **System**           |
|       1        | Click on the button 'Cart' in top right corner of any page.     |                                |
|       2        |                                                                           | Retrieve wishlist of Customer. |
|       3        |                                                                           |       Load page "Cart".        |
|       4        |                                                                           |     Show wishlist to Customer.     |

#### UC36 SCENARIO 1.2

|  Scenario 1.2  |                    Wishlist of Customer not retrieved                     |                                                                        |
| :------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|  Precondition  |              Customer has an account. Customer is logged in.              |                                                                        |
| Post condition |                  Wishlist of customer is NOT retrieved.                   |                                                                        |
|   **Step#**    |                        **Actor: Customer**                                |                               **System**                               |
|       1        | Click on the button 'Cart' in top right corner of any page.     |                                |
|       2        |                                                                           |          Error occurs while retrieving wishlist of Customer.           |
|       3        |                                                                           | Show error message to Customer for unsuccessful retrieval of wishlist. |

### UC37, ADD PRODUCT TO WISHLIST (CUSTOMER)

|   Actors Involved    |                         Customer                          |
| :------------------: | :-------------------------------------------------------: |
| Informal description |     Customer wants to add a product model to their wishlist.      |
|     Precondition     |     Customer has an account. Customer is logged in. "Products" page or "Detailed Product" page is loaded.      |
|    Post condition    |       Customer has added the selected product model to the wishlist.         |
|   Nominal Scenario   | Product model successfully added to the wishlist. (1.1) |
|       Variants       |                                                           |
|      Exceptions      |        Error occurs: Product model does not exist. (1.2)        |
|      Exceptions      | Error occurs: Product model already present in wishlist. (1.3)  |

#### UC37 SCENARIO 1.1

|  Scenario 1.1  |      Product model successfully added to the wishlist.      |                                                                           |
| :------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------------------: |
|  Precondition  |       Customer has an account. Customer is logged in. "Products" page or "Detailed Product" page is loaded.         |                                                                           |
| Post condition |     Customer has added the selected product model to the wishlist.        |                                                                           |
|   **Step#**    |                      **Actor: Customer**                      |                                **System**                                 |
|       1        | Click on the 'Add to wishlist' button of a product model. |                                                                           |
|       3        |                                                               |                    Check if product model exists. Check ok.                     |
|       5        |                                                               |          Check if product model is not yet in the wishlist. Check ok.           |
|       6        |                                                               |                       Add product model to the wishlist.                        |
|       7        |                                                               | Show confirmation mto Customer for product model added successfully to wishlist. |

#### UC37 SCENARIO 1.2

|  Scenario 1.2  |                Product model does not exist.              |                                                                 |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  |       Customer has an account. Customer is logged in. "Product" page is loaded.        |                                                                 |
| Post condition |  Customer has NOT added the selected product model to the wishlist.     |                                                                 |
|   **Step#**    |                      **Actor: Customer**                      |                           **System**                            |
|       1        | Click on the 'Add to wishlist' button of a product model. |                                                                 |
|       3        |                                                               |             Check if product model exists. Check NOT ok.              |
|       4        |                                                               | Show error message to Customer for product model that does not exist. |

#### UC38 SCENARIO 1.3

|  Scenario 1.3  |       Product model already present in wishlist.              |                                                                             |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------------------: |
|  Precondition  |       Customer has an account. Customer is logged in. "Product" page is loaded.        |                                                                             |
| Post condition |  Customer has NOT added the selected product model to the wishlist.      |                                                                             |
|   **Step#**    |                      **Actor: Customer**                      |                                 **System**                                  |
|       1        | Click on the 'Add to wishlist' button of a product model. |                                                                             |
|       3        |                                                               |                     Check if product model exists. Check ok.                      |
|       5        |                                                               |         Check if product model is not yet in the wishlist. Check NOT ok.          |
|       6        |                                                               | Show error message to Customer for product model that is already in the wishlist. |

### UC38, REMOVE PRODUCT FROM WISHLIST (CUSTOMER)

|   Actors Involved    |                            Customer                            |
| :------------------: | :------------------------------------------------------------: |
| Informal description |     Customer wants to remove a product model from the wishlist.      |
|     Precondition     |       Customer is logged in. "Cart" page is loaded.        |
|    Post condition    |         Customer has removed the selected product model from the wishlist.         |
|   Nominal Scenario   |  Selected product model is removed from the wishlist. (1.1) |
|       Variants       |                                                                |
|      Exceptions      |       Error occurs: Product model not found in wishlist. (1.2)       |

#### UC38 SCENARIO 1.1

|  Scenario 1.1  |                Selected product model is removed from the wishlist.                 |                                                                          |
| :------------: | :-------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|  Precondition  |                    Customer is logged in. "Cart" page is loaded.                    |                                                                          |
| Post condition |                Customer has removed the selected product model from the wishlist.                      |                                                                          |
|   **Step#**    |                                   **Actor: Customer**                                   |                                **System**                                |
|       1        | Click on the 'Remove from wishlist' button next to a product model in the wishlist. |                                                                          |
|       2        |                                                                                         |              Check if product model is in the wishlist. Check ok.              |
|       3        |                                                                                         |                    Remove product model from the wishlist.                     |
|       4        |                                                                                         | Show confirmation to Customer for product model that is removed from wishlist. |

#### UC38 SCENARIO 1.2

|  Scenario 1.2  |                            Product model not found in wishlist.                             |                                                                   |
| :------------: | :-------------------------------------------------------------------------------------: | :---------------------------------------------------------------: |
|  Precondition  |                    Customer is logged in. "Cart" page is loaded.                    |                                                                   |
| Post condition |               Customer has NOT removed the selected product model from the wishlist.                  |                                                                   |
|   **Step#**    |                                   **Actor: Customer**                                   |                            **System**                             |
|       1        | Click on the 'Remove from wishlist' button next to a product model in the wishlist. |                                                                   |
|       2        |                                                                                         |        Check if product model is in the wishlist. Check NOT ok.         |
|       3        |                                                                                         | Show error message to Customer for product model not found in wishlist. |

### UC39, DELETE WISHLIST CONTENT (CUSTOMER)

|   Actors Involved    |                                        Customer                                         |
| :------------------: | :-------------------------------------------------------------------------------------: |
| Informal description |          Customer wants to delete all the product models inside their wishlist.           |
|     Precondition     |                    Customer is logged in. "Cart" page is loaded.                    |
|    Post condition    |               Customer has removed all the product models in the wishlist. Wishlist is empty.                |
|   Nominal Scenario   |            All products from wishlist are removed. Wishlist is empty. (1.1)             |
|       Variants       |                                                                                         |
|      Exceptions      |                                                                                         |

#### UC39 SCENARIO 1.1

|  Scenario 1.1  |    All products from wishlist are removed. Wishlist is empty.      |                                                   |
| :------------: | :--------------------------------------------------------------: | :-----------------------------------------------: |
|  Precondition  |        Customer is logged in. "Cart" page is loaded.         |                                                   |
| Post condition |   Customer has removed all the product models in the wishlist. Wishlist is empty.    |                                                   |
|   **Step#**    |                       **Actor: Customer**                        |                    **System**                     |
|       1        | Click on the 'Delete Wishlist' button of the wishlist.           |                                                   |
|       2        |                                                                  | Remove all the products from the wishlist. (UC38) |
|       3        |                                                                  |          Show confirmation message to Customer for deleted content of wishlist.           |

### UC40, ADD PRODUCT FROM WISHLIST TO CURRENT CART (CUSTOMER)

|   Actors Involved    |                           Customer                           |
| :------------------: | :----------------------------------------------------------: |
| Informal description |       Customer wants to add a single item of a product model from the wishlist to the current cart.      |
|     Precondition     |       Customer is logged in. "Cart" page is loaded.       |
|    Post condition    |          Customer has added a single item of the selected product model from the wishlist to the current cart.            |
|   Nominal Scenario   |    A single product item of a product model is successfully added from the wishlist to the current cart. (1.1)     |
|       Variants       |      A single product item of a product model is successfully added from the wishlist to the current cart (without initally having a cart). (1.2)      |
|      Exceptions      |         Error occurs: Product model does not exist in Catalogue. (1.3)          |
|      Exceptions      |         Error occurs: No items of selected product model are available. (1.4)           |
|      Exceptions      |         Error occurs: Product item already present in current cart. (1.5) |

#### UC40 SCENARIO 1.1

|  Scenario 1.1  |       A single product item of a product model is successfully added from the wishlist to the current cart.        |                                                                       |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. |                                                                       |
| Post condition | Customer has added a single item of the selected product model from the wishlist to the current cart. |                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                              **System**                               |
|       1        |   Click on the 'Add to cart' button of a product model of the wishlist.   |                                                                       |
|       2        |                                                               |                    Check if cart exists. Check ok.                    |
|       3        |                                                               |                  Check if product model exists in Catalogue. Check ok.                   |
|       4        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check ok.              |
|       5        |                                                               |          Check if product item of selected product model is not already in the cart. Check ok.           |
|       6        |                                                               |           Add a single product item of the selected product model from the wishlist to the cart.                        |
|       7        |                                                | Show confirmation message to Customer for a single product item of selected product model added successfully from the wishlist to current cart. |

#### UC40 SCENARIO 1.2

|  Scenario 1.2  |    A single product item of a product model is successfully added from the wishlist to the current cart (without initally having a cart).              |                   |
| :------------: | :-------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. |                                                                       |
| Post condition | Customer has added a single item of the selected product model from the wishlist to the current cart.              |                                                                       |
|   **Step#**    |                          **Actor: Customer**                          |                              **System**                               |
|       1        |       Click on the 'Add to cart' button of a product model of the wishlist.       |                                                                       |
|       2        |                                                                       |                  Check if cart exists. Check NOT ok.                  |
|       3        |                                                                       |           Create a cart object associated to the Customer.            |
|       4        |                                                               |                  Check if product model exists in Catalogue. Check ok.                   |
|       5        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check ok.              |
|       6        |                                                               |          Check if product item of selected product model is not already in the cart. Check ok.           |
|       7        |                                                               |           Add a single product item of the selected product model from the wishlist to the cart.                        |
|       8        |                                               | Show confirmation message to Customer for a single product item of selected product model added successfully from the wishlist to current cart. |

#### UC40 SCENARIO 1.3

|  Scenario 1.3  |                    Product model does not exist in Catalogue.                    |                                                                 |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. |                                                                       |
| Post condition |  Customer has NOT added a single item of the selected product model from the wishlist to the current cart.              |                       |
|   **Step#**    |                      **Actor: Customer**                      |                           **System**                            |
|       1        |   Click on the 'Add to cart' button of a product model of the wishlist.   |                                                                 |
|       2        |                                                               |                 Check if cart exists. Check ok.                 |
|       3        |                                                               |             Check if product model exists in Catalogue. Check NOT ok.              |
|       4        |                                                               | Show error message to Customer for product model that does not exist in Catalogue. |

#### UC40 SCENARIO 1.4

|  Scenario 1.4  |                     No items of selected product model are available.                     |                     |
| :------------: | :-----------------------------------------------------------: | :--------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. |                                                                       |
| Post condition |  Customer has NOT added a single item of the selected product model from the wishlist to the current cart.              |                                                                  |
|   **Step#**    |                      **Actor: Customer**                      |                            **System**                            |
|       1        |   Click on the 'Add to cart' button of a product model of the wishlist.   |                                                                  |
|       2        |                                                               |                 Check if cart exists. Check ok.                  |
|       3        |                                                               |                Check if product model exists in Catalogue. Check ok.                |
|       4        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check NOT ok.              |
|       5        |                                                               | Show error message to Customer for selected product model that is not available in Catalogue. |

#### UC40 SCENARIO 1.5

|  Scenario 1.5  |           Product item already present in current cart.            |                                                                         |
| :------------: | :-----------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. |                                                                       |
| Post condition |  Customer has NOT added a single item of the selected product model from the wishlist to the current cart.  |                                                                         |
|   **Step#**    |                      **Actor: Customer**                      |                               **System**                                |
|       1        |   Click on the 'Add to cart' button of a product model of the wishlist.   |                                                                         |
|       2        |                                                               |                     Check if cart exists. Check ok.                     |
|       3        |                                                               |                   Check if product exists. Check ok.                    |
|       4        |                                                               |              Check if quantity of selected product model is >=1 in Catalogue. Check ok.              |
|       7        |                                                               |          Check if product item of selected product model is not already in the cart. Check NOT ok.           |
|       8        |                                                               | Show error message to Customer for a single item of selected product model already present in current cart. |

### UC41, SEE REVIEW (CUSTOMER)

|   Actors Involved    |                               Customer                                |
| :------------------: | :-------------------------------------------------------------------: |
| Informal description | Customer wants to see reviews about a product model. |
|     Precondition     |            Customer has an account. Customer is logged in. "Products" page is loaded.           |
|    Post condition    |             Customer has retrieved reviews of the selected product model.       |
|   Nominal Scenario   |                 Reviews successfully displayed. (1.1)                 
|       Variants       |                                                                       |
|      Exceptions      |                  Error occurs: Reviews not displayed. (1.2)                  |

#### UC41 SCENARIO 1.1

|  Scenario 1.1  |               Reviews successfully displayed.               |                                       |
| :------------: | :---------------------------------------------------------: | :-----------------------------------: |
|  Precondition  |    Customer has an account. Customer is logged in. "Products" page is loaded.          |                      |
| Post condition | Customer has retrieved reviews of the selected product.     |                                       |
|   **Step#**    |                     **Actor: Customer**                     |              **System**               |
|       1        |      Select a product model. (UC6)      |                                       |
|       2        |                                                             | Load "Detailed product" page.     |
|       3        |                                                             | Show reviews. |

#### UC41 SCENARIO 1.2

|  Scenario 1.2  |               Reviews not successfully displayed.               |                                                          |
| :------------: | :-------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  |        Customer has an account. Customer is logged in. "Product" page is loaded.           |                                        |
| Post condition | Customer has NOT retrieved reviews of the selected product model.          |                                                          |
|   **Step#**    |                       **Actor: Customer**                       |                        **System**                        |
|       1        |        Select a product model. (UC6)        |                                                          |
|       2        |                                                                 | Error occurs while retrieving product model details. |
|       3        |                                                                 | Show error message to Customer for failure in retrieval of product model details. |

### UC42, ADD REVIEW (CUSTOMER)

|   Actors Involved    |                                               Customer                                               |
| :------------------: | :--------------------------------------------------------------------------------------------------: |
| Informal description |                 Customer wants to leave a review about a product model that they bought.                   |
|     Precondition     | Customer has an account. Customer is logged in. Customer has bought at least one product item of the product model to be reviewed. "Order History" page is loaded. An order from the list is selected.|
|    Post condition    |                   Customer has added a review for a specific product model.                            |
|   Nominal Scenario   |                                 Review successfully added. (1.1)                                 |
|       Variants       |                                                                                                      |
|      Exceptions      |                Error occurs: Wrong/Missing review parameters. (1.2)                                                                                  |

#### UC42 SCENARIO 1.1

|  Scenario 1.1  |                                    Review successfully added.                                    |                                                            |
| :------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. Customer has bought at least one product item of the product model to be reviewed. "Order History" page is loaded. An order from the list is selected. |                             |
| Post condition |              Customer has added a review for a specific product model.                    |                                                            |
|   **Step#**    |                                         **Actor: Customer**                                          |                         **System**                         |
|       1        |  Click on button 'Leave review' of the product to be reviewed. |                                                            |
|       2        |                                                                                                      | Prompt Customer to insert parameters for a review. |
|       3        |      Insert requested parameters to add a review. Click on 'Add review' button.               |                                                            |
|       4        |                                                                  |     Check if review parameters are valid. Check OK.                     |
|       5        |                                                                                                      | Register review in Review database table.  |
|       6        |                                                                                                      | Recompute average rating of reviews for corresponding product model.. |
|       7        |                                                                                                      | Show confirmation message to Customer for review added succssfully.             |

#### UC42 SCENARIO 1.2

|  Scenario 1.1  |                                    Wrong/Missing review parameters.                                   |                                                            |
| :------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. Customer has bought at least one product item of the product model to be reviewed. "Order History" page is loaded. An order from the list is selected. ||
| Post condition |              Customer has added a review for a specific product model.                    |                                                            |
|   **Step#**    |                                         **Actor: Customer**                                          |                         **System**                         |
|       1        |  Click on button 'Leave review' of the product to be reviewed. |                                                            |
|       2        |                                                                                                      | Prompt Customer to insert parameters for a review. |
|       3        |      Insert requested parameters to add a review. Click on 'Add review' button.               |                                                            |
|       4        |                                                                  |     Check if review parameters are valid. Check NOT OK.                                                       |
|       7        |                                                              |    Show error message to Customer for wrong/missing review parameters.       |

### UC43, DELETE REVIEW (CUSTOMER)

|   Actors Involved    |                                                                 Customer                                                                 |
| :------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
| Informal description |                         Customer wants to delete a review of a product model already reviewed.                          |
|     Precondition     | Customer has an account. Customer is logged in. Customer has already added a review for a product model. "Order History" page is loaded. An order from the list is selected. |
|    Post condition    |                                       Customer has deleted the selected review of related product model.                                                   |
|   Nominal Scenario   |                                                    Review successfully deleted. (1.1)                                                    |
|       Variants       |                                                                                                                                          |
|      Exceptions      |                                                                                                                                          |

#### UC43 SCENARIO 1.1

|  Scenario 1.1  |                                          Review successfully deleted.                                           |                                         |
| :------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------: |
|  Precondition  |  Customer has an account. Customer is logged in. Customer has already added a review for a product model. "Order History" page is loaded. An order from the list is selected. |    |
| Post condition |                          Customer has deleted the selected review of related product model.                          |                                         |
|   **Step#**    |                                               **Actor: Customer**                                               |               **System**                |
|       1        |            Click on the 'Delete review' button of a product model for which a review has been added.                   |                         |
|       2        |                                                                                                                 |    Prompt user to confirm 'Delete review' operation.     |
|       3        |                         Confirm delete review operation.                                                         |                                                        |
|       4        |                                                                                                                 | Delete selected review from Review database table. |
|       5        |                                                                                                                 | Recompute average rating of reviews for corresponding product model. |
|       6        |                                                                                                      | Show confirmation message to Customer for deletion of review successfully.             |

### UC44, MODIFY REVIEW (CUSTOMER)

|   Actors Involved    |                                                                 Customer                                                                 |
| :------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
| Informal description |                         Customer wants to modify a review of a product model already reviewed.                          |
|     Precondition     | Customer has an account. Customer is logged in. Customer has already added a review for a product model. "Order History" page is loaded. An order from the list is selected. |
|    Post condition    |                                  Customer has modified the selected review of related product model.                                                  |
|   Nominal Scenario   |                                                   Review successfully modified. (1.1)                                                    |
|       Variants       |                                                                                                                                          |
|      Exceptions      |                                                    Error occurs: Wrong/Missing review parameters. (1.2)                                                  |

#### UC44 SCENARIO 1.1

|  Scenario 1.1  |                                          Review successfully modified.                                          |                                         |
| :------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. Customer has already added a review for a product model. "Order History" page is loaded. An order from the list is selected. |               |
| Post condition |                           Customer has modified the selected review of related product model.                          |                                         |
|   **Step#**    |                                               **Actor: Customer**                                               |               **System**                |
|       1        |            Click on the 'Modify review' button of a product model for which a review has been added.           ||
|       2        |                                                                                                                 |    Prompt user to input new values for 'Modify review' operation.     |
|       3        |                         Input new values to modify review. Confirm.                                      |                                                        |
|       4        |                                                                                                              |     Check if review parameters are valid. Check OK.                     |
|       5        |                                                                                                                 | Modify selected review in Review database table. |
|       6        |                                                                                                                 | Recompute average rating of reviews for corresponding product model. |
|       7        |                                                                                                      | Show confirmation message to Customer for modification of review successfully.   |

#### UC44 SCENARIO 1.2

|  Scenario 1.2  |                                          Wrong/Missing review parameters.                                          |                                         |
| :------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. Customer has already added a review for a product model. "Order History" page is loaded. An order from the list is selected. |               |
| Post condition |                           Customer has modified the selected review of related product model.                          |                                         |
|   **Step#**    |                                               **Actor: Customer**                                               |               **System**                |
|       1        |            Click on the 'Modify review' button of a product model for which a review has been added.           ||
|       2        |                                                                                                                 |    Prompt user to input new values for 'Modify review' operation.     |
|       3        |                         Input new values to modify review. Confirm.                                      |                                                        |
|       4        |                                                                                                              |     Check if review parameters are valid. Check NOT OK.                     |
|       5        |                                                                                                      | Show error message to Customer for wrong/missing review parameters.   |

### UC45, CHANGE LANGUAGE (USER)

|   Actors Involved    |                          User                           |
| :------------------: | :-----------------------------------------------------: |
| Informal description | User wants to change language of EzElectronics website. |
|     Precondition     |          Any page is loaded.                            |
|    Post condition    |    Language is changed. Same page is reloaded.     |
|   Nominal Scenario   |               Language is changed. (1.1)                |
|       Variants       |                                                         |
|      Exceptions      |             Error occurs: Language is not changed. (1.2)              |

#### UC45 SCENARIO 1.1

|  Scenario 1.1  |                        Language is changed.                         |                        |
| :------------: | :-----------------------------------------------------------------: | :--------------------: |
|  Precondition  |                      Any page is loaded.                      |                        |
| Post condition |         Language is changed. Same page is reloaded.          |                        |
|   **Step#**    |                           **Actor: User**                           |       **System**       |
|       1        | Click on button 'Change language' in top right corner.             |                        |
|       2        |                   Select new language from dropdown menu.            |                        |
|       3        |                                                                     |  Language is changed.  |
|       4        |                                                                     | Reload same page. |

#### UC45 SCENARIO 1.2

|  Scenario 1.2  |                      Language is not changed.                       |                                                              |
| :------------: | :-----------------------------------------------------------------: | :----------------------------------------------------------: |
|  Precondition  |                      Any page is loaded.                      |                                                              |
| Post condition |                      Language is not changed.                       |                                                              |
|   **Step#**    |                           **Actor: User**                           |                          **System**                          |
|       1        | Click on button 'Change language' in top right corner.             |                        |
|       2        |                   Select new language from dropdown menu.            |                        |
|       3        |                                                                     |          Error occurs while changing the language.           |
|       4        |                                                                     | Show error message to User for unsuccessful language change. |

### UC46, CHAT INTERACTION (CUSTOMER)

|   Actors Involved    |                            Customer                            |
| :------------------: | :------------------------------------------------------------: |
| Informal description |      Customer wants to chat with an operator (Call center service provider).       |
|     Precondition     |        Customer has an account. Customer is logged in.         |
|    Post condition    |       Customer successfully managed to send and receive messages via chat.       |
|   Nominal Scenario   |   Chat between Customer and operator successfully managed. (1.1) |
|       Variants       |                                                                |
|      Exceptions      |              Error occurs: Chat functionality not available. (1.2)              |

#### UC46 SCENARIO 1.1

|  Scenario 1.1  | Chat between Customer and operator successfully managed. |                                                                     |
| :------------: | :------------------------------------------------: | :-----------------------------------------------------------------: |
|  Precondition  |  Customer has an account. Customer is logged in.   |                                                                     |
| Post condition |  Customer successfully managed to send and receive messages via chat. |                                                                     |
|   **Step#**    |                **Actor: Customer**                 |                             **System**                              |
|       1        |        Click on the 'Chat' button in bottom right corner of any page.         |                                                                     |
|       2        |                                                    |  Open a popup window in the right hand side of the current page.   |
|       2        |                                                    |  Find an available operator. |
|       2        |                                                    |  Start the chat.                       |
|       3        |           Chat with operator.            |                                                                     |
|       3        |         Request to close the chat.          |                                                                     |
|       2        |                                                    |   Close the chat.                       |

#### UC46 SCENARIO 1.2

|  Scenario 1.2  |         Chat functionality not available.  |                                                                                                           |
| :------------: | :---------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. |                                                                                                           |
| Post condition |  Customer did not manage to send and receive messages via chat.   |                                                                                                           |
|   **Step#**    |               **Actor: Customer**               |                                                **System**                                                 |
|       1        |   Click on the 'Chat' button in bottom right corner of any page.   |                                                                       |
|       2        |                                                 |    Open a popup window in the right hand side of the current page.   |               |
|       2        |                                                 | Show error message that chat functionality is not available at the moment. |

### UC47, SWITCH TO LIGHT/DARK MODE (USER)

|   Actors Involved    |                              Customer                               |
| :------------------: | :-----------------------------------------------------------------: |
| Informal description | Customer wants to switch from light mode to dark mode or viceversa. |
|     Precondition     |                  Any page is loaded. One of the two modes is on.                               |
|    Post condition    |  Style mode is switched to the other mode.   |
|   Nominal Scenario   |               Style mode successfully switched. (1.1)               |
|       Variants       |                                                                     |
|      Exceptions      |               Error occurs: Style mode not switched.                |

#### UC47 SCENARIO 1.1

|  Scenario 1.1  |                                      Style mode successfully switched.                                      |                                         |
| :------------: | :---------------------------------------------------------------------------------------------------------: | :-------------------------------------: |
|  Precondition  |                       Any page is loaded. One of the two modes is on.                                       |                                         |
| Post condition |                     Style mode is switched to the other mode.                       |                                         |
|   **Step#**    |                                             **Actor: Customer**                                             |               **System**                |
|       1        | Click on 'Switch mode' button to switch to the other mode. |                                         |
|       2        |                                                                                                             | Switch the mode. |

#### UC47 SCENARIO 1.2

|  Scenario 1.2  |                                          Style mode not switched.                                           |                                                          |
| :------------: | :---------------------------------------------------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  |                     Any page is loaded. One of the two modes is on.                                         |                                                          |
| Post condition |                    Style mode is NOT switched to the other mode.                     |                                                          |
|   **Step#**    |                                             **Actor: Customer**                                             |                        **System**                        |
|       1        | Click on 'Switch mode' button to switch to the other mode. |                                                          |
|       2        |                                                                                                             | Show error message for failure to switch mode. |

### UC48, GUEST ACCESS (GUEST)

|   Actors Involved    |                          Guest user                           |
| :------------------: | :-----------------------------------------------------------: |
| Informal description | Guest user wants to make an order without having a Customer account. |
|     Precondition     |            Guest user does not have a Customer account.             |
|    Post condition    |     Guest user has made an order without a Customer account.     |
|   Nominal Scenario   |          An order is made successfully by Guest user. (1.1)          |
|       Variants       |                                                               |
|      Exceptions      |         Error occurs: Product is not added to cart. (1.2)           |
|      Exceptions      |         Error occurs: Cart is not checked out. (1.3)          |

#### UC48 SCENARIO 1.1

|  Scenario 1.1  |               An order is made successfully by Guest user.               |                                                                 |
| :------------: | :---------------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  |              Guest user does not have a Customer account.               |                                                                 |
| Post condition |          Guest user has made an order without a Customer account.             |                                                                 |
|   **Step#**    |                       **Actor: Guest user**                       |                           **System**                            |
|       1        | Access "Products" page.                                           |                                                                 |
|       2        |             Add product(s) to cart. (UC23)                        |                                                                 |
|       3        |       Finalize the cart by doing checkout. (UC28)                   |                                                                 |
|       4        |                                                                   | Show a confirmation message to Guest user for successful checkout. |

#### UC48 SCENARIO 1.2

|  Scenario 1.2  |      Product is not added to the Guest user's current cart.       |                                                                         |
| :------------: | :---------------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  |            Guest user does not have a Customer account.             |                                                                         |
| Post condition |         Guest user has NOT made an order without a Customer account.         |                                                                         |
|   **Step#**    |                       **Actor: Guest user**                       |                               **System**                                |
|       1        | Access "Products" page.                                           |                                          |
|       2        |            Add product(s) to cart. (UC23)                        |                                                                         |
|       3        |                                                                   | Error occurs while adding product(s) to the Guest user's current cart. |
|       4        |                                                                   |                    Show error message to Guest user. (UC23)            |

#### UC48 SCENARIO 1.3

|  Scenario 1.3  |           Guest user's current cart is not checked out.           |                                                                |
| :------------: | :---------------------------------------------------------------: | :------------------------------------------------------------: |
|  Precondition  |          Guest user does not have a Customer account.         |                                                                |
| Post condition |      Guest user has NOT made an order without a Customer account.       |                                                                |
|   **Step#**    |                       **Actor: Guest user**                       |                           **System**                           |
|       1        | Access "Products" page.                                                      |                                            |
|       2        |            Add product(s) to cart. (UC23)                          |                                                                |
|       3        |      Finalize the cart by doing checkout. (UC28)       |                                                                |
|       4        |                                                                   | Error occurs while checking out the Guest user's current cart. |
|       5        |                                                                   |               Show error message to Guest user. (UC28)               |

### UC49, COMPUTE STATISTICS (BUSINESS ADMIN)

|   Actors Involved    |                                               Business Admin                                               |
| :------------------: | :--------------------------------------------------------------------------------------------------------: |
| Informal description | Business Admin wants to retrieve statistics about EzElectronics database. |
|     Precondition     |          Business Admin has an account. Business Admin is logged in. "Monitor Statistics" page is loaded.          |
|    Post condition    |                               Business Admin retrieves statistics.                                |
|   Nominal Scenario   |                             Statistics are retrieved by business admin. (1.1)                             |
|       Variants       |                                                                                                            |
|      Exceptions      |                        Error occurs: Statistics are NOT retrieved.  (1.2)                         |

#### UC49 SCENARIO 1.1

|  Scenario 1.1  |                                          Statistics are retrieved by business admin.                                           |                                             |
| :------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------: |
|  Precondition  |                    Business Admin has an account. Business Admin is logged in. "Monitor Statistics" page is loaded.                     |                                             |
| Post condition |                                          Business Admin retrieves statistics.                                          |                                             |
|   **Step#**    |                                                    **Actor: Business Admin**                                                    |                 **System**                  |
|       1        | Business Admin selects statistics parameters. |                                             |
|       2        |                                                                                                                                 |        Compute statistics.         |
|       3        |                                                                                                                                 | Show statistics to Business Admin. |

#### UC49 SCENARIO 1.2

|  Scenario 1.2  |                                      Statistics are NOT retrieved.                                       |                                       |
| :------------: | :-------------------------------------------------------------------------: | :-----------------------------------------------------------: |
|  Precondition  |                    Business Admin has an account. Business Admin is logged in. "Monitor Statistics" page is loaded.                     |                                                     |
| Post condition |                                      Business Admin does NOT retrieve statistics.                                      |                                                           |
|   **Step#**    |                                                    **Actor: Business Admin**                                                    |                     **System**                     |
|       1        | Business Admin selects statistics parameters. |                                             |
|       2        |                                                                                                  |                 Error occurs while computing statistics.   |
|       3        |                                                                                                      | Show error message to Business Admin for unsuccessful statistics retrieval. |


# Glossary

![](/images/UML_Class_Diagram_V2.png)


- User - an entity registered on EzElectronics website. A user is characterized by username, name, surname, email, password, role and optionally by a default delivery address and default payment method.
- Role - an attribute characterizing each user. Possible values are: Customer, Manager, Business Admin.
- Customer - user with role Customer. A Customer can add/remove product items to/from their current cart, see the current cart content, delete the content of the current cart with all products inside, check out the current cart. A Customer can see their order history and see data of a selected past order. A Customer can add/remove product models to/from their wishlist and add a product model from the wishlist to the current cart. A Customer can add/remove reviews for a product model that they purchased. A Customer can modify their user account data and delete their user account. A Customer can set up and later modify a default delivery address and default payment details.
- Manager - user with role Manager. A Manager can add/remove product items to/from the Inventory database table. A Manager can add/modify/remove product models to/in/from the Catalogue. A Manager can add/modify/remove a discount per model/category.
- Business Admin - user with role Business Admin. A Business Admin can monitor statistics for EzElectronics KPIs by selecting a set of paramaters and specifying a time interval over which the statistics should be computed.
- Guest User - user interested in purchasing one or more products offered by EZElectronics without having an account.
- Tech admin - an actor interfacing the EZElectronics software through a terminal.
- Inventory - product items that are physically present in EzElectronics warehouse.
- Catalogue - product models that may be available in EzElectronics website at the moment or that were available in the past but not anymore or that will be available starting in the near future.
- Product arrival - a set of product items of a given product model that arrive in Inventory.
- Product item - a single entry in the Inventory, a specific instance of a product model. It is characterized by id, model, category, arrival date, selling date, sales status and selling price.
- Selling price - an attribute characterizing each product item. It is the final price with discounts, if any.
- Product model - a single entry in the Catalogue. It is characterized by id, category, price, details, available quantity, availability on the website, release date, brand, average rating of reviews and list of attached images.
- Category - an attribute characterizing each product model. Possible values are: Smartphone, Laptop, Appliance.
- Sales status - an attribute characterizing each product item. Each product item is characterized by a selling date and an order id: if not sold, selling date and order id are not specified, if sold, selling date and order id are specified.
- Available product item - a product item is available if the quantity of unsold items of the corresponding product model >= 1.
- Cart - an entity used as a container of products. A Cart is associated to a specific Customer. It is characterized by id, Customer username and list of product models.
- Current cart - a cart entity associated either to a logged in Customer or to a not logged in Guest user. It is the cart to/from which the Customer/Guest user can add/remove products and which can be checked out.
- Check out - the action of finalizing the current cart of a Customer by generating an order.
- Final price - the final total price of all of product items in the current cart with discounts, if any.
- Order - an entity which represents the checked out cart. An order is characterized by id, price, payment info, delivery info, status of order, tracking code and related cart info.
- Order history - a list of all past orders associated to a specific Customer.
- Track order - the action of opening a new page managed by the Shipping Company showing tracking info for an order.
- Tracking code - the unique code used to track a given order, generated by the Shipping Company and stored in the order.
- Delivery address - delivery data provided by the Customer at the time of checkout and used by the Shipping Company as a destination to which to ship the order.
- Payment card data - payment card data provided by the Customer at the time of checkout and used by the Payment Service Provider to manage the payment of the order.
- Review - an entity which represents an evaluation of a product model. A review is characterized by id, related product model, username of user who inserts the review, a mandatory rating and an optional comment.
- Rating of review - value that Customer assigns to a review: it is an integer value from 1 to 5.
- Chat - an external service provided by the Call Center Service Provider to provide support to a Customer by sending and receiving text messages.
- Filtering criteria - the options available to the User to filter product models: model, sales status, price, brand, average rating of reviews, discount.
- Sorting criteria - the options available to the User to sort product models: price, average rating of reviews, release date.
- Wishlist - an entity associated to Customer. A single instance of a wishlist is associated to each Customer account. It contains the product models that the Customer adds/removes. Check out of wishlist is not possible.
- Discount - an entity which representes a discount for a specific model or category. A discount is characterized by id, start date, end date, category, model, percentage value.
- Language - the language of all the elements of EzElectronics website. Possible values are: italian (IT) and english (EN).
- Light/Dark Mode - the style mode of all the elements of EzElectronics website. Possible values are: Light mode and Dark mode.
- Statistics: available statistics that the Businee Admin can request to be computed. Possible statistics are: sold quantity, unsold quantity, total income, etc. over a specified time period.
- Parameters - parameters provided by user:
  - Arrival parameters - parameters provided when a product arrival is registered to Inventory database table.
  - Catalogue parameters - parameters provided when a product model is added to Catalogue database table.
  - User parameters - parameters provided when an account is created.
  - Discount parameters - paramaters provided when a discount is added to Discount database table.
  - Review parameters - parameters provided when a review is added to Review database table.
  - Statistics parameters - set of filtering, sorting criteria and time interval values used to compute statistics.

# Deployment Diagram

![](/images/DeploymentDiagramV2.png)
