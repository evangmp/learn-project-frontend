import {DateType, ListTask} from "../types/task.ts";
import DateFunction from "./DateFunctions.ts";
import DateFunctions from "./DateFunctions.ts";
import TypeBase from "../components/TypeBase.ts";

const DateTypeCalculation = (allTheTask: Array<ListTask>) => {
    const DateTable: DateType = TypeBase.DateBase();

    const dateDay: string[] = DateFunction.sortDate(new Date().toLocaleString());

    const dayActualDate: number = DateFunction.convertDicToNumber(dateDay, 0, 1);
    const monthActualDate: number = DateFunction.convertDicToNumber(dateDay, 2, 3);
    const yearActualDate: number = DateFunction.convertDicToNumber(dateDay, 6, 7);

    for (let i = 0; i < allTheTask.length; i++) {
        DateTable.taskIndex.push(i);
        DateTable.taskAchievement.push(allTheTask[i].taskAchievement);
        DateTable.late.push(false);

        const dateTask: string[] = DateFunctions.sortDate(allTheTask[i].taskDate);

        const dayTask: number = DateFunction.convertDicToNumber(dateTask, 0, 1);
        const monthTask: number = DateFunction.convertDicToNumber(dateTask, 2, 3);
        const yearTask: number = DateFunction.convertDicToNumber(dateTask, 6, 7);

        // test if the year of the actual day is a leap year : if yes
        if(DateFunction.testLeapYear(yearActualDate)) {
            // then it's possible to have the number of days from 1st january (with the actual date)
            const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 1);

            // if the task is from the same year of the day then
            if(yearActualDate === yearTask) {
                // number of days from 1st january
                const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 1);

                const difference = Math.abs(numberDay - numberDayTask);
                DateTable.difference.push(difference);

                const taskIndexAndState: [boolean, number] = DateFunction.taskAchievementIndex(difference, allTheTask[i].taskAchievement);

                DateTable.defaultChecked.push(taskIndexAndState[0]);
                DateTable.taskAchievementIndex.push(taskIndexAndState[1]);
            }

            // if the taskYear is not the same of the actual date
            else {
                const difference: number = Math.abs(DateFunction.DifferentYearDifference(yearActualDate, dayTask, monthTask, numberDay, yearTask));
                DateTable.difference.push(difference);

                const taskIndexAndState: [boolean, number] = DateFunction.taskAchievementIndex(difference, allTheTask[i].taskAchievement);

                DateTable.defaultChecked.push(taskIndexAndState[0]);
                DateTable.taskAchievementIndex.push(taskIndexAndState[1]);
            }
        }

        // if the actual year isn't a leap year and same process
        else {
            const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 0);
            if(yearActualDate === yearTask) {

                const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 0);
                const difference = Math.abs(numberDay - numberDayTask);
                DateTable.difference.push(difference);

                const taskIndexAndState: [boolean, number] = DateFunction.taskAchievementIndex(difference, allTheTask[i].taskAchievement);

                DateTable.defaultChecked.push(taskIndexAndState[0]);
                DateTable.taskAchievementIndex.push(taskIndexAndState[1]);
            }
            else {
                const difference: number = Math.abs(DateFunction.DifferentYearDifference(yearActualDate, dayTask, monthTask, numberDay, yearTask));
                DateTable.difference.push(difference);

                const taskIndexAndState: [boolean, number] = DateFunction.taskAchievementIndex(difference, allTheTask[i].taskAchievement);

                DateTable.defaultChecked.push(taskIndexAndState[0]);
                DateTable.taskAchievementIndex.push(taskIndexAndState[1]);            }
            }
    }

    return DateTable;
};

export default DateTypeCalculation;