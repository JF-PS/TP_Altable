const mockSeatingPlanService = require("../mock/SeatingPlanRepository.mock");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const seatingPlanBusiness = require("../business/seatingPlans.business");
const seatingController = require("../controllers/seatingPlans.controller");
const business = seatingPlanBusiness(mockSeatingPlanService);
const controller = seatingController(business);

jest.mock("../mock/SeatingPlanRepository.mock", () => ({
  getNbNumTable: jest.fn(),
  createSeatingPlan: jest.fn(),
  addTableToSeatingPlan: jest.fn(),
  getSeatingPlanById: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Check SeatingPlans Business", () => {
  test("if create seatingPlans Ok", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        listeTables: [
          {
            numTable: 1,
            nbGuests: 1,
          },
        ],
      },
    });
    const res = mockResponse();

    mockSeatingPlanService.getNbNumTable.mockReturnValue(1);
    mockSeatingPlanService.createSeatingPlan.mockReturnValue(true);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ seatingPlan: true });
    expect(mockSeatingPlanService.createSeatingPlan).toHaveBeenCalledTimes(1);
  });

  test("if numTable don't exist", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        listeTables: [
          {
            numTable: 1,
            nbGuests: 1,
          },
        ],
      },
    });
    const res = mockResponse();

    mockSeatingPlanService.getNbNumTable.mockReturnValue(0);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      message: "You gave a non-existent table number",
    });
  });
});
