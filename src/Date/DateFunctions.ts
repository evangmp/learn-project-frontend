// to convert a full string date to a more compressed date
const sortDate = (dateToSort: string) => {
    const dictDate = [];

    for (let i=0; i < 10; i++) {
        if(dateToSort[i] !== "/" && dateToSort[i] !== ",") {
            dictDate.push(dateToSort[i]);
        }
    }
    return dictDate;
};

// from a dictionary, extract a first number and a second, or just a number (for 1 to 9 and after 10 to 12 or 30, etc)
const convertDicToNumber = (dicActual: string[], first: number, second: number) => { // problem
    if(Number(dicActual[first])===0) {
        return Number(dicActual[second])
    }
    const firstNumber: string = dicActual[first];
    const secondNumber: string = firstNumber.concat("", dicActual[second]);
    return Number(secondNumber);
};

// boolean test if it is a leap year or no
const testLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

};

// date type XX/YY to the number of days since 1st january (with leap year case)
const switchToLenghtYear = (numberDay: number, numberMonth: number, leapYear: number) => {
    switch (numberMonth) {
        case 1:
            return numberDay; // january (31)
        case 2:
            return (numberDay + 31); // february (28) or (29)
        case 3:
            return (numberDay + 59 + leapYear); // march (31)
        case 4:
            return (numberDay + 90 + leapYear); // april (30)
        case 5:
            return (numberDay + 120 + leapYear); // may (31)
        case 6:
            return (numberDay + 151 + leapYear); // june (30)
        case 7:
            return (numberDay + 181 + leapYear); // july (31)
        case 8:
            return (numberDay + 212 + leapYear); // august (31)
        case 9:
            return (numberDay + 243 + leapYear); // september (30)
        case 10:
            return (numberDay + 273 + leapYear); // october (31)
        case 11:
            return (numberDay + 304 + leapYear); // november (30)
        case 12:
            return (numberDay + 334 + leapYear); // december (31)
    }
    return 0; // will never be reach but React
};

// condition test for year when is from the task, and difference calculation
const DifferentYearDifference = (yearActualDate: number, dayTask: number, monthTask: number, numberDay: number, yearTask: number) => {
    // if the task year is a leap year or no
    if(testLeapYear(yearActualDate)) {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 1);

        // to have the difference in terms of year(s)
            return numberDay - numberDayTask + ((yearActualDate - yearTask) * 366);
    }
    else {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 0);

        // to have the difference in terms of year(s)
        return numberDay - numberDayTask + ((yearActualDate - yearTask) * 365);
    }
};

// to have : if task needs to be show and the index in his taskAchievement table
const taskAchievementIndex = (difference: number, taskAchievement: number[]) => {
    const dayWhereTaskAppear: number[] = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];
    for(let i: number = 0; i < dayWhereTaskAppear.length; i++) {
        if(dayWhereTaskAppear[i] === difference) {
            if(taskAchievement[i] == 0) {
                return ([false, i]);
            }
            else {
                return ([true, i]);
            }
        }
    }
    return [false, -100 - Math.random()];
};

const DateFunction = {
    sortDate,
    convertDicToNumber,
    testLeapYear,
    switchToLenghtYear,
    taskAchievementIndex,
    DifferentYearDifference,
};

export default DateFunction;