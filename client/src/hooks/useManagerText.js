
export const useManagerText = () => {
    const upperCaseList = (list) => {
        return list.map((string) => string[0].toUpperCase() + string.substring(1));
    };

    const firsUpperCase = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    };


    const limitString = (string, limit) => {
        if (string && string.length > limit) return string.substring(0, limit) + "...";
        return string;
    };

    const allFirstUpperCase = (list, split = " ") => {
        return list
            .split(split)
            .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
            .toString()
            .replace(/,/g, split);
    };


    // charAt(0).toUpperCase() + breed.slice(1);
    return { allFirstUpperCase, upperCaseList, firsUpperCase, limitString };

}
