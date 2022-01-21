module.exports = (repository) => ({
    async create(service) {
        if(service.startDate >= service.endDate) {
            return { response: "Start date can't be superior than end date" };
        }
        const createService = await repository.create(service);
        return { response: createService };
    },
});