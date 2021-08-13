const units = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
};

const dozens = {
    10: "ten",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
};

const roundNumber = (number, round) => Math.floor(number / round) * round;

module.exports = function toReadable(number) {
    const numberToString = String(number);
    if (number >= 0 && number < 20) {
        return units[number];
    }

    if (number >= 20 && number < 100) {
        const isUnits = number % 10 !== 0;
        if (numberToString[1] === "0") {
            return dozens[number];
        } else if (isUnits) {
            const rounded = roundNumber(number, 10);
            const currentDozens = dozens[rounded];
            const currentUnits = units[number % 10];

            return `${currentDozens} ${currentUnits}`;
        }
    }

    if (number >= 100 && number <= 999) {
        const roundedDividedByHundred = Math.floor(number / 100);
        const rounded = roundedDividedByHundred * 100;
        const roundedToTens = roundNumber(number - rounded, 10);

        const hundreds = units[roundedDividedByHundred];
        const dozToTwenty = units[number - rounded];
        const dozZero = dozens[number - rounded];
        const dozAfterTwenty = dozens[roundedToTens];
        const unitsAfterTwenty = units[number - rounded - roundedToTens];

        const numberDozens = numberToString[1];
        const numberUnits = numberToString[2];

        const isUnitsEqualToZero = numberUnits === "0";
        const isDozUnitsEqualToZero =
            numberDozens === "0" && isUnitsEqualToZero;
        const isDozUnitLessTwenty = numberDozens + numberUnits < 20;

        if (isDozUnitsEqualToZero) {
            return `${hundreds} hundred`;
        } else if (isUnitsEqualToZero) {
            return `${hundreds} hundred ${dozZero}`;
        } else if (isDozUnitLessTwenty) {
            return `${hundreds} hundred ${dozToTwenty}`;
        } else {
            return `${hundreds} hundred ${dozAfterTwenty} ${unitsAfterTwenty}`;
        }
    }
};
