import {stringCalculator} from "../index";
import {Entry} from "../errors/entry";

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

    test('with //;\\n1;3 I should get 4', async () => {
        // Arrange
        input = '//;\\n1;3';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(4);
    });

    test('with //sep\\n2sep5sep I should get an error', async () => {
        // Arrange
        input = '//sep\\n2sep5sep';

        // Act
        const act = () => actStringCalculator();

        //Assert
        expect(act).toThrow(Entry.invalid);
    });

    test('with //|\\n1|2,3 I should get an error', async () => {
        // Arrange
        input = '//|\\n1|2,3';

        // Act
        const act = () => actStringCalculator();

        //Assert
        expect(act).toThrow('| expected but "," found at position 3');
    });

    test('with 1,-2 I should get an error', async () => {
        // Arrange
        input = '1,-2';

        // Act
        const act = () => actStringCalculator();

        //Assert
        expect(act).toThrow('Negative number(s) not allowed: -2');
    });

    test('with 2,-4,-9 I should get an error', async () => {
        // Arrange
        input = '2,-4,-9';

        // Act
        const act = () => actStringCalculator();

        //Assert
        expect(act).toThrow('Negative number(s) not allowed: -4, -9');
    });

    test('with //|\\n1|2,-3 I should get multiple line error', async () => {
        // Arrange
        input = '//|\\n1|2,-3';

        // Act
        const act = () => actStringCalculator();

        //Assert
        expect(act).toThrow('Negative number(s) not allowed: -3\\n| expected but "," found at position 3')
    });

    test('with 2,1001 I should get 2 since big number are ignored', async () => {
        // Arrange
        input = '2,1001';

        // Act
        actStringCalculator();

        //Assert
        expect(result).toEqual(2);
    });
});
