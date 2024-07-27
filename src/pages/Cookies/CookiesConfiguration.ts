// Function to set a cookie
const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

// Function to get a cookie value by name
const getCookie = (name) => {
    const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));

    return cookies ? cookies.split("=")[1] : null;
};

// Function to delete a cookie by name
const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const CookiesConfiguration = {
    setCookie,
    deleteCookie,
    getCookie,
};

export default CookiesConfiguration;