import {Add} from "../src/add";

describe('Add string calculator', () => {
    test.each([
        {
            itMsg: "should add nothing if user ask nothing",
            stringNumbers: "",
            expectedResult: 0
        },
        {
            itMsg: "should add the only number given",
            stringNumbers: "1",
            expectedResult: 1
        },
        {
            itMsg: "should add the two numbers given",
            stringNumbers: "1,0",
            expectedResult: 1
        },
        {
            itMsg: "should add the only number given",
            stringNumbers: "10",
            expectedResult: 10
        },
        {
            itMsg: "should add the two numbers given",
            stringNumbers: "10,1",
            expectedResult: 11
        },
        {
            itMsg: "should add the three numbers given",
            stringNumbers: "10,1,1",
            expectedResult: 12
        },
        {
            itMsg: "should handle newlines as separators",
            stringNumbers: "1,2\n3",
            expectedResult: 6
        },
        {
            itMsg: "should handle two newlines as separators",
            stringNumbers: "1,2\n3\n1",
            expectedResult: 7
        },
        {
            itMsg: "should not allow error in user input",
            stringNumbers: "1,2,",
            expectedError: true
        },
        {
            itMsg: "should handle the new delimiter if given",
            stringNumbers: "//;\n1;3",
            expectedResult: 4
        },
        {
            itMsg: "should handle the new delimiter if given but not allow if another is found",
            stringNumbers: "//|\n5|6,7",
            expectedError: true
        }
    ])('it $itMsg', (cases) => {
        // Arrange
        const {stringNumbers, expectedResult, expectedError} = cases;

        // Act
        const result: number = expectedError ? NaN : Add(stringNumbers);

        // Assert
        if (expectedError) expect(() => Add(stringNumbers)).toThrow();
        else expect(result).toEqual(expectedResult);
    });
});
