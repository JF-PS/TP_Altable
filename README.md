###### routes

__Dishes__
- post /dishes 
    Création d'un plat
    
- put /dishes/:id
    Modification des quantités d'un plat
    
- get /dishes
    Liste de tous les plats
    
- get /dishes/menu
    Liste de tous les plats disponibles
    
__Services__
- post /services
    Création d'un service

- get /services/:id
    Récupération d'un service

__Seating-plans__
- post /seating-plans
    Création d'un plan de tables

- get /seating-plans/:id
    Récupération d'un plan de tables


###### 
Nous avons créé le dossier exposition qui correspond à nos modèles non dépendants de notre structure de données.



###### model

sequelize model:create --name Dishes --attributes name:string,description:text,type:string,price:float,quantity:integer

sequelize model:create --name Services --attributes seatingPlanId:integer,startDate:date,endDate:date
sequelize model:create --name Tables --attributes id:integer
sequelize model:create --name PlanManagement --attributes seatingPlanId:integer,numTable:integer,nbGuests:integer
sequelize model:create --name SeatingPlans --attributes PlanManagementId:integer,freeze:boolean

###### migration

sequelize-mig migration:make -n migration

sequelize db:migrate
