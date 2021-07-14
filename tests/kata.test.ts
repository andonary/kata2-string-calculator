import {Entry, stringCalculator} from "../index";

describe('String calculator', () => {
    let input: string;
    let result: number;

    beforeEach(() => {
        input = '';
        result = NaN;
    });

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

    test('with 10,11 I should get 21', async () => {
        // Arrange
        input = '10,11';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(21);
    });

    test('with 1,2,3 I should get 6', async () => {
        // Arrange
        input = '1,2,3';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(6);
    });

    test('with 1,2\\n3 I should get 6', async () => {
        // Arrange
        input = '1,2\\n3';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(6);
    });

    test('with 1,2, I should get an error', async () => {
        // Arrange
        input = '1,2,';

        // Act
        const act = () => actStringCalculator();

        //Assert
        expect(act).toThrow(Entry.invalid);
    });
});
