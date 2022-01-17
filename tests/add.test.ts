import { Add } from "../src/add";

describe("Add string calculator", () => {
  test.each([
    {
      itMsg: "it should add nothing if receive nothing",
      stringNumbers: "",
      expectedResult: 0,
    },
    {
      itMsg: "it should add my sole number",
      stringNumbers: "1",
      expectedResult: 1,
    },
    {
      itMsg: "it should add my two numbers",
      stringNumbers: "1,0",
      expectedResult: 1,
    },
    {
      itMsg: "it should add my two numbers",
      stringNumbers: "1,2",
      expectedResult: 3,
    },
    {
      itMsg: "it should add my two numbers",
      stringNumbers: "10,2",
      expectedResult: 12,
    },
    {
      itMsg: "it should add my three numbers",
      stringNumbers: "10,2,1",
      expectedResult: 13,
    },
    {
      itMsg: "it should add my numbers with new line",
      stringNumbers: "1,2\n3",
      expectedResult: 6,
    },
    {
      itMsg: "it should add my numbers with two new line",
      stringNumbers: "1,2\n3\n3",
      expectedResult: 9,
    },
    {
      itMsg: "it should warn me if I made a mistake in syntax",
      stringNumbers: "1,2,\n3",
      expectedError: true,
    },
    {
      itMsg: "it should change delimiter with the one I inform",
      stringNumbers: "//;\n1;2\n3",
      expectedResult: 6,
    },
  ])("$itMsg", (cases) => {
    // Arrange
    const { stringNumbers, expectedResult, expectedError } = cases;

    // Act
    const result: number = expectedError ? NaN : Add(stringNumbers);

    // Assert
    if (expectedError) expect(() => Add(stringNumbers)).toThrow();
    else expect(result).toEqual(expectedResult);
  });
});
