import DateFunction from "./DateFunctions.ts";
import DateFunctions from "./DateFunctions.ts";

const SetDefaultChecked = (taskDate: string, achievement: number[]) => {
    const actualDate: string = new Date().toLocaleString();

    // convert string date to more compressed date format
    const dicActualDate= DateFunction.sortDate(actualDate);
    const dicTaskDate = DateFunctions.sortDate(taskDate);

    // convert from dicActualDate several variables with day, month, year ex : 25, 11 and 24
    const dayActualDate: number = DateFunction.convertDicToNumber(dicActualDate, 0, 1);
    const monthActualDate: number = DateFunction.convertDicToNumber(dicActualDate, 2, 3);
    const yearActualDate: number = DateFunction.convertDicToNumber(dicActualDate, 6, 7);

    // same process but for the task date
    const dayTask: number = DateFunction.convertDicToNumber(dicTaskDate, 0, 1);
    const monthTask: number = DateFunction.convertDicToNumber(dicTaskDate, 2, 3);
    const yearTask: number = DateFunction.convertDicToNumber(dicTaskDate, 6, 7);

    // test if the year of the actual day is a leap year : if yes
    if(DateFunction.testLeapYear(yearActualDate)) {
        // then its possible to have the number of days from 1st january (with the actual date)
        const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 1);

        // if the task is from the same year of the day then
        if(yearActualDate === yearTask) {
            // number of days from 1st january
            const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 1);

            const difference = numberDay - numberDayTask;

            // if the difference (in terms of days)is = 0 (same day), 1 (next day), 3 (to continue), etc
            return DateFunction.setParameterCorresponding(difference, achievement, 2);
        }

        // if the taskYear is not the same of the actual date
        else {
            return DateFunction.setBooleanDefaultCheckedDifferentYear(yearActualDate, dayTask, monthTask, numberDay, yearTask, achievement);
        }
    }

    // if the actual year isn't a leap year and same process
    else {
        const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 0);
        if(yearActualDate === yearTask) {
            const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 0);
            const difference = numberDay - numberDayTask;
            console.log(difference);
            return DateFunction.setParameterCorresponding(difference, achievement, 2);
        }
        else {
            return DateFunction.setBooleanDefaultCheckedDifferentYear(yearActualDate, dayTask, monthTask, numberDay, yearTask, achievement);
        }
    }
};

const taskSetAchievement = (taskDate: string, achievement: number[]) => {
    const actualDate: string = new Date().toLocaleString();

    // convert string date to more compressed date format
    const dicActualDate= DateFunction.sortDate(actualDate);
    const dicTaskDate = DateFunctions.sortDate(taskDate);

    // convert from dicActualDate several variables with day, month, year ex : 25, 11 and 24
    const dayActualDate: number = DateFunction.convertDicToNumber(dicActualDate, 0, 1);
    const monthActualDate: number = DateFunction.convertDicToNumber(dicActualDate, 2, 3);
    const yearActualDate: number = DateFunction.convertDicToNumber(dicActualDate, 6, 7);

    // same process but for the task date
    const dayTask: number = DateFunction.convertDicToNumber(dicTaskDate, 0, 1);
    const monthTask: number = DateFunction.convertDicToNumber(dicTaskDate, 2, 3);
    const yearTask: number = DateFunction.convertDicToNumber(dicTaskDate, 6, 7);

    // test if the year of the actual day is a leap year : if yes
    if(DateFunction.testLeapYear(yearActualDate)) {
        // then its possible to have the number of days from 1st january (with the actual date)
        const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 1);

        // if the task is from the same year of the day then
        if(yearActualDate === yearTask) {
            // number of days from 1st january
            const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 1);

            const difference = numberDay - numberDayTask;

            // if the difference (in terms of days)is = 0 (same day), 1 (next day), 3 (to continue), etc
            return DateFunction.setParameterCorresponding(difference, achievement, 1);
        }

        // if the taskYear is not the same of the actual date
        else {
            return DateFunction.setBooleanAchievementDifferentYear(yearActualDate, dayTask, monthTask, numberDay, yearTask, achievement);
        }
    }

    // if the actual year isn't a leap year and same process
    else {
        const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 0);
        if(yearActualDate === yearTask) {
            const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 0);
            const difference = numberDay - numberDayTask;
            console.log(difference);
            return DateFunction.setParameterCorresponding(difference, achievement, 1);
        }
        else {
            return DateFunction.setBooleanAchievementDifferentYear(yearActualDate, dayTask, monthTask, numberDay, yearTask, achievement);
        }
    }
};

const SetAchievement = {
    SetDefaultChecked,
    taskSetAchievement,
};

export default SetAchievement;