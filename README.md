##### API url :

locale : http://localhost:8000
deploy : https://tp-altable.herokuapp.com

###### routes

**Dishes**

- post /dishes
  Création d'un plat
  # body :
  # ------------------------------------------
  {
  "name": "Tomate Farcie",
  "description": "description",
  "type": "Entrée",
  "price": 3,
  "quantity": 0
  }
  # ------------------------------------------
- put /dishes/:id
  Modification des quantités d'un plat
  # body :
  # ------------------------------------------
  {
  "quantity": 10
  }
  # ------------------------------------------
- get /dishes
  Liste de tous les plats
- get /dishes/menu
  Liste de tous les plats disponibles

**Services**

- post /services
  Création d'un service

  # body :

  # ------------------------------------------

{
"startDate": "2022-01-21 22:00",
"endDate":"2022-01-21 23:00",
"seatingPlanId": 53
}

# ------------------------------------------

- get /services/:id
  Récupération d'un service

**Seating-plans**

- post /seating-plans
  Création d'un plan de tables

- get /seating-plans/:id
  Récupération d'un plan de tables

######

Nous avons créé le dossier exposition qui correspond à nos modèles non dépendants de notre structure de données.
