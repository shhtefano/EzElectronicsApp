# Project Estimation - FUTURE

Date: 2024-05-05

Version: 2.0

| Version number | Date          |
| :------------: |:-------------:|
| V2.0           |   2024-05-02  |
| V2.1           |   2024-05-04  |


# Estimation approach
Consider the EZElectronics  project in FUTURE version (as proposed by your team in requirements V2), assume that you are going to develop the project INDEPENDENT of the deadlines of the course, and from scratch (not from V1)

# Estimate by size
### 

```
cart.ts = 16
inventory.ts = 20
user.ts = 14
wishlist.ts = 20
review.ts = 20
discount.ts = 20
order.ts = 20
catalogue.ts = 20
- total = 150 LOCs, 8 classes


cartController.ts = 9*20 + 8 = 188
inventoryController.ts = 9*20 + 8 = 188
userController.ts = 6*20 + 7 = 127
wishlistController.ts = 9*20 + 8 = 188
reviewController.ts = 9*20 + 8 = 188
discountController.ts = 9*20 + 8 = 188  
orderController.ts = 9*20 + 8 = 188
catalogueController.ts = 9*20 + 8 = 188
- total = 1443 LOCs, 8 classes

cartDAO.ts = 140
inventoryDAO.ts = 140
userDAO.ts = 140
wishlistDAO.ts = 140
reviewDAO.ts = 140
discountDAO.ts = 140 
orderDAO.ts = 140
catalogueDAO.ts = 140
- total = 1120 LOCs, 8 classes

cartError.ts = 30
inventoryError.ts = 30
userError.ts = 60
wishlistError.ts = 60
reviewError.ts = 60
discountError.ts = 60
orderError.ts = 60
catalogueError.ts = 60
- total = 420 LOCs, 8 classes

auth.ts = 140
cartRoutes.ts = 140 
inventoryRoutes.ts = 180
userRoutes.ts = 180
wishlistRoutes.ts = 180 
reviewRoutes.ts = 180
discountRoutes.ts = 180 
orderRoutes.ts = 180
catalogueRoutes.ts = 180
helper.ts = 30
utilities.ts = 25 
- total = 1595 LOCs, 11 classes

OVERALL #LOCs= 150 + 1443 + 1120 + 420 + 1595 = 4728 LOCs
```

|                   PARAMETER                         |       ESTIMATE         |             
| --------------------------------------------------- | -----------------------| 
| NC =  Estimated number of classes to be developed   |          43            |             
| A = Estimated average size per class, in LOC        | 4728 / 43 = 110 LOCs per class          | 
| S = Estimated size of project, in LOC (= NC * A)    | 43 * 110 = 4730 LOCs  |
| E = Estimated effort, in person hours (here use productivity 10 LOC per person hour)  | 4728 LOCs/10 LOCs per person hour = 472.8 person hours |   
| C = Estimated cost, in euro (here use 1 person hour cost = 30 euro) | 472.8 person hours x 30 euro = 14184 euro | 
| Estimated calendar time, in calendar weeks (Assume team of 4 people, 8 hours per day, 5 days per week ) | 472.8 person hours/160 person hours per week = 3 weeks |

# Estimate by product decomposition
### 

|         component name    | Estimated effort (person hours)   |             
| -----------               | -------------------------------   | 
| Requirement document      |                2000               |
| GUI prototype             |                200                | 
| design document           |                100                | 
| code                      |                180                |  
| unit tests                |                120                | 
| api tests                 |                40                 | 
| management documents      |                20                 | 
|                           |                                   | 
| Total                     |                2660     
        

# Estimate by activity decomposition
### 

|         Activity name    | Estimated effort (person hours)   |
| -------------------------|-----------------------------------|
| Requirements             |16 days x 32 p-hours = 512 p-hours |
| Design                   | 9 days x 32 p-hours = 288 p-hours |
| Documentation            |20 days x 32 p-hours = 640 p-hours | 
| Implementation and V&V   |35 days x 32 p-hours = 1120 p-hours|
| Project Management       |55 days X 4 p-hours =   220 p-hours|
|                          |                                   |
| Total                    |                2780               |

![](/images/Gantt_timetable_V2.jpg)

# Gant diagram
![](/images/Gantt_V2.jpg)

# Summary

Report here the results of the three estimation approaches. The  estimates may differ. Discuss here the possible reasons for the difference

|                                   | Estimated effort (person hours)         |   Estimated duration (in weeks)for a team: 4 members, 8 hours per day, 5 days per week  |          
| -----------                       | --------------------------------------- | --------------------  |
| estimate by size                  |               187.8                     |       3.0 weeks       |
| estimate by product decomposition |               2660                      |      16.6 weeks       |
| estimate by activity decomposition|               2780                      |      17.4 weeks       |


Comments on the difference in estimated effort and duration:
- estimate by size - the estimated effort takes into account only the implementation part of the software, i.e. the effort related to Coding and Testing. Compared to v1, in v2, the effort related to the implementation part is larger since additional functional requirements are proposed.
- estimate by product decomposition - the estimated effort takes into account also the requirement analysis, consequently, the estimated duration increases significantly. Compared to v1, in v2, the estimated effort takes into account the requirement analysis of the additional functional requirements proposed. For this reason, the estimated effort and estimated duration are larger with respect to v1. 
- estimate by activity decomposition - the estimated effort takes into account also the requirement analysis, consequently, the estimated duration increases significantly. Compared to v1, in v2, the estimated effort takes into account the requirement analysis of the additional functional requirements proposed. For this reason, the estimated effort and estimated duration are larger with respect to v1. 