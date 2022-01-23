###### model

sequelize model:create --name Dishes --attributes name:string,description:text,type:string,price:float,quantity:integer

sequelize model:create --name SeatingPlans --attributes startDate:date,endDate:date
sequelize model:create --name Tables --attributes numTable:integer,nbGuests:integer
sequelize model:create --name SeatingPlans_Tables --attributes tableId:integer,serviceId:integer

###### migration

sequelize-mig migration:make -n migration

sequelize db:migrate
