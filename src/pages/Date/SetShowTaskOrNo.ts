import {Task} from "../../types/task.ts";
import DateFunction from "./DateFunctions.tsx";

const SetShowTaskOrNo = (task: Task, dateDay: Date) => {
    // convert string date to more compressed date format
    const dicActualDate= DateFunction.sortDate(dateDay.toLocaleDateString());
    const dicTaskDate = DateFunction.sortDate(task.taskDate);

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
            // console.log(difference);

            // if the difference (in terms of days)is = 0 (same day), 1 (next day), 3 (to continue), etc
            return DateFunction.boolForTaksOrNo(difference);
        }

        // if the taskYear is not the same of the actual date
        else {
            return DateFunction.taskYearTest(yearActualDate, dayTask, monthTask, numberDay, yearTask);
        }
    }

    // if the actual year isn't a leap year and same process
    else {
        const numberDay = DateFunction.switchToLenghtYear(dayActualDate, monthActualDate, 0);
        if(yearActualDate === yearTask) {
            const numberDayTask = DateFunction.switchToLenghtYear(dayTask, monthTask, 0);
            const difference = numberDay - numberDayTask;
            // console.log(difference);
            return DateFunction.boolForTaksOrNo(difference);
        }
        else {
            return DateFunction.taskYearTest(yearActualDate, dayTask, monthTask, numberDay, yearTask);
        }
    }
};

const CentralSetShowTaskOrNo = {
    SetShowTaskOrNo,
};

export default CentralSetShowTaskOrNo;