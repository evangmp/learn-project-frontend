import {Task} from "../../types/Task.ts";

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
const convertDicToNumber = (dicActual: any, first: number, second: number) => { // problem
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
            return (numberDay + 273+ leapYear); // october (31)
        case 11:
            return (numberDay + 304+ leapYear); // november (30)
        case 12:
            return (numberDay + 334+ leapYear); // december (31)
    }
};

// if the difference between the actual day and the day of the task is interesting
const boolForTaksOrNo = (difference: number) => {
    const dayWhereTaskAppear = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];
    for(let i = 0; i<dayWhereTaskAppear.length; i++) {
        if(dayWhereTaskAppear[i] === difference) {
            return true;
        }
    }
    return false;
};

// condition test for year when is from the task, and difference calculation
const taskYearTest = (yearActualDate: number, dayTask: number, monthTask: number, numberDay: number, yearTask: number) => {
    // if the task year is a leap year or no
    if(testLeapYear(yearActualDate)) {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 1);

        // to have the difference in terms of year(s)
        const difference = numberDay - numberDayTask + ((yearActualDate - yearTask) * 366);

        return boolForTaksOrNo(difference);
    }
    else {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 0);

        // to have the difference in terms of year(s)
        const difference = numberDay - numberDayTask + ((yearActualDate - yearTask) * 365);

        return boolForTaksOrNo(difference);
    }
};

const setAchievement = (difference: number, achievement: number[]) => {
    const dayWhereTaskAppear: number[] = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];
    for(let i: number = 0; i < dayWhereTaskAppear.length; i++) {
        if(dayWhereTaskAppear[i] == difference) {
            if(achievement[i] == 0) {
                achievement[i] = 1;
                return achievement;
            }
            else {
                achievement[i] = 0;
                return achievement;
            }
        }
    }
};

const setBooleanAchievementDifferentYear = (yearActualDate: number, dayTask: number, monthTask: number, numberDay: number, yearTask: number, achievement: number[]) => {
    // if the task year is a leap year or no
    if(testLeapYear(yearActualDate)) {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 1);

        // to have the difference in terms of year(s)
        const difference = numberDay - numberDayTask + ((yearActualDate - yearTask) * 366);
        return setAchievement(difference, achievement);
    }
    else {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 0);

        // to have the difference in terms of year(s)
        const difference = numberDay - numberDayTask + ((yearActualDate - yearTask) * 365);
        return setAchievement(difference, achievement);
    }
}

const setBooleanDefaultChecked = (difference: number, achievement: number[]) => {
    const dayWhereTaskAppear = [0, 1, 3, 7, 14, 30, 60, 120, 240, 360];
    for(let i = 0; i<dayWhereTaskAppear.length; i++) {
        if(dayWhereTaskAppear[i] === difference) {
            if(achievement[i] == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    return;
};

const setBooleanDefaultCheckedDifferentYear = (yearActualDate: number, dayTask: number, monthTask: number, numberDay: number, yearTask: number, achievement: number[]) => {
    // if the task year is a leap year or no
    if(testLeapYear(yearActualDate)) {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 1);

        // to have the difference in terms of year(s)
        const difference = numberDay - numberDayTask + ((yearActualDate - yearTask) * 366);
        return setBooleanDefaultChecked(difference, achievement);
    }
    else {
        // number of days from 1st january
        const numberDayTask = switchToLenghtYear(dayTask, monthTask, 0);

        // to have the difference in terms of year(s)
        const difference = numberDay - numberDayTask + ((yearActualDate - yearTask) * 365);
        return setBooleanDefaultChecked(difference, achievement);
    }
};

const DateIdea = (task: Task, dateDay: Date) => {
    // convert string date to more compressed date format
    const dicActualDate= sortDate(dateDay.toLocaleDateString());
    const dicTaskDate = sortDate(task.taskDate);

    // convert from dicActualDate several variables with day, month, year ex : 25, 11 and 24
    const dayActualDate: number = convertDicToNumber(dicActualDate, 0, 1);
    const monthActualDate: number = convertDicToNumber(dicActualDate, 2, 3);
    const yearActualDate: number = convertDicToNumber(dicActualDate, 6, 7);

    // same process but for the task date
    const dayTask: number = convertDicToNumber(dicTaskDate, 0, 1);
    const monthTask: number = convertDicToNumber(dicTaskDate, 2, 3);
    const yearTask: number = convertDicToNumber(dicTaskDate, 6, 7);

    // test if the year of the actual day is a leap year : if yes
    if(testLeapYear(yearActualDate)) {
        // then its possible to have the number of days from 1st january (with the actual date)
        const numberDay = switchToLenghtYear(dayActualDate, monthActualDate, 1);

        // if the task is from the same year of the day then
        if(yearActualDate === yearTask) {
            // number of days from 1st january
            const numberDayTask = switchToLenghtYear(dayTask, monthTask, 1);

            const difference = numberDay - numberDayTask;
            console.log(difference);

            // if the difference (in terms of days)is = 0 (same day), 1 (next day), 3 (to continue), etc
            return boolForTaksOrNo(difference);
        }

        // if the taskYear is not the same of the actual date
        else {
            return taskYearTest(yearActualDate, dayTask, monthTask, numberDay, yearTask);
        }
    }

    // if the actual year isn't a leap year and same process
    else {
        const numberDay = switchToLenghtYear(dayActualDate, monthActualDate, 0);
        if(yearActualDate === yearTask) {
            const numberDayTask = switchToLenghtYear(dayTask, monthTask, 0);
            const difference = numberDay - numberDayTask;
            console.log(difference);
            return boolForTaksOrNo(difference);
        }
        else {
            return taskYearTest(yearActualDate, dayTask, monthTask, numberDay, yearTask);
        }
    }
};

const DateFunction = {
    DateIdea,
    sortDate,
    convertDicToNumber,
    testLeapYear,
    switchToLenghtYear,
    boolForTaksOrNo,
    taskYearTest,
    setAchievement,
    setBooleanDefaultChecked,
    setBooleanDefaultCheckedDifferentYear,
    setBooleanAchievementDifferentYear,
};

export default DateFunction;