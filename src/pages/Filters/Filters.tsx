// default button filter
const defaultFilter = (
    typeFilter: string,
    characterFilter: string,
    setTypeFilter: (value: (((prevState: string) => string) | string)) => void,
    updateFilter: (value: string) => void) => {

    return(
        <button
            type="button"
            className="btn filter"
            aria-pressed={typeFilter===characterFilter}
            onClick={() => {setTypeFilter(characterFilter); updateFilter(characterFilter);}}
        >
            <span>{characterFilter}</span>

        </button>
    )
};

const Filters = {
    defaultFilter,
};

export default Filters;