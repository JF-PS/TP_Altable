const mockSeatingPlanService = require("../mock/SeatingPlanRepository.mock");
const mockServiceService = require("../mock/ServiceRepository.mock");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

const serviceBusiness = require("../business/services.business");
const serviceController = require("../controllers/services.controller");
const business = serviceBusiness(mockServiceService, mockSeatingPlanService);
const controller = serviceController(business);

jest.mock("../mock/ServiceRepository.mock", () => ({
  checkSchedulePlan: jest.fn(),
  createService: jest.fn(),
  getServiceById: jest.fn(),
}));

jest.mock("../mock/SeatingPlanRepository.mock", () => ({
  updateSeatingPlanFreeze: jest.fn(),
  getSeatingPlanById: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Check Services", () => {
  test("if create Service Ok", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        startDate: "2022-01-01 12:00",
        endDate: "2022-01-01 14:00",
        seatingPlanId: 1,
      },
    });
    const res = mockResponse();
    mockServiceService.checkSchedulePlan.mockReturnValue([]);
    mockSeatingPlanService.getSeatingPlanById.mockReturnValue({
      id: 1,
      freeze: false,
    });
    mockServiceService.createService.mockReturnValue(true);
    mockSeatingPlanService.updateSeatingPlanFreeze.mockReturnValue(true);
    mockServiceService.getServiceById.mockReturnValue(true);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ service: true });
  });

  test("if seating plan already fixed", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        startDate: "2022-01-01 12:00",
        endDate: "2022-01-01 14:00",
        seatingPlanId: 1,
      },
    });
    const res = mockResponse();
    mockServiceService.checkSchedulePlan.mockReturnValue([]);
    mockSeatingPlanService.getSeatingPlanById.mockReturnValue({
      id: 1,
      freeze: true,
    });

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      message: "The seating plan is already fixed !",
    });
  });

  test("if seating plan id not exist", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        startDate: "2022-01-01 12:00",
        endDate: "2022-01-01 14:00",
        seatingPlanId: 54598656,
      },
    });
    const res = mockResponse();
    mockServiceService.checkSchedulePlan.mockReturnValue([]);
    mockSeatingPlanService.getSeatingPlanById.mockReturnValue({});

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      message: "The seating plan id given does not exist !",
    });
  });

  test("if schedule overlap", async () => {
    // Arrange
    const req = mockRequest({
      body: {
        startDate: "2022-01-01 12:00",
        endDate: "2022-01-01 14:00",
        seatingPlanId: 1,
      },
    });
    const res = mockResponse();
    mockServiceService.checkSchedulePlan.mockReturnValue([true]);

    // Act
    await controller.create(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      message: "There is already a plan for this time slot !",
    });
  });
});
