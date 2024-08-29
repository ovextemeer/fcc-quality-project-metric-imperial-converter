const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('convertHandler should correctly read input', function () {
        test('whole number input', function () {
            let input = '4gal';
            assert.strictEqual(
                convertHandler.getNum(input), 4, 'convertHandler correctly read whole number input'
            );
        });

        test('decimal number input', function () {
            let input = '4.2gal';
            assert.strictEqual(
                convertHandler.getNum(input), 4.2, 'convertHandler correctly read decimal number input'
            );
        });

        test('fractional input', function () {
            let input = '4/5gal';
            assert.strictEqual(
                convertHandler.getNum(input), 4 / 5, 'convertHandler correctly read fractional input'
            );
        });

        test('fractional input with a decimal', function () {
            let input = '5.4/3lbs';
            assert.strictEqual(
                convertHandler.getNum(input), 5.4 / 3, 'convertHandler correctly read fractional input with a decimal'
            );
        });

        test('error on a double-fraction', function () {
            let input = '3/2/3L';
            assert.instanceOf(
                convertHandler.getNum(input),
                Error,
                'correctly returned an error on a double-fraction'
            );
        });

        test('default to a numerical input of 1', function () {
            let input = 'lbs';
            assert.strictEqual(
                convertHandler.getNum(input),
                1,
                'convertHandler correctly defaulted to a numerical input of 1 when no numerical input is provided'
            );
        });
    });

    suite('convertHandler should correctly read unit', function () {
        let validUnits = [
            'gal', 'Gal', 'gAl', 'gaL', 'GAl', 'gAL', 'GaL', 'GAL',
            'l', 'L',
            'mi', 'Mi', 'mI', 'MI',
            'km', 'Km', 'kM', 'KM',
            'lbs', 'Lbs', 'lBs', 'lbS', 'LBs', 'lBS', 'LbS', 'LBS',
            'kg', 'Kg', 'kG', 'KG'
        ];

        test('valid input unit', function () {
            let units = [
                'gal', 'Gal', 'gAl', 'gaL', 'GAl', 'gAL', 'GaL', 'GAL',
                'l', 'L',
                'mi', 'Mi', 'mI', 'MI',
                'km', 'Km', 'kM', 'KM',
                'lbs', 'Lbs', 'lBs', 'lbS', 'LBs', 'lBS', 'LbS', 'LBS',
                'kg', 'Kg', 'kG', 'KG'
            ];
            units.forEach(unit => {
                assert.include(
                    validUnits,
                    convertHandler.getUnit(unit),
                    'convertHandler correctly read each valid input unit'
                );
            });
        });

        test(' error for an invalid input unit', function () {
            let unit = 'ga';
            assert.instanceOf(
                convertHandler.getUnit(unit),
                Error,
                'convertHandler correctly returned an error for an invalid input unit'
            );
        });

        test('correct return unit', function () {
            let validReturnUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            validUnits.forEach(vUnit => {
                assert.include(
                    validReturnUnits,
                    convertHandler.getReturnUnit(vUnit),
                    'convertHandler returned the correct return unit for each valid input unit'
                );
            });
        });

        test('spelled-out string unit', function () {
            let spelledOutStringUnits = [
                'gallons',
                'liters',
                'miles',
                'kilometers',
                'pounds',
                'kilograms'
            ];
            validUnits.forEach(vUnit => {
                assert.include(
                    spelledOutStringUnits,
                    convertHandler.spellOutUnit(vUnit),
                    'convertHandler correctly returned the spelled-out string unit for each valid input unit'
                );
            });
        });
    });

    suite('convertHandler correctly convert', function () {
        test('convert gal to L', function () {
            let input = [2, 'gal'];
            assert.equal(
                convertHandler.convert(...input),
                7.57082,
                'convertHandler correctly converted gal to L'
            );
        });

        test('convert L to gal', function () {
            let input = [2, 'L'];
            assert.equal(
                convertHandler.convert(...input),
                0.52834,
                'convertHandler correctly converted L to gal'
            );
        });

        test('convert mi to km', function () {
            let input = [2, 'mi'];
            assert.equal(
                convertHandler.convert(...input),
                3.21868,
                'convertHandler correctly converted mi to km'
            );
        });

        test('convert km to mi', function () {
            let input = [2, 'km'];
            assert.equal(
                convertHandler.convert(...input),
                1.24275,
                'convertHandler correctly converted km to mi'
            );
        });

        test('convert lbs to kg', function () {
            let input = [2, 'lbs'];
            assert.equal(
                convertHandler.convert(...input),
                0.90718,
                'convertHandler correctly converted lbs to kg'
            );
        });

        test('convert kg to lbs', function () {
            let input = [2, 'kg'];
            assert.equal(
                convertHandler.convert(...input),
                4.40925,
                'convertHandler correctly converted kg to lbs'
            );
        });
    });
});