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
      console.log("test");
      const newSeatingPlan = await repository.createSeatingPlan(seatingPlan);

      await repository.addTableToSeatingPlan(
        newSeatingPlan.id,
        seatingPlan.listesTable
      );
      const seating_plan = await repository.getSeatingPlanById(
        newSeatingPlan.id
      );
      return { seating_plan };
    }
    return { errorMessage: "You gave a non-existent table number" };
  },

  async getById(id) {
    return await repository.getSeatingPlanById(id);
  },
});
