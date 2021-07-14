import {stringCalculator} from "../index";

describe('String calculator', () => {
    let input: string;
    let result: number;

    const actStringCalculator = () => {
        result = stringCalculator(input);
    }

    test('with no input I should get zero', async () => {
        // Arrange
        input = '';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(0);
    });

    test('with 1 I should get 1', async () => {
        // Arrange
        input = '1';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(1);
    });

    test('with 2 I should get 2', async () => {
        // Arrange
        input = '2';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(2);
    });

    test('with 1,2 I should get 3', async () => {
        // Arrange
        input = '1,2';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(3);
    });
});
