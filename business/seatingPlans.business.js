const { isEmpty } = require("lodash");

module.exports = (repository) => ({
  async create(seatingPlan) {
    let numTableList = [];

    seatingPlan.listesTable.map((table) => {
      numTableList.push(table.numTable);
      return table;
    });

    const nbNumTable = await repository.getNbNumTable(numTableList);
    const allNumTableExist = nbNumTable === numTableList.length;

    if (allNumTableExist) {
      isSchedule = await repository.checkSchedulePlan(seatingPlan);

      if (isEmpty(isSchedule)) {
        const service = await repository.createService(seatingPlan);
        await repository.addTableToSeatingPlan(
          service.id,
          seatingPlan.listesTable
        );
        return await repository.getServiceById(service.id);
      }
      return "There is already a plan for this time slot !";
    }
    return "You gave a non-existent table number";
  },

  async getById(id) {
    return await repository.getServiceById(id);
  },
});
