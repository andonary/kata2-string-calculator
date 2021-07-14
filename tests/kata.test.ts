import {stringCalculator} from "../index";

describe('String calculator', () => {
    test('with no input I should get zero', async () => {
        // Arrange


        // Act
        const result: number = stringCalculator('');

        //Assert
        expect(result).toEqual(0);
    });
});
