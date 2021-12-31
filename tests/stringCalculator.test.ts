import {stringCalculator} from "../src/stringCalculator";

describe('String Calculator', () => {
    test.each([
        {
            inputs: "",
            output: 0
        },
        {
            inputs: "1",
            output: 1
        },
        {
            inputs: "2",
            output: 2
        },
        {
            inputs: "1,2",
            output: 3
        },
        {
            inputs: "1,2\\n3",
            output: 6
        },
        {
            inputs: "//;\\n1;2\\n3",
            output: 6
        },
        {
            inputs: "//;\\n2;1\\n3",
            output: 6
        }
    ])('it should convert "$inputs" to $output', async (cases) => {
        // Arrange
        const {inputs, output} = cases;

        // Act
        const result: number = stringCalculator(inputs);

        // Assert
        expect(result).toEqual(output);
    });

    test.each([
        {
            inputs: "1,2,\\n3",
        },
        {
            inputs: "1,3,\\n3",
        }
    ])('it should not work with invalid $inputs', async (cases) => {
        // Arrange
        const {inputs} = cases

        // Act
        const act = () => stringCalculator(inputs);

        // Assert
        expect(act).toThrow();
    });
});
