const http = require("http");
const express = require("express");
const cors = require("cors");
require("colors");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(cors());

const dishRoutes = require("./routes/dishes.route");
const dishController = require("./controllers/dishes.controller");
const dishBusiness = require("./business/dishes.business");
const DishesRepository = require("./repositories/DishesRepository.pg");
const dishesRepository = new DishesRepository();

//======== Services ========
const serviceRoutes = require("./routes/services.route");
const serviceController = require("./controllers/services.controller");
const serviceBusiness = require("./business/services.business");
const ServicesRepository = require("./repositories/ServicesRepository.pg");
const servicesRepository = new ServicesRepository();

// ============================================================================================================================================================================
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
// ============================================================================================================================================================================

// ============================================================================================================================================================================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// ============================================================================================================================================================================

app.use(
  "/dishes",
  dishRoutes(express, dishController(dishBusiness(dishesRepository)))
);

app.use(
  "/services",
  serviceRoutes(express, serviceController(serviceBusiness(servicesRepository)))
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
