# Requirements Document - current EZElectronics

Date: 2024-05-05

Version: V1 - description of EZElectronics in CURRENT form (as received by teachers)

| Version number | Change                                                                               |      Date      |
| :------------: | :----------------------------------------------------------------------------------- | :------------: |
|      V1.0      | stakeholders, context diag, ifaces (todo)                                            |   2024-04-14   |
|      V1.1      | stakeholders, context diag                                                           |   2024-04-16   |
|      V1.2      | interfaces, FRs, Glossary (a bit)                                                    |   2024-04-18   |
|      V1.3      | FRs, NFRs, GUI                                                                       |   2024-04-20   |
|      V1.4      | Use cases                                                                            |   2024-04-22   |
|      V1.5      | Use cases pt.2                                                                       |   2024-04-23   |
|      V1.6      | GUI, Deployment Diag., Use cases pt.3, scenarios of UC 1-4                           |   2024-04-24   |
|      V1.7      | GUI, Use cases pt.4, scenarios of UC 5-6, 9-11, UML class diag, Stories and personas |   2024-04-25   |
|      V1.8      | GUI, Use cases, scenarios of UCs, Personas, EstimationV1                             |   2024-04-26   |
|      V1.9      | fixed some typos, added UML class diag, NFRs update                                  |   2024-04-28   |
|     V1.10      | fixed some typos                                                                     |   2024-04-29   |
|     V1.11      | UCs - Scenarios fixed, GLossary                                                      |   2024-04-30   |
|     V1.12      | Ucs names fixed                                                                      |   2024-05-01   |
|     V1.13      | FRs fixed, reoredered, UCs reordered                                                 |   2024-05-02   |
|     V1.14      | UCD foxed                                                                            |   2024-05-04   |
|     V1.15      | Content for UCs and Scenarios added                                                  | 2024-05-04 (2) |
|     V1.16      | Some typos fixed                                                                     | 2024-05-04_05  |
|     V1.16      | Stories fixed, terminology fixed, UC filter prods, sort prods fixed                  | 2024-05-04_05 (2)  |


# Contents

