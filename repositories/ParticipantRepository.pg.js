const Participant = require("../models").Participant;

module.exports = class ParticipantsRepository {
  async create(participant) {
    return await new Promise((resolve, reject) => {
      Participant.create(participant)
        .then((newParticipant) => {
          resolve(newParticipant);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};
