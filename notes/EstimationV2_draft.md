# Project Estimation - FUTURE

Date: 02/05/2024

Version: 2.0

| Version number | Date          |
| :------------: |:-------------:|
| V2.0           |   2024-05-02  |

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
catalogue.ts = 20  150 1443 1120 420 1595

cartcontroller.ts = 9*20 + 8 = 188
inventorycontroller.ts = 9*20 + 8 = 188
usercontroller.ts = 6*20 + 7 = 127
wishlistcontroller.ts = 9*20 + 8 = 188
reviewcontroller.ts = 9*20 + 8 = 188
discountcontroller.ts = 9*20 + 8 = 188  
ordercontroller.ts = 9*20 + 8 = 188
cataloguecontroller.ts = 9*20 + 8 = 188

cartdao.ts = 140
inventorydao.ts = 140
userdao.ts = 140
wishlistdao.ts = 140
reviewdao.ts = 140
discountdao.ts = 140 
orderdao.ts = 140
cataloguedao.ts = 140

carterror.ts = 30
inventoryerror.ts = 30
usererror.ts = 60
wishlisterror.ts = 60
reviewerror.ts = 60
discounterror.ts = 60
ordererror.ts = 60
catalogueerror.ts = 60

auth.ts = 140
cartRoutes.ts = 140 
inventoryRoutes.ts = 180
userRoutes.ts = 180
wishlistRoutes.ts = 180 
reviewRoutes.ts = 180
discountRoutes.ts = 180 
orderRoutes.ts = 180
catalogueRoutes.ts = 180180*
helper.ts = 30
utilities.ts = 25 

#LOC= 150 + 1443 + 1120 + 420 + 1595= 4728
```

|                   PARAMETER                         |       ESTIMATE         |             
| --------------------------------------------------- | -----------------------| 
| NC =  Estimated number of classes to be developed   |          43            |             
| A = Estimated average size per class, in LOC        | 4728 / 43 = 109 LOCs per class          | 
| S = Estimated size of project, in LOC (= NC * A)    | 43 * 109 = 4728 LOCs  |
| E = Estimated effort, in person hours (here use productivity 10 LOC per person hour)  | 4728 LOCs/10 LOCs per person hour = 472.8 person hours |   
| C = Estimated cost, in euro (here use 1 person hour cost = 30 euro) | 472.8 person hours x 30 euro = 14.184€ | 
| Estimated calendar time, in calendar weeks (Assume team of 4 people, 8 hours per day, 5 days per week ) | 472.8 person hours/160 person hours per week = 2,95 weeks |               

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
| Total                     |                2660               |

# Estimate by activity decomposition
### 
|         Activity name    | Estimated effort (person hours)   |
| -------------------------|-----------------------------------|
| Requirements             |16 days x 32 p-hours = 512 p-hours |
| Design                   | 9 days x 32 p-hours = 288 p-hours |
| Documentation            |20 days x 32 p-hours = 640 p-hours | 
| Implementation and V&V   |35 days x 32 p-hours = 1120 p-hours| 
| Project Management       |                                   |
|                          |                                   |
| Total                    |                2560               |

###
Insert here Gantt chart with above activities

# Summary

Report here the results of the three estimation approaches. The  estimates may differ. Discuss here the possible reasons for the difference

|             | Estimated effort(person hours)          |   Estimated duration (in weeks)for a team: 4 members, 8 hours per day, 5 days per week |          
| ----------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| estimate by size| 472.8                                     | 2.95 weeks     |
| estimate by product decomposition | 2660                    | 16.6 weeks     |
| estimate by activity decomposition| 2560                    | 16.0 weeks     |

Comments on the difference in estimated effort and duration:
- estimate by size - the estimated effort takes into account only the implementation part of the software, i.e. the effort related to Coding and Testing
- estimate by product decomposition - requirement analysis is also included in estimated duration
- estimate by activity decomposition - requirement analysis is also included in estimated duration

