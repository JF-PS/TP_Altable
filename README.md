###### model

sequelize model:create --name Dishes --attributes name:string,description:text,type:string,price:float,quantity:integer

sequelize model:create --name SeatingPlans --attributes dateMin:date,dateMax:date
sequelize model:create --name Tables --attributes numTable:integer,nbGuests:integer
sequelize model:create --name SeatingPlans_Tables --attributes tableId:integer,seatingPlanId:integer

###### migration

sequelize-mig migration:make -n migration

sequelize db:migrate
