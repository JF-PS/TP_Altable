const http = require("http");
const express = require("express");
const cors = require("cors");
require("colors");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(cors());

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("./ext/index.html", { root: __dirname });
});

const dishRoutes = require("./routes/dishes.route");
const dishController = require("./controllers/dishes.controller");
const dishBusiness = require("./business/dishes.business");
const DishesRepository = require("./repositories/DishesRepository.pg");
const dishesRepository = new DishesRepository();

app.use(
  "/dishes",
  dishRoutes(express, dishController(dishBusiness(dishesRepository)))
);

const seatingPlanRoutes = require("./routes/seatingPlans.route");
const seatingPlanController = require("./controllers/seatingPlans.controller");
const seatingPlanBusiness = require("./business/seatingPlans.business");
const SeatingPlansRepository = require("./repositories/SeatingPlansRepository.pg");
const seatingPlansRepository = new SeatingPlansRepository();

app.use(
  "/seating-plans",
  seatingPlanRoutes(
    express,
    seatingPlanController(seatingPlanBusiness(seatingPlansRepository))
  )
);

const serviceRoutes = require("./routes/services.route");
const serviceController = require("./controllers/services.controller");
const serviceBusiness = require("./business/services.business");
const ServicesRepository = require("./repositories/ServicesRepository.pg");
const servicesRepository = new ServicesRepository();

app.use(
  "/services",
  serviceRoutes(
    express,
    serviceController(
      serviceBusiness(servicesRepository, seatingPlansRepository)
    )
  )
);

server.listen(port, () => {
  var desc = "Adresse du serveur: ";
  var adresse = ` http://localhost:${port}`.green.bold;
  console.log(
    `################################################################`.yellow
      .bold
  );
  console.log(desc + adresse);
  console.log(
    `################################################################`.yellow
      .bold
  );
});

module.exports = app;