- [Requirements Document - current EZElectronics](#requirements-document---current-ezelectronics)
- [Contents](#contents)
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
    - [Use case 1, UC1](#uc1-register-product-arrival-manager)
      - [Scenario 1.1](#uc1-scenario-11)
      - [Scenario 1.2](#uc1-scenario-12)
      - [Scenario 1.3](#uc1-scenario-13)
    - [Use case 2, UC2](#uc2-delete-product-manager)
      - [Scenario 1.1](#uc2-scenario-11)
      - [Scenario 1.2](#uc2-scenario-12)
    - [Use case 3, UC3](#uc3-retrieve-single-product-data-customer)
      - [Scenario 1.1](#uc3-scenario-11)
      - [Scenario 1.2](#uc3-scenario-12)
    - [Use case 4, UC4](#uc4-filter-products-by-category-model-andor-sales-status-user)
      - [Scenario 1.1](#uc4-scenario-11)
      - [Scenario 1.2](#uc4-scenario-12)
    - [Use case 5, UC5](#uc5-create-user-account-user)
      - [Scenario 1.1](#uc5-scenario-11)
      - [Scenario 1.2](#uc5-scenario-12)
      - [Scenario 1.3](#uc5-scenario-13)
    - [Use case 6, UC6](#uc6-delete-user-user)
      - [Scenario 1.1](#uc6-scenario-11)
      - [Scenario 1.2](#uc6-scenario-12)
    - [Use case 7, UC7](#uc7-login-user)
      - [Scenario 1.1](#uc7-scenario-11)
      - [Scenario 1.2](#uc7-scenario-12)
    - [Use case 8, UC8](#uc8-logout-user)
      - [Scenario 1.1](#uc8-scenario-11)
      - [Scenario 1.2](#uc8-scenario-12)
    - [Use case 9, UC9](#uc9-get-user-data-by-username-user)
      - [Scenario 1.1](#uc9-scenario-11)
      - [Scenario 1.2](#uc9-scenario-12)
    - [Use case 10, UC10](#uc10-get-users-data-by-role--user)
      - [Scenario 1.1](#uc10-scenario-11)
      - [Scenario 1.2](#uc10-scenario-12)
    - [Use case 11, UC11](#uc11-add-product-to-current-cart-customer)
      - [Scenario 1.1](#uc11-scenario-11)
      - [Scenario 1.2](#uc11-scenario-12)
      - [Scenario 1.3](#uc11-scenario-13)
      - [Scenario 1.4](#uc11-scenario-14)
      - [Scenario 1.5](#uc11-scenario-15)
    - [Use case 12, UC12](#uc12-see-current-cart-customer)
      - [Scenario 1.1](#uc12-scenario-11)
    - [Use case 13, UC13](#uc13-remove-product-from-current-cart-customer)
      - [Scenario 1.1](#uc13-scenario-11)
      - [Scenario 1.2](#uc13-scenario-12)
      - [Scenario 1.3](#uc13-scenario-13)
      - [Scenario 1.4](#uc13-scenario-14)
      - [Scenario 1.5](#uc13-scenario-15)
    - [Use case 14, UC14](#uc14-see-cart-history-customer)
      - [Scenario 1.1](#uc14-scenario-11)
    - [Use case 15, UC15](#uc15-delete-current-cart-customer)
      - [Scenario 1.1](#uc15-scenario-11)
      - [Scenario 1.2](#uc15-scenario-12)
    - [Use case 16, UC16](#uc16-do-checkout-of-current-cart-customer)
      - [Scenario 1.1](#uc16-scenario-11)
      - [Scenario 1.2](#uc16-scenario-12)
      - [Scenario 1.3](#uc16-scenario-13)
      - [Scenario 1.4](#uc16-scenario-14)
      - [Scenario 1.5](#uc16-scenario-15)
- [Glossary](#glossary)
- [Deployment Diagram](#deployment-diagram)

# Informal description

EZElectronics (read EaSy Electronics) is a software application designed to help managers of electronics stores to manage their products and offer them to customers through a dedicated website. Managers can assess the available products, record new ones, and confirm purchases. Customers can see available products, add them to a cart and see the history of their past purchases.

# Stakeholders

| Stakeholder name | Description                                                                |
| :--------------- | :------------------------------------------------------------------------- |
| Customers        | Users interested in buying products offered by EZElectronics.              |
| Tech Admin       | Those responsible for maintaining the application.                         |
| Managers         | Those directly responsible for managing the products, inventory and sales. |
| SW Dev Company   | Those responsible for developing the application.                          |

# Context Diagram and Interfaces

## Context Diagram

![](/images/Context_Diagram_V1.png)

## Interfaces

| Actor          | Logical Interface | Physical Interface |
| :------------- | :---------------- | :----------------- |
| Customers      | Browser (GUI)     | PC + internet      |
| Managers       | Browser (GUI)     | PC + internet      |
| Tech Admins    | Terminal          | PC + intranet      |
| SW Dev Company | Browser(GUI)+IDE  | PC + internet      |

# Stories and personas

### STORY 1: Customer buys products

A Customer may access EzElectronics website to buy some products. Once the EzElectronics webpage is accessed, the Customer is redirected to a dedicated page for login/signup. The Customer must have an account (with 'Customer' role) in order to login on the website and browse products. To login, the Customer must enter their login credentials: username and password. If the Customer does not have an account, they must create an account. To create an account, the Customer must fill in the mandatory fields name, surname, email, username, password and select role = 'Customer'. Once the Customer logs in with their personal account on the website, they are able to see and add products to their cart from the categories smartphones, laptops, appliances. Moreover, the Customer may filter by category and/or model the products available on the website. To see more detailed information about a speicific product, the Customer may select a product, then they will be redirected to a dedicated page with the product details. After adding one or more products to the cart, the Customer may remove one product at a time from the cart or may delete content of the cart. Furthermore, the Customer may see the content of their cart and the history of checked out carts. The Customer may finalize the current cart by doing checkout. The Customer may log out from their account at any time instant. In the 'User' page, the Customer may see their credentials or delete their account.

### STORY 2: Manager registers products

A Manager may register the arrival of a quantity of products to the database of EzElectronics website. The Manager must have an account in order to login on the website. A Manager already has an account (with 'Manager' role) provided. To login, the Manager must enter their login credentials: username and password. Once the Manager logs into the website, a dedicated page is loaded where the Manager is able to see the available products in the EzElectronics database, to register the arrival of new products into the EzElectronics database and to remove product(s) from the EzElectronics database. Products may be filtered by category, model, sales status (only sold, only unsold, or all products). The Manager may log out from their account at any time instant. In the 'User' page, the Manager can see their credentials or delete their account.

# Functional and non functional requirements

## Functional Requirements

| ID      | Description                                                               |
| :------ | :------------------------------------------------------------------------ |
| FR1     | Manage products                                                           |
| FR1.1   | Register product arrival in database                                      |
| FR1.2   | Delete product from database                                              |
| FR1.3   | Retrieve single product data                                              |
| FR1.4   | Retrieve multiple product info                                            |
| FR1.4.1 | Retrieve by category                                                      |
| FR1.4.2 | Retrieve by model                                                         |
| FR1.4.3 | Retrieve by sales status                                                  |
|         |                                                                           |
| FR2     | Manage user accounts                                                      |
| FR2.1   | Create user account                                                       |
| FR2.2   | Delete user account                                                       |
| FR2.3   | Authentication of user account (login, logout)                            |
| FR2.4   | Retrieve user(s) account info                                             |
| FR2.4.1 | Retrieve single user account info                                         |
| FR2.4.2 | Retrieve multiple users account info - of all users, of all users by role |
|         |                                                                           |
| FR3     | Manage carts                                                              |
| FR3.1   | Create cart                                                               |
| FR3.2   | Add product(s) to current cart                                            |
| FR3.3   | See product(s) in current cart                                            |
| FR3.4   | Remove product(s) from current cart                                       |
| FR3.5   | See cart history                                                          |
| FR3.6   | Delete current cart                                                       |
| FR3.7   | Check out current cart                                                    |
| FR3.7.1 | Mark product as sold                                                      |
|         |                                                                           |

## Non Functional Requirements

| ID     | Type                               | Description                                                                                                            | Refers to     |
| :----- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------ |
| NFR1   | Reliability / Availability         |                                                                                                                        | FR1, FR2, FR3 |
| NFR1.1 | Uptime                             | Website should be up and working 99.9% of the time                                                                     | FR1, FR2, FR3 |
| NFR1.2 | Data backups                       | Regular backups to prevent data loss                                                                                   | FR1, FR2, FR3 |
|        |                                    |                                                                                                                        |               |
| NFR2   | Security                           |                                                                                                                        | FR4           |
| NFR2.1 | Password encryption                | User passwords should be encrypted and stored securely                                                                 | FR2.1         |
| NFR2.2 | Access to authenticated users only | A user has access to all functionalities after being authenticated                                                     | FR2.3         |
|        |                                    |                                                                                                                        |               |
| NFR3   | Usability                          |                                                                                                                        | FR1, FR2, FR3 |
| NFR3.1 | GUI                                | User-friendly and intuitive interface                                                                                  | FR1, FR2, FR3 |
| NFR3.2 | Functionalities                    | Existence of functions needed by user                                                                                  | FR1, FR2, FR3 |
|        |                                    |                                                                                                                        |               |
| NFR4   | Performance                        |                                                                                                                        | FR1, FR2, FR3 |
| NFR4.1 | Simultaneous User Activity         | Server should support a minimum of 1000 users without degradation                                                      | FR1, FR2, FR3 |
|        |                                    |                                                                                                                        |               |
| NFR5   | Efficiency                         |                                                                                                                        | FR1, FR2, FR3 |
| NFR5.1 | Response time                      | Response time per user function should be lower than 1s                                                                | FR1, FR2, FR3 |
|        |                                    |                                                                                                                        | FR1, FR2, FR3 |
| NFR6   | Compatibility                      | Functionalities offered by website are available in different Browser versions                                         | FR1, FR2      |
|        |                                    |                                                                                                                        |               |
| NFR7   | Maintainability                    | Code and files should be well structured and formatted to facilitate maintenance operations, deployment and versioning | All FRs       |
|        |                                    |

# Use case diagram and use cases

## Use case diagram

![](/images/UCD_V1.png)

### UC1, REGISTER PRODUCT ARRIVAL (MANAGER)

|   Actors Involved    |                                     Manager                                      |
| :------------------: | :------------------------------------------------------------------------------: |
| Informal description |    Manager wants to register product arrivals on the EzElectronics database.     |
|     Precondition     |                              Manager is logged in.                               |
|    Post condition    |          A product arrival is registered in the EzElectronics database.          |
|   Nominal Scenario   |       Manager registers a product arrival to EzElectronics database. (1.1)       |
|       Variants       |                                                                                  |
|      Exceptions      |               Error occurs: Arrival date after current date. (1.2)               |
|      Exceptions      | Error occurs (409): Product code already exists in EzElectronics database. (1.3) |

#### UC1 SCENARIO 1.1

|  Scenario 1.1  |                    Manager registers a product arrival to the EzElectronics database                     |                                                                          |
| :------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|  Precondition  |                                          Manager is logged in.                                           |                                                                          |
| Post condition |                      A product arrival is registered in the EzElectronics database.                      |                                                                          |
|   **Step#**    |                                            **Actor: Manager**                                            |                                **System**                                |
|       1        | On the "Manager Home Page", insert all necessary parameters to register the arrival of a new product. |                                                                          |
|       2        |                                                                                                          |        Do check if current date is after arrival date. Check OK.         |
|       3        |                                                                                                          |           Register product arrival in EzElectronics database.            |
|       4        |                                                                                                          | Show confirmation of product arrival registered successfully to Manager. |

#### UC1 SCENARIO 1.2

|  Scenario 1.2  |                                     Arrival date after current date.                                     |                                                                    |
| :------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------: |
|  Precondition  |                                          Manager is logged in.                                           |                                                                    |
| Post condition |                      A product arrival is registered in the EzElectronics database.                      |                                                                    |
|   **Step#**    |                                            **Actor: Manager**                                            |                             **System**                             |
|       1        | On the "Manager Home Page", insert all necessary parameters to register the arrival of a new product. |                                                                    |
|       2        |                                                                                                          |   Do check if current date is after arrival date. Check NOT OK.    |
|       3        |                                                                                                          | Show error message to Manager for arrival date after current date. |

#### UC1 SCENARIO 1.3

|  Scenario 1.3  |                          Product code already exists in EzElectronics database.                          |                                                                                           |
| :------------: | :------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
|  Precondition  |                                          Manager is logged in.                                           |                                                                                           |
| Post condition |                 A product is NOT successfully registered in the EzElectronics database.                  |                                                                                           |
|   **Step#**    |                                            **Actor: Manager**                                            |                                        **System**                                         |
|       1        | On the "Manager Home Page", insert all necessary parameters to register the arrival of a new product. |                                                                                           |
|       2        |                                                                                                          |                     Check if product parameters are valid. Check ok.                      |
|       3        |                                                                                                          |       Check if product already registered to EzElectronics database. Check NOT OK.        |
|       4        |                                                                                                          | Show error message to Manager about product already registered to EzElectronics database. |

### UC2, DELETE PRODUCT (MANAGER)

|   Actors Involved    |                             Manager                             |
| :------------------: | :-------------------------------------------------------------: |
| Informal description | Manager deletes a specific product from EzElectronics database. |
|     Precondition     |                      Manager is logged in.                      |
|    Post condition    |   A specific product is deleted from EzElectronics database.    |
|   Nominal Scenario   |  Manager deletes product from the EzElectronic database. (1.1)  |
|       Variants       |                                                                 |
|      Exceptions      |        Error occurs (404): Product does not exist. (1.2)        |

#### UC2 SCENARIO 1.1

|  Scenario 1.1  |      Manager deletes product from the EzElectronic website.      |                                                             |
| :------------: | :--------------------------------------------------------------: | :---------------------------------------------------------: |
|  Precondition  |                      Manager is logged in.                       |                                                             |
| Post condition |  A product is successfully deleted from EzElectronics website.   |                                                             |
|   **Step#**    |                        **Actor: Manager**                        |                         **System**                          |
|       1        | On the "Manager Home Page", input product code to be deleted. |                                                             |
|       2        |                                                                  | Check if product exists in EzElectronics website. Check OK. |
|       3        |                                                                  |           Delete specified product from database.           |
|       4        |                                                                  |    Show confirmation of successfull deletion of product.    |

#### UC2 SCENARIO 1.2

|  Scenario 1.2  |                     Product does not exist.                      |                                                                 |
| :------------: | :--------------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  |                      Manager is logged in.                       |                                                                 |
| Post condition |       A product is NOT deleted from EzElectronics website.       |                                                                 |
|   **Step#**    |                        **Actor: Manager**                        |                           **System**                            |
|       1        | On the "Manager Home Page", input product code to be deleted. |                                                                 |
|       2        |                                                                  | Check if product exists in EzElectronics website. Check NOT OK. |
|       3        |                                                                  |    Show error message to Manager about not existing product.    |

### UC3, RETRIEVE SINGLE PRODUCT DATA (CUSTOMER)

|   Actors Involved    |                                 Customer                                  |
| :------------------: | :-----------------------------------------------------------------------: |
| Informal description |        Customer wants to retrieve product data by clicking on it.         |
|     Precondition     | Customer has an account. Customer is logged in. "Product" page is loaded. |
|    Post condition    |                     Customer retrieves product data.                      |
|   Nominal Scenario   |                  Customer retrieves product data. (1.1)                   |
|       Variants       |                                                                           |
|      Exceptions      |         Error occurs (404): Target product does not exist. (1.2)          |

#### UC3 SCENARIO 1.1

|  Scenario 1.1  |                     Customer retrieves product data.                      |                                |
| :------------: | :-----------------------------------------------------------------------: | :----------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. "Product" page is loaded. |                                |
| Post condition |                     Customer retrieves product data.                      |                                |
|   **Step#**    |                            **Actor: Customer**                            |           **System**           |
|       1        |              Customer clicks on one of the 'Product' items.               |                                |
|       2        |                                                                           |     Retrieve product data.     |
|       3        |                                                                           | Load "Detailed product" page.  |
|       4        |                                                                           | Show product data to Customer. |

#### UC3 SCENARIO 1.2

|  Scenario 1.2  |                      Target product does not exist.                       |                                                                         |
| :------------: | :-----------------------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  | Customer has an account. Customer is logged in. "Product" page is loaded. |                                                                         |
| Post condition |                 Customer does not retrieve product data.                  |                                                                         |
|   **Step#**    |                            **Actor: Customer**                            |                               **System**                                |
|       1        |              Customer clicks on one of the 'Product' items.               |                                                                         |
|       2        |                                                                           |             Error occurs while retrieving of product data.              |
|       3        |                                                                           | Show error message to Customer for unsuccessful product data retrieval. |

### UC4, FILTER PRODUCTS BY CATEGORY, MODEL AND/OR SALES STATUS (USER)

|   Actors Involved    |                                                                                         User                                                                                         |
| :------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Informal description | User filters products by category, model and/or sales status. User can choose to visualize all products with sales status = sold or all products with sales status = unsold or both. |
|     Precondition     |                                User is logged in. "Product" page is loaded if User is Customer. "Manager Home Page" is loaded if User is Manager.                                 |
|    Post condition    |                                                            Products are filtered by category, model and/or sales status.                                                             |
|   Nominal Scenario   |                                                             Products are filtered according filtering conditions. (1.1)                                                              |
|       Variants       |                                                                                                                                                                                      |
|      Exceptions      |                                                                           Products are not filtered. (1.2)                                                                           |

#### UC4 SCENARIO 1.1

|  Scenario 1.1  |                                 User filters products according filtering conditions.                                 |                                      |
| :------------: | :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------: |
|  Precondition  | User is logged in. "Product" page is loaded if User is Customer. "Manager Home Page" is loaded if User is Manager. |                                      |
| Post condition |                                 Products are filtered according filtering conditions.                                 |                                      |
|   **Step#**    |                                                    **Actor: User**                                                    |              **System**              |
|       1        |                           User selects filtering conditions (category, model, sales status)                           |                                      |
|       2        |                                                                                                                       |   Retrieve all filtered products.    |
|       3        |                                                                                                                       | Show filtered products list to User. |

#### UC4 SCENARIO 1.2

|  Scenario 1.2  |                                            User does not filter products.                                             |                                               |
| :------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------: |
|  Precondition  | User is logged in. "Product" page is loaded if User is Customer. "Manager Home Page" is loaded if User is Manager. |                                               |
| Post condition |                                              Products are not filtered.                                               |                                               |
|   **Step#**    |                                                    **Actor: User**                                                    |                  **System**                   |
|       1        |                           User selects filtering conditions (category, model, sales status)                           |                                               |
|       2        |                                                                                                                       | Error occurs while filtering of the products. |
|       3        |                                                                                                                       | Filtered products list is NOT shown to User.  |

### UC5, CREATE USER ACCOUNT (USER)

|   Actors Involved    |                             User                             |
| :------------------: | :----------------------------------------------------------: |
| Informal description | User wants to create a new account on EzElectronics website. |
|     Precondition     |                 User is not yet registered.                  |
|    Post condition    |       User is registered and has a new accont created.       |
|   Nominal Scenario   |           New account successfully created. (1.1)            |
|       Variants       |                                                              |
|      Exceptions      |      Error occurs (409): Username already exists. (1.2)      |
|      Exceptions      |        Error occurs: Wrong/Missing parameters. (1.3)         |

#### UC5 SCENARIO 1.1

|  Scenario 1.1  |               Account creation successful               |                                                                      |
| :------------: | :-----------------------------------------------------: | :------------------------------------------------------------------: |
|  Precondition  |             User does not have an account.              |                                                                      |
| Post condition |        User has created an account successfully.        |                                                                      |
|   **Step#**    |                     **Actor: User**                     |                              **System**                              |
|       1        |  User accesses EzElectronics website ("Login/Sign up page").  |                                                                      |
|       2        | User inserts requested parameters for account creation. |                                                                      |
|       3        |                                                         |              Check if username is available. Check ok.               |
|       4        |                                                         |      Check if all other account parameters are valid. Check ok.      |
|       5        |                                                         |                   Register User in user database.                    |
|       6        |                                                         | Show a confirmation message to User for successful account creation. |
|       7        |                                                         |                         Load "Product" page.                         |

#### UC5 SCENARIO 1.2

|  Scenario 1.2  |                Username already exists.                 |                                                                                    |
| :------------: | :-----------------------------------------------------: | :--------------------------------------------------------------------------------: |
|  Precondition  |             User does not have an account.              |                                                                                    |
| Post condition |            User has NOT created an account.             |                                                                                    |
|   **Step#**    |                     **Actor: User**                     |                                     **System**                                     |
|       1        |  User accesses EzElectronics website ("Login/Sign up page").  |                                                                                    |
|       2        | User inserts requested parameters for account creation. |                                                                                    |
|       3        |                                                         |                   Check if username is available. Check NOT ok.                    |
|       4        |                                                         | Show error message to User specifying that the provided username is not available. |
|       5        |                                                         |                        Ask for account creation data again.                        |

#### UC5 SCENARIO 1.3

|  Scenario 1.3  |            Wrong/Missing account parameters.            |                                                                                        |
| :------------: | :-----------------------------------------------------: | :------------------------------------------------------------------------------------: |
|  Precondition  |             User does not have an account.              |                                                                                        |
| Post condition |            User has NOT created an account.             |                                                                                        |
|   **Step#**    |                     **Actor: User**                     |                                       **System**                                       |
|       1        |  User accesses EzElectronics website ("Login/Sign up page").  |                                                                                        |
|       2        | User inserts requested parameters for account creation. |                                                                                        |
|       3        |                                                         |                       Check if username is available. Check ok.                        |
|       4        |                                                         |             Check if all other account parameters are valid. Check NOT ok.             |
|       5        |                                                         | Show error message to User specifying that there are wrong/missing account parameters. |
|       6        |                                                         |                          Ask for account creation data again.                          |

### UC6, DELETE USER (USER)

|   Actors Involved    |                              User                              |
| :------------------: | :------------------------------------------------------------: |
| Informal description |    User deletes proper user account specified by username.     |
|     Precondition     | User has an account. User is logged in. "User" page is loaded. |
|    Post condition    |               Specified user account is deleted.               |
|   Nominal Scenario   |            Specified user account is deleted. (1.1)            |
|       Variants       |                                                                |
|      Exceptions      |     Error occurs (404): Target user does not exist. (1.2)      |

#### UC6 SCENARIO 1.1

|  Scenario 1.1  |       User deletes their own account.       |                                               |
| :------------: | :-----------------------------------------: | :-------------------------------------------: |
|  Precondition  |  User is logged in. "User" page is loaded.  |                                               |
| Post condition |     Specified user account is deleted.      |                                               |
|   **Step#**    |               **Actor: User**               |                  **System**                   |
|       1        | User clicks on the 'Delete account' button. |                                               |
|       2        |                                             |  Delete the user account from user database.  |
|       3        |                                             |          Show confirmation to User.           |
|       4        |                                             | Load "Login/Sign up Page" of EzElectronics website. |

#### UC6 SCENARIO 1.2

|  Scenario 1.2  |         Target user does not exist.         |                                                                  |
| :------------: | :-----------------------------------------: | :--------------------------------------------------------------: |
|  Precondition  |  User is logged in. "User" page is loaded.  |                                                                  |
| Post condition |     Specified user account is deleted.      |                                                                  |
|   **Step#**    |               **Actor: User**               |                            **System**                            |
|       1        | User clicks on the 'Delete account' button. |                                                                  |
|       2        |                                             | Error occurs while deleting the user account from user database. |
|       3        |                                             |      Show error message to User for unsuccessful deletion.       |

### UC7, LOGIN (USER)

|   Actors Involved    |                                      User                                      |
| :------------------: | :----------------------------------------------------------------------------: |
| Informal description |                          User logs in their account.                           |
|     Precondition     |                User has an account. User is not logged in yet.                 |
|    Post condition    |                               User is logged in.                               |
|   Nominal Scenario   |                             Login successful (1.1)                             |
|       Variants       |                                                                                |
|      Exceptions      | Error occurs (404): User not found or wrong password (wrong credentials) (1.2) |

#### UC7 SCENARIO 1.1

|  Scenario 1.1  |                   Login successful                    |                                           |
| :------------: | :---------------------------------------------------: | :---------------------------------------: |
|  Precondition  |              User must have an account.               |                                           |
| Post condition |                  User is logged in.                   |                                           |
|   **Step#**    |         **Actor: User (Customer or Manager)**         |                **System**                 |
|       1        | User accesses EzElectronics website ("Login/Sign up page"). |                                           |
|       2        |            User inserts login credentials.            |                                           |
|       3        |                                                       | Look for username and password. Match ok. |
|       4        |                  User is logged in.                   |                                           |

#### UC7 SCENARIO 1.2

|  Scenario 1.2  |       Login not successfull, wrong credentials        |                                               |
| :------------: | :---------------------------------------------------: | :-------------------------------------------: |
|  Precondition  |              User must have an account.               |                                               |
| Post condition |                User is not logged in.                 |                                               |
|   **Step#**    |         **Actor: User (Customer or Manager)**         |                  **System**                   |
|       1        | User accesses EzElectronics website ("Login/Sign up page"). |                                               |
|       2        |            User inserts login credentials.            |                                               |
|       3        |                                                       | Look for username and password. Match NOT ok. |
|       4        |                                                       |          Ask for credentials again.           |

### UC8, LOGOUT (USER)

|   Actors Involved    |                                User                                |
| :------------------: | :----------------------------------------------------------------: |
| Informal description | User wants to log out from their account on EzElectronics website. |
|     Precondition     |              User has an account. User is logged in.               |
|    Post condition    |           User is logged out. "Login/Sign up page" is loaded.            |
|   Nominal Scenario   |                      Logout successful. (1.1)                      |
|       Variants       |                                                                    |
|      Exceptions      |                    Logout not successful (1.2)                     |

#### UC8 SCENARIO 1.1

|  Scenario 1.1  |                           Logout successful                            |                         |
| :------------: | :--------------------------------------------------------------------: | :---------------------: |
|  Precondition  |             User must have an account. User is logged in.              |                         |
| Post condition |             User is logged out. "Login/Sign up page" is loaded.              |                         |
|   **Step#**    |                 **Actor: User (Customer or Manager)**                  |       **System**        |
|       1        | User clicks on the 'Logout' button up in the right corner on any page. |                         |
|       2        |                                                                        | Do logout of that user. |
|       3        |                          User is logged out.                           |                         |
|       4        |                                                                        |  Load "Login/Sign up page".   |

#### UC8 SCENARIO 1.2

|  Scenario 1.2  |                         Logout not successfull                         |                                                     |
| :------------: | :--------------------------------------------------------------------: | :-------------------------------------------------: |
|  Precondition  |             User must have an account. User is logged in.              |                                                     |
| Post condition |                        User is not logged out.                         |                                                     |
|   **Step#**    |                 **Actor: User (Customer or Manager)**                  |                     **System**                      |
|       1        | User clicks on the 'Logout' button up in the right corner on any page. |                                                     |
|       2        |                                                                        |  Error occurs while doing the logout of the user.   |
|       3        |                                                                        | Show error message to User for unsuccessful logout. |
|       4        |                        User is NOT logged out.                         |                                                     |

### UC9, GET USER DATA BY USERNAME (USER)

|   Actors Involved    |                         User                          |
| :------------------: | :---------------------------------------------------: |
| Informal description |       User wants to retrieve proper user data.        |
|     Precondition     |        User has an account. User is logged in.        |
|    Post condition    |               User retrieves user data.               |
|   Nominal Scenario   |            User retrieves user data. (1.1)            |
|       Variants       |                                                       |
|      Exceptions      | Error occurs (404): Target user does not exist. (1.2) |

#### UC9 SCENARIO 1.1

|  Scenario 1.1  |                     User retrieves user data.                     |                         |
| :------------: | :---------------------------------------------------------------: | :---------------------: |
|  Precondition  |              User has an account. User is logged in.              |                         |
| Post condition |                     User retrieves user data.                     |                         |
|   **Step#**    |                          **Actor: User**                          |       **System**        |
|       1        | User clicks on the 'User' button in top right corner of any page. |                         |
|       2        |                                                                   |   Retrieve user data.   |
|       3        |                                                                   |    Load "User" page.    |
|       4        |                                                                   | Show user data to User. |

#### UC9 SCENARIO 1.2

|  Scenario 1.2  |                    Target user does not exist.                    |                                          |
| :------------: | :---------------------------------------------------------------: | :--------------------------------------: |
|  Precondition  |              User has an account. User is logged in.              |                                          |
| Post condition |                 User does not retrieve user data.                 |                                          |
|   **Step#**    |                          **Actor: User**                          |                **System**                |
|       1        | User clicks on the 'User' button in top right corner of any page. |                                          |
|       2        |                                                                   | Error occurs while retrieving user data. |
|       3        |                                                                   |       Show error message to User.        |

### UC10, GET USERS DATA BY ROLE (USER)

|   Actors Involved    |                                         User                                         |
| :------------------: | :----------------------------------------------------------------------------------: |
| Informal description |          User retrieves all user accounts in database by providing a role.           |
|     Precondition     | User accesses database of user accounts. Manager has permission to query the system. |
|    Post condition    |                           User accounts retrieved by role.                           |
|   Nominal Scenario   |                     Query database for all user accounts by role                     |
|       Variants       |                                                                                      |
|      Exceptions      |                    Error occurs (404): Target user does not exist                    |

#### UC10 SCENARIO 1.1

|  Scenario 1.1  |               Query database for all user accounts by role               |                     |
| :------------: | :----------------------------------------------------------------------: | :-----------------: |
|  Precondition  |                   User logs in by means of a terminal.                   |                     |
| Post condition |                    User retrieves user data by role.                     |                     |
|   **Step#**    |                       **Actor: User (tech admin)**                       |     **System**      |
|       1        | User runs a command providing necessary parameters specifying user role. |                     |
|       2        |                                                                          | Retrieve user data. |
|       3        |                                                                          | Show data to User.  |

#### UC10 SCENARIO 1.2

|  Scenario 1.2  |                       Target user does not exist.                        |                                          |
| :------------: | :----------------------------------------------------------------------: | :--------------------------------------: |
|  Precondition  |                   User logs in by means of a terminal.                   |                                          |
| Post condition |                    User does not retrieve user data.                     |                                          |
|   **Step#**    |                             **Actor: User**                              |                **System**                |
|       1        | User runs a command providing necessary parameters specifying user role. |                                          |
|       2        |                                                                          | Error occurs while retrieving user data. |
|       3        |                                                                          |       Show error message to User.        |

### UC11, ADD PRODUCT TO CURRENT CART (CUSTOMER)

|   Actors Involved    |                              Customer                              |
| :------------------: | :----------------------------------------------------------------: |
| Informal description |             Customer wants to add product to the cart.             |
|     Precondition     |          Customer is logged in. "Product" page is loaded.          |
|    Post condition    |               Selected product is added to the cart.               |
|   Nominal Scenario   |       Customer adds successfully product to the cart. (1.1)        |
|       Variants       |         Customer adds product without having a cart. (1.2)         |
|      Exceptions      |         Error occurs (404): Product does not exist. (1.3)          |
|      Exceptions      |          Error occurs (409): Product already sold. (1.4)           |
|      Exceptions      | Error occurs (409): Product already present in current cart. (1.5) |

#### UC11 SCENARIO 1.1

|  Scenario 1.1  |        Customer adds successfully product to the cart.        |                                                                       |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Product" page is loaded. Cart exists. |                                                                       |
| Post condition |            Selected product is added to the cart.             |                                                                       |
|   **Step#**    |                      **Actor: Customer**                      |                              **System**                               |
|       1        |   Customer clicks on the 'Add to cart' button of a product.   |                                                                       |
|       2        |                                                               |                    Check if cart exists. Check ok.                    |
|       3        |                                                               |                  Check if product exists. Check ok.                   |
|       4        |                                                               |              Check if product is not yet sold. Check ok.              |
|       5        |                                                               |          Check if product is not yet in the cart. Check ok.           |
|       6        |                                                               |                       Add product to the cart.                        |
|       7        |                                                               | Show confirmation to Customer for product added successfully to cart. |

#### UC11 SCENARIO 1.2

|  Scenario 1.2  |             Customer adds product without having a cart.              |                                                                       |
| :------------: | :-------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Product" page is loaded. Cart does not exist. |                                                                       |
| Post condition |                Selected product is added to the cart.                 |                                                                       |
|   **Step#**    |                          **Actor: Customer**                          |                              **System**                               |
|       1        |       Customer clicks on the 'Add to cart' button of a product.       |                                                                       |
|       2        |                                                                       |                  Check if cart exists. Check NOT ok.                  |
|       3        |                                                                       |           Create a cart object associated to the Customer.            |
|       4        |                                                                       |                  Check if product exists. Check ok.                   |
|       5        |                                                                       |              Check if product is not yet sold. Check ok.              |
|       6        |                                                                       |                       Add product to the cart.                        |
|       7        |                                                                       | Show confirmation to Customer for product added successfully to cart. |

#### UC11 SCENARIO 1.3

|  Scenario 1.3  |                    Product does not exist.                    |                                                                 |
| :------------: | :-----------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Product" page is loaded. Cart exists. |                                                                 |
| Post condition |               Product is not added to the cart.               |                                                                 |
|   **Step#**    |                      **Actor: Customer**                      |                           **System**                            |
|       1        |   Customer clicks on the 'Add to cart' button of a product.   |                                                                 |
|       2        |                                                               |                 Check if cart exists. Check ok.                 |
|       3        |                                                               |             Check if product exists. Check NOT ok.              |
|       4        |                                                               | Show error message to Customer for product that does not exist. |

#### UC11 SCENARIO 1.4

|  Scenario 1.4  |                     Product already sold.                     |                                                                  |
| :------------: | :-----------------------------------------------------------: | :--------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Product" page is loaded. Cart exists. |                                                                  |
| Post condition |               Product is not added to the cart.               |                                                                  |
|   **Step#**    |                      **Actor: Customer**                      |                            **System**                            |
|       1        |   Customer clicks on the 'Add to cart' button of a product.   |                                                                  |
|       2        |                                                               |                 Check if cart exists. Check ok.                  |
|       3        |                                                               |                Check if product exists. Check ok.                |
|       4        |                                                               |         Check if product is not yet sold. Check NOT ok.          |
|       5        |                                                               | Show error message to Customer for product that is already sold. |

#### UC11 SCENARIO 1.5

|  Scenario 1.5  |           Product already present in current cart.            |                                                                         |
| :------------: | :-----------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Product" page is loaded. Cart exists. |                                                                         |
| Post condition |               Product is not added to the cart.               |                                                                         |
|   **Step#**    |                      **Actor: Customer**                      |                               **System**                                |
|       1        |   Customer clicks on the 'Add to cart' button of a product.   |                                                                         |
|       2        |                                                               |                     Check if cart exists. Check ok.                     |
|       3        |                                                               |                   Check if product exists. Check ok.                    |
|       4        |                                                               |               Check if product is not yet sold. Check ok.               |
|       5        |                                                               |         Check if product is not yet in the cart. Check NOT ok.          |
|       6        |                                                               | Show error message to Customer for product that is already in the cart. |

### UC12, SEE CURRENT CART (CUSTOMER)

|   Actors Involved    |                             Customer                             |
| :------------------: | :--------------------------------------------------------------: |
| Informal description | Customer wants to retrieve information about their current cart. |
|     Precondition     |         Customer has an account. Customer is logged in.          |
|    Post condition    |              Current cart of Customer is retrieved.              |
|   Nominal Scenario   |            Current cart successfully retrieved. (1.1)            |
|       Variants       |                                                                  |
|      Exceptions      |                                                                  |

#### UC12 SCENARIO 1.1

|  Scenario 1.1  |                                                   Cart history successfully retrieved.                                                    |                                    |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  Precondition  |                                                          Customer is logged in.                                                           |                                    |
| Post condition |                                                  Current cart of Customer is retrieved.                                                   |                                    |
|   **Step#**    |                                                            **Actor: Customer**                                                            |             **System**             |
|       1        | Customer clicks on button 'Cart' in top right corner of any page or on button 'See Cart' in "Product" page or in "Detailed Product" page. |                                    |
|       2        |                                                                                                                                           | Retrieve current cart of Customer. |
|       3        |                                                                                                                                           |         Load "Cart" page.          |
|       4        |                                                                                                                                           |   Show current cart to Customer.   |

### UC13, REMOVE PRODUCT FROM CURRENT CART (CUSTOMER)

|   Actors Involved    |                                           Customer                                           |
| :------------------: | :------------------------------------------------------------------------------------------: |
| Informal description |                      Customer wants to remove a product from the cart.                       |
|     Precondition     | Customer is logged in. Cart exists. Cart contains at least 1 product. "Cart" page is loaded. |
|    Post condition    |                          Selected product is removed from the cart.                          |
|   Nominal Scenario   |                  Customer removes successfully product from the cart. (1.1)                  |
|       Variants       |                                                                                              |
|      Exceptions      |                   Error occurs (404): Customer does not have a cart. (1.2)                   |
|      Exceptions      |                 Error occurs (404): Product not found in current cart. (1.3)                 |
|      Exceptions      |                      Error occurs (404): Product does not exist. (1.4)                       |
|      Exceptions      |                       Error occurs (409): Product already sold. (1.5)                        |

#### UC13 SCENARIO 1.1

|  Scenario 1.1  |                     Customer removes successfully product from the cart.                     |                                                                         |
| :------------: | :------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. Cart exists. Cart contains at least 1 product. "Cart" page is loaded. |                                                                         |
| Post condition |                          Selected product is removed from the cart.                          |                                                                         |
|   **Step#**    |                                     **Actor: Customer**                                      |                               **System**                                |
|       1        |       Customer clicks on the 'Remove from cart' button next to a product in the cart.        |                                                                         |
|       2        |                                                                                              |                     Check if cart exists. Check ok.                     |
|       3        |                                                                                              |           Check if product is in the current cart. Check ok.            |
|       4        |                                                                                              |                   Check if product exists. Check ok.                    |
|       5        |                                                                                              |               Check if product is already sold. Check ok.               |
|       6        |                                                                                              |                      Remove product from the cart.                      |
|       7        |                                                                                              | Show confirmation to Customer for product that is removed successfully. |

#### UC13 SCENARIO 1.2

|  Scenario 1.2  |                 Customer does not have a cart.                 |                                                   |
| :------------: | :------------------------------------------------------------: | :-----------------------------------------------: |
|  Precondition  |         Customer is logged in. "Cart" page is loaded.          |                                                   |
| Post condition |                Selected product is not removed.                |                                                   |
|   **Step#**    |                      **Actor: Customer**                       |                    **System**                     |
|       1        | Customer clicks on the 'Remove from cart' button of a product. |                                                   |
|       2        |                                                                | Check if user is logged in as Customer. Check ok. |
|       3        |                                                                |        Check if cart exists. Check NOT ok.        |
|       4        |                                                                |          Show error message to Customer.          |

#### UC13 SCENARIO 1.3

|  Scenario 1.3  |                     Customer removes a product that is not in the cart.                      |                                                                      |
| :------------: | :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. Cart exists. Cart contains at least 1 product. "Cart" page is loaded. |                                                                      |
| Post condition |                        Selected product is not removed from the cart.                        |                                                                      |
|   **Step#**    |                                     **Actor: Customer**                                      |                              **System**                              |
|       1        |          Customer clicks on the 'Remove from cart' button of a product in the cart.          |                                                                      |
|       2        |                                                                                              |          Check if user is logged in as Customer. Check ok.           |
|       3        |                                                                                              |                   Check if cart exists. Check ok.                    |
|       4        |                                                                                              |        Check if product is in the current cart. Check NOT ok.        |
|       5        |                                                                                              | Show error message to Customer with product that is not in the cart. |

#### UC13 SCENARIO 1.4

|  Scenario 1.4  |                    Customer removes a not existing product from the cart.                    |                                                                  |
| :------------: | :------------------------------------------------------------------------------------------: | :--------------------------------------------------------------: |
|  Precondition  | Customer is logged in. Cart exists. Cart contains at least 1 product. "Cart" page is loaded. |                                                                  |
| Post condition |                        Selected product is not removed from the cart.                        |                                                                  |
|   **Step#**    |                                     **Actor: Customer**                                      |                            **System**                            |
|       1        |          Customer clicks on the 'Remove from cart' button of a product in the cart.          |                                                                  |
|       2        |                                                                                              |        Check if user is logged in as Customer. Check ok.         |
|       3        |                                                                                              |                 Check if cart exists. Check ok.                  |
|       4        |                                                                                              |        Check if product is in the current cart. Check ok.        |
|       5        |                                                                                              |              Check if product exists. Check NOT ok.              |
|       6        |                                                                                              | Show error message to Customer with product that does not exist. |

#### UC13 SCENARIO 1.5

|  Scenario 1.5  |                     Customer removes already sold product from the cart.                     |                                                                   |
| :------------: | :------------------------------------------------------------------------------------------: | :---------------------------------------------------------------: |
|  Precondition  | Customer is logged in. Cart exists. Cart contains at least 1 product. "Cart" page is loaded. |                                                                   |
| Post condition |                        Selected product is not removed from the cart.                        |                                                                   |
|   **Step#**    |                                     **Actor: Customer**                                      |                            **System**                             |
|       1        |          Customer clicks on the 'Remove from cart' button of a product in the cart.          |                                                                   |
|       2        |                                                                                              |         Check if user is logged in as Customer. Check ok.         |
|       3        |                                                                                              |                  Check if cart exists. Check ok.                  |
|       4        |                                                                                              |        Check if product is in the current cart. Check ok.         |
|       5        |                                                                                              |                Check if product exists. Check ok.                 |
|       6        |                                                                                              |          Check if product is already sold. Check NOT ok.          |
|       7        |                                                                                              | Show error message to Customer with product that is already sold. |

### UC14, SEE CART HISTORY (CUSTOMER)

|   Actors Involved    |                             Customer                              |
| :------------------: | :---------------------------------------------------------------: |
| Informal description | Customer wants to retrieve information about their cart history . |
|     Precondition     |          Customer has an account. Customer is logged in.          |
|    Post condition    |              Cart history of Customer is retrieved.               |
|   Nominal Scenario   |            Cart history successfully retrieved. (1.1)             |
|       Variants       |                                                                   |
|      Exceptions      |                                                                   |

#### UC14 SCENARIO 1.1

|  Scenario 1.1  |                                                   Cart history successfully retrieved.                                                    |                                    |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------: |
|  Precondition  |                                                          Customer is logged in.                                                           |                                    |
| Post condition |                                                  Cart history of Customer is retrieved.                                                   |                                    |
|   **Step#**    |                                                            **Actor: Customer**                                                            |             **System**             |
|       1        | Customer clicks on button 'Cart' in top right corner of any page or on button 'See Cart' in "Product" page or in "Detailed Product" page. |                                    |
|       2        |                                                                                                                                           | Retrieve cart history of Customer. |
|       3        |                                                                                                                                           |         Load "Cart" page.          |
|       4        |                                                                                                                                           |   Show cart history to Customer.   |

### UC15, DELETE CURRENT CART (CUSTOMER)

|   Actors Involved    |                              Customer                               |
| :------------------: | :-----------------------------------------------------------------: |
| Informal description | Customer wants to delete the current cart with all products inside. |
|     Precondition     |     Customer is logged in. Cart exists. "Cart" page is loaded.      |
|    Post condition    |       All products from cart are removed and cart is deleted.       |
|   Nominal Scenario   |    All products from cart are removed and cart is deleted. (1.1)    |
|       Variants       |                                                                     |
|      Exceptions      |              Error occurs (404): Cart not found. (1.2)              |

#### UC15 SCENARIO 1.1

|  Scenario 1.1  |                Customer deletes the current cart.                |                                                       |
| :------------: | :--------------------------------------------------------------: | :---------------------------------------------------: |
|  Precondition  |    Customer is logged in. Cart exists. "Cart" page is loaded.    |                                                       |
| Post condition |     All products from cart are removed and cart is deleted.      |                                                       |
|   **Step#**    |                       **Actor: Customer**                        |                      **System**                       |
|       1        | Customer clicks on the 'Delete cart' button of the current cart. |                                                       |
|       2        |                                                                  |            Check if cart exists. Check ok.            |
|       3        |                                                                  | Remove all the products from the current cart. (UC10) |
|       4        |                                                                  |                 Delete current cart.                  |
|       5        |                                                                  |            Show confirmation to Customer.             |

#### UC15 SCENARIO 1.2

|  Scenario 1.2  |              Customer deletes a not existing cart.               |                                                                 |
| :------------: | :--------------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  |          Customer is logged in. "Cart" page is loaded.           |                                                                 |
| Post condition |                       Cart is not deleted.                       |                                                                 |
|   **Step#**    |                       **Actor: Customer**                        |                           **System**                            |
|       1        | Customer clicks on the 'Delete cart' button of the current cart. |                                                                 |
|       2        |                                                                  |               Check if cart exists. Check NOT ok.               |
|       3        |                                                                  | Show error message to Customer with the cart that do not exist. |

### UC16, DO CHECKOUT OF CURRENT CART (CUSTOMER)

|   Actors Involved    |                               Customer                                |
| :------------------: | :-------------------------------------------------------------------: |
| Informal description |            Customer finalizes the cart by doing checkout.             |
|     Precondition     | Customer is logged in. Cart exists. Cart contains at least 1 product. |
|    Post condition    |           Customer has done checkout of their current cart.           |
|   Nominal Scenario   |             Customer does checkout of current cart (1.1).             |
| Variants | |
| Exceptions | Error occurs (404): Do checkout without having a cart (1.2). |
| Exceptions | Error occurs (404): Do checkout with empty cart (1.3). |
| Exceptions | Error occurs (404): Product(s) does not exist (1.4). |
| Exceptions | Error occurs: Product(s) already sold (1.5). |

#### UC16 SCENARIO 1.1

|  Scenario 1.1  |                            Customer does checkout of current cart                            |                                                                                                         |
| :------------: | :------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product. |                                                                                                         |
| Post condition |                      Customer has done checkout of their current cart.                       |                                                                                                         |
|   **Step#**    |                                     **Actor: Customer**                                      |                                               **System**                                                |
|       1        |                          Customer clicks on the 'Checkout' button.                           |                                                                                                         |
|       2        |                                                                                              |                                     Check if cart exists. Check ok.                                     |
|       3        |                                                                                              |                                  Check if cart is not empty. Check ok.                                  |
|       4        |                                                                                              |                                 Check if cart products exist. Check ok.                                 |
|       5        |                                                                                              |                           Check if cart products are not yet sold. Check ok.                            |
|       6        |                                                                                              |                                 Compute total cost of products in cart.                                 |
|       7        |                                                                                              | For every product in cart set selling date equal to current date and mark it as sold. Set cart as sold. |
|       8        |                                                                                              |                          Show confirmation of successful checkout to Customer.                          |

#### UC16 SCENARIO 1.2

|  Scenario 1.2  |                 Do checkout without having a cart.                 |                                                          |
| :------------: | :----------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart does not exist. |                                                          |
| Post condition |                     Checkout is not completed.                     |                                                          |
|   **Step#**    |                        **Actor: Customer**                         |                        **System**                        |
|       1        |             Customer clicks on the 'Checkout' button.              |                                                          |
|       2        |                                                                    |           Check if cart exists. Check NOT ok.            |
|       3        |                                                                    |                       Create cart.                       |
|       4        |                                                                    | Ask Customer to add at least one product to do checkout. |

#### UC16 SCENARIO 1.3

|  Scenario 1.3  |                       Do checkout with empty cart.                        |                                                          |
| :------------: | :-----------------------------------------------------------------------: | :------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart is empty. |                                                          |
| Post condition |                          Checkout not completed.                          |                                                          |
|   **Step#**    |                            **Actor: Customer**                            |                        **System**                        |
|       1        |                 Customer clicks on the 'Checkout' button.                 |                                                          |
|       2        |                                                                           |             Check if cart exists. Check ok.              |
|       3        |                                                                           |        Check if cart is not empty. Check NOT ok.         |
|       4        |                                                                           | Ask Customer to add at least one product to do checkout. |

#### UC16 SCENARIO 1.4

|  Scenario 1.4  |                      Do checkout with one or more not existing products                      |                                                                 |
| :------------: | :------------------------------------------------------------------------------------------: | :-------------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product. |                                                                 |
| Post condition |                                  Checkout is not completed.                                  |                                                                 |
|   **Step#**    |                                     **Actor: Customer**                                      |                           **System**                            |
|       1        |                          Customer clicks on the 'Checkout' button.                           |                                                                 |
|       2        |                                                                                              |                 Check if cart exists. Check ok.                 |
|       3        |                                                                                              |              Check if cart is not empty. Check ok.              |
|       4        |                                                                                              |           Check if cart products exist. Check NOT ok.           |
|       5        |                                                                                              | Show error message to Customer with products that do not exist. |

#### UC16 SCENARIO 1.5

|  Scenario 1.5  |                      Do checkout with one or more already sold products                      |                                                            |
| :------------: | :------------------------------------------------------------------------------------------: | :--------------------------------------------------------: |
|  Precondition  | Customer is logged in. "Cart" page is loaded. Cart exists. Cart contains at least 1 product. |                                                            |
| Post condition |                                  Checkout is not completed.                                  |                                                            |
|   **Step#**    |                                     **Actor: Customer**                                      |                         **System**                         |
|       1        |                          Customer clicks on the 'Checkout' button.                           |                                                            |
|       2        |                                                                                              |              Check if cart exists. Check ok.               |
|       3        |                                                                                              |           Check if cart is not empty. Check ok.            |
|       4        |                                                                                              |          Check if cart products exist. Check ok.           |
|       5        |                                                                                              |   Check if cart products are not yet sold. Check NOT ok.   |
|       6        |                                                                                              | Show error message to Customer with products already sold. |

# Glossary

![](/images/UML_Class_Diagram_V1.png)

- User - an entity registered on EzElectronics website. A user is characterized by username, name, surname and role.
- Role - an attribute characterizing each user. Possible values are: Customer, Manager.
- Customer - user with role Customer. A Customer can add/remove products to/from their current cart, delete the cart with all products inside, check out the current cart, see the history of past checkouts.
- Manager - user with role Manager. A Manager can register products to the EZElectronics database, remove products from the EZElectronics database.
- Product - a unit item offered by EzElectronics website. A product can be added to current cart, removed from current cart. Each product is characterized by a unique code long at least 6 characters, selling price, model, category, arrival date, selling date and details.
- Category - an attribute characterizing each Product. Possible values are: Smartphone, Laptop, Appliance.
- Cart - an entity used as a container of products. A Cart is associated to a specific Customer. It is characterized by id, customer username, sales status, payment date, total price and list of products.
- Current cart - a cart entity associated to a logged in Customer. It is the cart to which the Customer can add/remove products and which can be checked out.
- Check out - the action of payment of the current cart of a Customer.
- Cart history - a list of all past checked out carts associated to a specific Customer, i.e. a history of all paid carts.
- Tech admin - an actor interfacing the EZElectronics through a terminal.
- Sales status - an attribute characterizing each cart. The possible values to characterize each cart are "sold" or "unsold". Each product is characterized by a selling date: if not sold, selling date is not specified, if sold, selling date is specified.
- Parameters - parameters provided by user:
  - User parameters - parameters provided when an account is created.
  - Product parameters - parameters provided when a product arrival is defined.
- EzElectronics database - the database of EzElectronics website containing all registered products.

# Deployment Diagram

![](/images/DeploymentDiagramV1.png)
