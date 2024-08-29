function ConvertHandler() {
  this.getNum = function (input) {
    let index;
    let str;
    let slashIndexes = [];

    for (let i = 0; i < input.length; ++i) {
      if (isForNumber(input.charAt(i))) {
        index = i;
      } else {
        break;
      }
    }

    if (index === undefined) {
      return 1;
    } else {
      str = input.slice(0, index + 1);
    }

    for (let i = 0; i < str.length; ++i) {
      if (str.charAt(i) === '/') {
        slashIndexes.push(i);
      }
    }

    if (slashIndexes.length >= 2) {
      return new Error('invalid number');
    } else if (slashIndexes.length === 1) {
      let firstNum = Number(str.slice(0, slashIndexes[0]));
      let secondNum = Number(str.slice(slashIndexes[0] + 1));

      if (isNaN(firstNum) || isNaN(secondNum)) {
        return new Error('invalid number');
      } else {
        return firstNum / secondNum;
      }
    } else {
      if (isNaN(Number(str))) {
        return new Error('invalid number');
      } else {
        return Number(str);
      }
    }
  };

  this.getUnit = function (input) {
    let str = input.trim().slice(-3);
    let u = returnResultUnit(str);

    if (u instanceof Error) {
      str = input.trim().slice(-1);
      u = returnResultUnit(str);

      if (u instanceof Error) {
        str = input.trim().slice(-2);
        u = returnResultUnit(str);

        if (u instanceof Error) {
          return new Error('invalid unit');
        } else {
          return u;
        }
      } else {
        return u;
      }
    } else {
      return u;
    }
  };

  this.getReturnUnit = function (initUnit) {
    const validReturnUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const correctReturnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

    let unit = returnResultUnit(initUnit);

    if (!(unit instanceof Error)) {
      for (let i = 0; i < validReturnUnits.length; ++i) {
        if (unit.toLowerCase() === validReturnUnits[i].toLowerCase()) {
          return correctReturnUnits[i];
        }
      }
    } else {
      return unit;
    }
  };

  this.spellOutUnit = function (unit) {
    const spelledOutStringUnits = [
      'gallons',
      'liters',
      'miles',
      'kilometers',
      'pounds',
      'kilograms'
    ];
    const validReturnUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

    let u = returnResultUnit(unit);

    if (!(u instanceof Error)) {
      for (let i = 0; i < validReturnUnits.length; ++i) {
        if (u.toLowerCase() === validReturnUnits[i].toLowerCase()) {
          return spelledOutStringUnits[i];
        }
      }
    } else {
      return u;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (this.getReturnUnit(initUnit)) {
      case 'gal':
        return Math.round((initNum / galToL) * 100000) / 100000;
        break;
      case 'L':
        return Math.round((initNum * galToL) * 100000) / 100000;
        break;
      case 'mi':
        return Math.round((initNum / miToKm) * 100000) / 100000;
        break;
      case 'km':
        return Math.round((initNum * miToKm) * 100000) / 100000;
        break;
      case 'lbs':
        return Math.round((initNum / lbsToKg) * 100000) / 100000;
        break;
      case 'kg':
        return Math.round((initNum * lbsToKg) * 100000) / 100000;
        break;
      default:
        new Error('Can not convert');
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let spelledInitUnit = this.spellOutUnit(initUnit);
    let spelledReturnUnit = this.spellOutUnit(returnUnit);

    if (initNum instanceof Error) {
      return initNum;
    } else if (initUnit instanceof Error) {
      return initUnit;
    } else if (returnNum instanceof Error) {
      return returnNum;
    } else if (returnUnit instanceof Error) {
      return returnUnit;
    } else if (spelledInitUnit instanceof Error) {
      return spelledInitUnit;
    } else if (spelledReturnUnit instanceof Error) {
      return spelledReturnUnit;
    } else {
      return `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
    }
  };

}

function extractFirstNum(inputString) {
  let index = 0;
  let numString = '';
  let num;

  if (inputString.charAt(0) == '.') {
    numString = inputString.slice(0, 2);
    ++index;
  } else {
    numString = inputString.charAt(0);
  }
  while (!isNaN(Number(numString)) && index < inputString.length) {
    num = Number(numString);
    ++index;
    numString += inputString.charAt(index);
  }

  return { num: num, index: index };
}

function returnResultUnit(str) {
  const validUnits = [
    'gal', 'Gal', 'gAl', 'gaL', 'GAl', 'gAL', 'GaL', 'GAL',
    'l', 'L',
    'mi', 'Mi', 'mI', 'MI',
    'km', 'Km', 'kM', 'KM',
    'lbs', 'Lbs', 'lBs', 'lbS', 'LBs', 'lBS', 'LbS', 'LBS',
    'kg', 'Kg', 'kG', 'KG'
  ];

  if (validUnits.includes(str)) {
    return (str != 'l' && str != 'L') ? str.toLowerCase() : str.toUpperCase();
  } else {
    return new Error('invalid unit');
  }
}

function isForNumber(char) {
  if ((char >= '0' && char <= '9') || char === '.' || char === '/') {
    return true;
  } else {
    return false;
  }
}

module.exports = ConvertHandler;
