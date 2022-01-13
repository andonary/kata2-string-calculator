import {Add} from "../src/add";

describe('String Calculator', () => {
    test.each([
        {
            numberString: "",
            expectedResult: 0
        },
        {
            numberString: "1",
            expectedResult: 1
        },
        {
            numberString: "0,0",
            expectedResult: 0
        },
        {
            numberString: "0,1",
            expectedResult: 1
        },
        {
            numberString: "0,1,1",
            expectedResult: 2
        },
        {
            numberString: "0,1\n1",
            expectedResult: 2
        }
    ])('it should return an integer of my string', (cases) => {
        // Arrange
        const {numberString, expectedResult} = cases;

        // Act
        const result: number = Add(numberString);

        // Assert
        expect(result).toEqual(expectedResult);
    });
});
