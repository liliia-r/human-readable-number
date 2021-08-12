module.exports = function toReadable(number) {
    const units = {
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

    if (number === 0) {
        return "zero";
    }

    if (number > 0 && number < 20) {
        return units[number];
    }

    if (number >= 20 && number < 100) {
        if (String(number)[1] === "0") {
            return dozens[number];
        } else if (number % 10 !== 0) {
            return (
                dozens[Math.floor(number / 10) * 10] + " " + units[number % 10]
            );
        }
    }

    if (number >= 100 && number <= 999) {
        let hundreds = units[Math.floor(number / 100)];
        let dozToTwenty = units[number - Math.floor(number / 100) * 100];
        let dozZero = dozens[number - Math.floor(number / 100) * 100];
        let dozAfterTwenty =
            dozens[
                Math.floor((number - Math.floor(number / 100) * 100) / 10) * 10
            ];
        let unitsAfterTwenty =
            units[
                number -
                    Math.floor(number / 100) * 100 -
                    Math.floor((number - Math.floor(number / 100) * 100) / 10) *
                        10
            ];

        if (String(number)[1] === "0" && String(number)[2] === "0") {
            return hundreds + " " + "hundred";
        } else if (String(number)[2] === "0") {
            return hundreds + " " + "hundred" + " " + dozZero;
        } else if (String(number)[1] + String(number)[2] < 20) {
            return hundreds + " " + "hundred" + " " + dozToTwenty;
        } else {
            return (
                hundreds +
                " " +
                "hundred" +
                " " +
                dozAfterTwenty +
                " " +
                unitsAfterTwenty
            );
        }
    }
};
