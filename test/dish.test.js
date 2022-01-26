const mockDishService = require("../mock/DishRepository.mock");
jest.mock("../mock/DishRepository.mock", () => ({
  getByName: jest.fn(),
  create: jest.fn(),
  getAll: jest.fn(),
  updateQuantity: jest.fn(),
  getAllPositiveQuantity: jest.fn(),
}));

const dishBusiness = require("../business/dishes.business");
const business = dishBusiness(mockDishService);

afterEach(() => {
  jest.clearAllMocks();
});

describe("Check Dish Business", () => {
  test("if create dish Ok", async () => {
    mockDishService.getByName.mockReturnValue(false);
    mockDishService.create.mockReturnValue(true);
    const result = await business.create({
      type: "Apéritif",
      name: "MorganeT25",
    });

    expect(result).toBe(true);
  });

  test("if create dish not Ok", async () => {
    mockDishService.getByName.mockReturnValue(true);

    const result = await business.create({
      type: "Apéritif",
      name: "MorganeT25",
    });

    expect(result).toBe("This name already exists");
  });

  test("if update quantity not Ok", async () => {
    mockDishService.updateQuantity.mockReturnValue(true);
    const result = await business.updateQuantity();

    expect(result).toBe(true);
  });

  test("if list dishes not Ok", async () => {
    mockDishService.getAll.mockReturnValue(true);
    const result = await business.getAll();

    expect(result).toBe(true);
  });

  test("if list dishes with quantity superior or equal to 1 not Ok", async () => {
    mockDishService.getAllPositiveQuantity.mockReturnValue(true);
    const result = await business.getAllPositiveQuantity();
    expect(result).toBe(true);
  });
});
