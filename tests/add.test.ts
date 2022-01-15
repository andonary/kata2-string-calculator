import {Add} from "../src/add";

describe('Add String Calculator', () => {
    test.each([
        {
            itMsg: "it should add nothing if I ask nothing",
            myNumbers: "",
            expectedResult: 0
        },
        {
            itMsg: "it should add my sole number and give me that",
            myNumbers: "1",
            expectedResult: 1
        },
        {
            itMsg: "it should add my two numbers",
            myNumbers: "1,0",
            expectedResult: 1
        },
        {
            itMsg: "it should add my two numbers",
            myNumbers: "1,1",
            expectedResult: 2
        },
        {
            itMsg: "it should add my three numbers",
            myNumbers: "1,1,1",
            expectedResult: 3
        },
        {
            itMsg: "it should add my numbers seperated by new lines",
            myNumbers: "1,2\n3",
            expectedResult: 6
        },
        {
            itMsg: "it should add my numbers seperated by new lines",
            myNumbers: "1,2\n3\n2",
            expectedResult: 8
        },
        {
            itMsg: "it should validate user input",
            myNumbers: "1,2,",
            expectedError: true
        },
        {
            itMsg: "it should validate user input",
            myNumbers: "1,2,\n3",
            expectedError: true
        },
        {
            itMsg: "it should change separator on demand",
            myNumbers: "//;\n1;2",
            expectedResult: 3
        },
        {
            itMsg: "it should change separator on demand and validate user input",
            myNumbers: "//sep\n1sep2,3",
            expectedError: true
        }
    ])('$itMsg', (cases) => {
        // Arrange
        const {myNumbers, expectedResult, expectedError} = cases;

        // Act
        const result: number = expectedError ? 0 : Add(myNumbers);

        // Assert
        if (expectedError) expect(() => Add(myNumbers)).toThrow();
        else expect(result).toEqual(expectedResult);
    });
});
