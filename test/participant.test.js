const mockParticipantService = require("../mock/ParticipantRepository.mock");
jest.mock("../mock/ParticipantRepository.mock", () => ({
  create: jest.fn(),
}));

const participantBuisness = require("../buisness/participants.business");
const buisness = participantBuisness(mockParticipantService);

afterEach(() => {
  jest.clearAllMocks();
});

describe("Check Participant Business ", () => {
  test("if create Participant Ok", async () => {
    // Arrange
    mockParticipantService.create.mockReturnValue(true);
    const result = await buisness.create({ name: "MorganeT2", nb_points: 2 });

    // Assert
    expect(result).toBe(true);
  });
});
