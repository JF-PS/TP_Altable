module.exports = (repository) => ({
  async create(dish) {
    const currentDish = await repository.getByName(dish.name);

    const APERITIF = "Apéritif";
    const ENTREE = "Entrée";
    const PLAT_PRINCIPAL = "Plat principal";
    const DESSERT = "Dessert";
    const BOISSON = "Boisson";

    const types = [APERITIF, ENTREE, PLAT_PRINCIPAL, DESSERT, BOISSON];

    if (currentDish) return { errorMessage: "This name already exists" };

    if (types.includes(dish.type)) {
      const createDish = await repository.create(dish);
      return { createDish };
    }
    return { errorMessage: "This type doesn't exists" };
  },

  async updateQuantity(id, quantity) {
    const updateQuantity = await repository.updateQuantity(id, quantity);
    return { updateQuantity };
  },

  async getAll(dishes) {
    return await repository.getAll(dishes);
  },

  async getAllPositiveQuantity(dishes) {
    return await repository.getAllPositiveQuantity(dishes);
  },
});
