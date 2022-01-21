###### model

sequelize model:create --name Dishes --attributes name:string,description:text,type:string,price:float,quantity:integer

sequelize model:create --name Services --attributes startDate:date,endDate:date

###### migration

sequelize-mig migration:make -n migration

sequelize db:migrate
