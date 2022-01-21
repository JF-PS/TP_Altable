const mockServiceService = require("../mock/ServiceRepository.mock");
jest.mock("../mock/ServiceRepository.mock", () => ({
    getByName: jest.fn(),
    create: jest.fn(),
}));

const serviceBusiness = require("../business/services.business");
const business = serviceBusiness(mockServiceService);

afterEach(() => {
    jest.clearAllMocks();
});

describe("Check Service Business ", () => {
    test("if create service Ok", async () => {
        mockServiceService.create.mockReturnValue(true);
        const result = await business.create({
            startDate: "2022-01-21 19:00",
            endDate: "2022-01-21 21:00",
        });

        expect(result.response).toBe(true);
    });

    test("if create service not Ok", async () => {
        const result = await business.create({
            startDate: "2022-01-21 21:00",
            endDate: "2022-01-21 19:00",
        });

        expect(result.response).toBe("Start date can't be superior than end date");
    });
});
