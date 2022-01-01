import {Add} from "../src/add";

describe('String Calculator Kata2', () => {
    test.each([
        {
            stringNumber: "",
            expectedResult: 0
        },
        {
            stringNumber: "1",
            expectedResult: 1
        },
        {
            stringNumber: "1,0",
            expectedResult: 1
        },
        {
            stringNumber: "1,1",
            expectedResult: 2
        },
        {
            stringNumber: "1,1,1",
            expectedResult: 3
        },
        {
            stringNumber: "1,1,1\\n0",
            expectedResult: 3
        },
        {
            stringNumber: "1,1,1\\n0,",
            expectedResult: NaN,
            hasError: true
        },
        {
            stringNumber: "1,1,1,\\n0",
            expectedResult: NaN,
            hasError: true
        },
        {
            stringNumber: "//;\\n1;1;1\\n0",
            expectedResult: 3,
        }
    ])(`it should add "$stringNumber" and converted it into $expectedResult`, async (cases) => {
        // Arrange
        const {stringNumber, expectedResult, hasError} = cases;

        // Act
        const act = () => Add(stringNumber);

        // Assert
        if (hasError) expect(() => act()).toThrow();
        else expect(act()).toEqual(expectedResult);
    });
});
