const http = require("http");
const express = require("express");
const cors = require("cors");
require("colors");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(cors());

const tournamentRoutes = require("./routes/tournaments.route");
const tournamentController = require("./controllers/tournaments.controller");
const tournamentBuisness = require("./buisness/tournaments.buisness");
const TournamentsRepository = require("./repositories/TournamentRepository.pg");
const tournamentsRepository = new TournamentsRepository();

const participantRoutes = require("./routes/participants.route");
const participantController = require("./controllers/participants.controller");
const participantBuisness = require("./buisness/participants.business");
const ParticipantsRepository = require("./repositories/participantRepository.pg");
const participantsRepository = new ParticipantsRepository();

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
  "/tournaments",
  tournamentRoutes(
    express,
    tournamentController(tournamentBuisness(tournamentsRepository))
  )
);

app.use(
  "/participants",
  participantRoutes(
    express,
    participantController(participantBuisness(participantsRepository))
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
