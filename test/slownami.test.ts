import { slownami } from "../index";

describe("slownami", () => {
  it("should execute the function and return its result", async () => {
    const result = await slownami(() => 42, "testFunction", 100);
    expect(result).toBe(42);
  });

  it("should log a warning if the function exceeds the threshold", async () => {
    const mockLogger = jest.fn();
    await slownami(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
      },
      "slowFunction",
      100,
      mockLogger
    );
    expect(mockLogger).toHaveBeenCalledWith(
      expect.stringContaining("[slownami] slowFunction took")
    );
  });

  it("should not log a warning if the function is within the threshold", async () => {
    const mockLogger = jest.fn();
    await slownami(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      },
      "fastFunction",
      100,
      mockLogger
    );
    expect(mockLogger).not.toHaveBeenCalled();
  });
});
