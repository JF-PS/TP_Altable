module.exports = (repository) => ({
  async create(formData) {
    return repository.create(formData);
  },
});
