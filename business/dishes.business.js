module.exports = (repository) => ({
  async create(dish) {
    const currentDish = await repository.getByName(dish.name);

    const APERITIF = "Apéritif";
    const ENTREE = "Entrée";
    const PLAT_PRINCIPAL = "Plat principal";
    const DESSERT = "Dessert";
    const BOISSON = "Boisson";

    const types = [APERITIF, ENTREE, PLAT_PRINCIPAL, DESSERT, BOISSON];

    if (currentDish)
      return { status: 400, response: "This name already exists" };

    if (types.includes(dish.type)) {
      const createDish = await repository.create(dish);
      return { status: 201, response: createDish };
    }
    return { status: 400, response: "This type doesn't exists" };
  },

  async getAll(dishes) {
    return await repository.getAll(dishes);
  },
});
