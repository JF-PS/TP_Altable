const mockDishService = require("../mock/DishRepository.mock");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

const dishBusiness = require("../business/dishes.business");
const dishController = require("../controllers/dishes.controller");
const business = dishBusiness(mockDishService);
const controller = dishController(business);

jest.mock("../mock/DishRepository.mock", () => ({
  getByName: jest.fn(),
  create: jest.fn(),
  getAll: jest.fn(),
  updateQuantity: jest.fn(),
  getAllPositiveQuantity: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Check Dish Business", () => {
  test("if create dish Ok", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        name: "Soupe aux légumes",
        description: "description de la soupe",
        type: "Entrée",
        price: 15,
        quantity: 0,
      },
    });
    const res = mockResponse();

    mockDishService.getByName.mockReturnValue(false);
    mockDishService.create.mockReturnValue(true);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ dish: true });
  });

  test("if dish name already exists", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        name: "Soupe aux légumes",
        description: "description de la soupe",
        type: "Entrée",
        price: 15,
        quantity: 0,
      },
    });
    const res = mockResponse();

    mockDishService.getByName.mockReturnValue(true);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      message: "This name already exists",
    });
  });

  test("if type doesn't exists", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        name: "Truc",
        description: "description du truc",
        type: "Bidule",
        price: 25000,
        quantity: 14,
      },
    });
    const res = mockResponse();

    mockDishService.getByName.mockReturnValue(false);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      message: "This type doesn't exists",
    });
  });

  test("update quantity", async () => {
    // Arrange
    const req = mockRequest({
      params: {
        id: 1,
      },
      body: {
        quantity: 10,
      },
    });
    const res = mockResponse();

    mockDishService.updateQuantity.mockReturnValue(true);

    // Act
    await controller.updateQuantity(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      updateQuantity: true,
    });
  });

  test("List dishes", async () => {
    mockDishService.getAll.mockReturnValue(true);
    const result = await business.getAll();

    expect(result).toBe(true);
  });

  test("List dishes with quantity superior or equal to 1", async () => {
    mockDishService.getAllPositiveQuantity.mockReturnValue(true);
    const result = await business.getAllPositiveQuantity();
    expect(result).toBe(true);
  });
});
