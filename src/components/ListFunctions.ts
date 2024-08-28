const sortNumber = (list: number[]) => {
    return list.sort(function(a, b) {return a - b;});
};

const checkIsPresent = (list: number[], value: number) => {
    for(let i =0; i < list.length; i++) {
        if(list[i] === value) {
            return true;
        }
    }
    return false;
};

const checkIsPresentString = (list: string[], value: string) => {
    for(let i =0; i < list.length; i++) {
        if(list[i] === value) {
            return true;
        }
    }
    return false;
}

const ListFunctions = {
    sortNumber,
    checkIsPresent,
    checkIsPresentString,
};

export default ListFunctions;