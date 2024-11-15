# Project Estimation - CURRENT

Date: 2024-05-05

Version: 1.0

| Version number | Date          |
| :------------: |:-------------:|
| V1.0           |   2024-04-26  |
| V1.1           |   2024-05-02  |
| V1.2           |   2024-05-04  |


# Estimation approach
Consider the EZElectronics project in CURRENT version (as given by the teachers), assume that you are going to develop the project INDEPENDENT of the deadlines of the course, and from scratch

# Estimate by size
### 

```
Some details on the code provided in Step 1
Products, Cart, Users, Error(x3), DAOs(x3), Controllers(x3), helper.ts, utilities.ts, routers(x4),

cart.ts = 16
product.ts = 20 
user.ts = 14
cartcontroller.ts = 9*20 + 8 = 188
productcontroller.ts = 9*20 + 8 = 188
usercontroller.ts =  6*20 + 7 = 127

assuming that each DAO will have about 6 functions (6*20) + LOCs of class definition
cartdao.ts = 140
productdao.ts = 140
userdao.ts = 140


carterror.ts = 30
producterror.ts = 30
usererror.ts = 60
auth.ts = 140
cartRoutes.ts = 140 
productRoutes.ts = 180
userRoutes.ts = 180
helper.ts = 30
utilities.ts = 15 

```

|                  PARAMETER                          |               ESTIMATE           |
|-----------------------------------------------------|----------------------------------|
| NC = Estimated number of classes to be developed   |             18                   |
| A = Estimated average size per class, in LOC        |      1878 LOCs / 18 classes = 104 LOCs per class      | 
| S = Estimated size of project, in LOC (= NC * A)    |       18 * 104 = 1878 LOCs      |
| E = Estimated effort, in person hours (here use productivity 10 LOC per person hour)   | 1878 LOCs/10 LOCs per person hour = 187.8 person hours     |   
| C = Estimated cost, in euro (here use 1 person hour cost = 30 euro)  |  187.8 person hours x 30 euro = 5634€       | 
| Estimated calendar time, in calendar weeks (Assume team of 4 people, 8 hours per day, 5 days per week ) | 187.8 person hours/160 person hours per week = 1.2 weeks  | 

# Estimate by product decomposition    
### 
|         component name    | Estimated effort (person hours)   |             
| -----------               | -------------------------------   | 
| Requirement document      |                1400               |
| GUI prototype             |                140                | 
| design document           |                70                 | 
| code                      |                126                |  
| unit tests                |                84                 | 
| api tests                 |                28                 | 
| management documents      |                14                 | 
|                           |                                   | 
| Total                     |                1862               |


# Estimate by activity decomposition
### 

|         Activity name    | Estimated effort (person hours)   |
| -------------------------|-----------------------------------|
| Requirements             |13 days x 32 p-hours = 416 p-hours |
| Design                   | 6 days x 32 p-hours = 192 p-hours |
| Documentation            |14 days x 32 p-hours = 448 p-hours | 
| Implementation and V&V   |28 days x 32 p-hours = 896 p-hours | 
| Project Management       |48 days X 4 p-hours =  192 p-hours |
|                          |                                   |
| Total                    |             2144 p-hours                  |


![](/images/Gantt_timetable_V1.jpg)

# Gant diagram
![](/images/Gantt_V1.jpg)

# Summary

Report here the results of the three estimation approaches. The estimates may differ. Discuss here the possible reasons for the difference


|                                   | Estimated effort (person hours)         |   Estimated duration (in weeks) for a team: 4 members, 8 hours per day, 5 days per week  |          
| -----------                       | --------------------------------------- | -------------------- |
| estimate by size                  |               187.8                     |       1.2 weeks      |
| estimate by product decomposition |               1862                      |      11.6 weeks      |
| estimate by activity decomposition|               2144                      |      13.4 weeks      |


Comments on the difference in estimated effort and duration:
- estimate by size - the estimated effort takes into account only the implementation part of the software, i.e. the effort related to Coding and Testing
- estimate by product decomposition - the estimated effort takes into account also the requirement analysis, consequently, the estimated duration increases significantly
- estimate by activity decomposition - - the estimated effort takes into account also the requirement analysis, consequently, the estimated duration increases significantly