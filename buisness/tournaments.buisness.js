module.exports = (repository) => ({
  async create(formData) {
    const currentTournament = await repository.getByName(formData.nom);
    if (currentTournament) return { message: "This name already exists" };
    return repository.create(formData);
  },

  async getById(tournamentId) {
    return await repository.getById(tournamentId);
  },
});
