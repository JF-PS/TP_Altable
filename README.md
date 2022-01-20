###### model

sequelize model:create --name Dishes --attributes name:string,description:text,type:string,price:float,quantity:integer

###### migration

sequelize-mig migration:make -n migration

sequelize db:migrate
