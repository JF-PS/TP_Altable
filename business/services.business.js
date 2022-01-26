const { isEmpty } = require("lodash");

module.exports = (servicesRepository, seatingPlansRepository) => ({
  async create(service) {
    isSchedule = await servicesRepository.checkSchedulePlan(service);
    if (isEmpty(isSchedule)) {
      const seatingPlan = await seatingPlansRepository.getSeatingPlanById(
        service.seatingPlanId
      );

      if (!isEmpty(seatingPlan)) {
        const { id, freeze } = seatingPlan;
        if (!freeze) {
          const newService = await servicesRepository.createService(service);
          const test = await seatingPlansRepository.updateSeatingPlanFreeze(
            id,
            !freeze
          );
          return await servicesRepository.getServiceById(newService.id);
        }
        return "The seating plan is already fixed !";
      }
      return "The seating plan id given does not exist !";
    }
    return "There is already a plan for this time slot !";
  },

  async getById(id) {
    return await servicesRepository.getServiceById(id);
  },
});
