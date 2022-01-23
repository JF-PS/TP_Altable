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
        const newSeatingPlan = await repository.createSeatingPlan(seatingPlan);
        await repository.addTableToSeatingPlan(
          newSeatingPlan.id,
          seatingPlan.listesTable
        );
        const mySeatingPlans = await repository.getSeatingPlanById(
          newSeatingPlan.id
        );
        return { status: 201, response: mySeatingPlans };
      }
      return {
        status: 201,
        response:
          "Error: Il existe déjà un plan sur cette tranches horraires !",
      };
    }
    return {
      status: 201,
      response: "Error: You gave a non-existent table number",
    };
  },

  async getById(id) {
    return await repository.getSeatingPlanById(id);
  },
});
