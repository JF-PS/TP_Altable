###### model

sequelize model:create --name Dishes --attributes name:string,description:text,type:string,price:float,quantity:integer

sequelize model:create --name Services --attributes seatingPlanId:integer,startDate:date,endDate:date
sequelize model:create --name Tables --attributes id:integer
sequelize model:create --name PlanManagement --attributes seatingPlanId:integer,numTable:integer,nbGuests:integer
sequelize model:create --name SeatingPlans --attributes PlanManagementId:integer,freeze:boolean

###### migration

sequelize-mig migration:make -n migration

sequelize db:migrate
