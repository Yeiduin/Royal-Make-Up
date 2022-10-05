// $ STRING :

export const noNumbersAndOnlyString = (string) => {
    //* prohibo inyección de n°.
    if (typeof string !== "string") return { condition: false, msg: "✱ only letters & no spacing!" };

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ñ", "á", "é", "ú", "ó", "í"];

    //* realmente debe conterner letras y no n° ni caracteres especiales.
    let bool = true;
    const array = string.replace(/ /g, "").split("");

    array.forEach(char => { if (!letters.includes(char.toLowerCase())) bool = false });

    if (!bool) return { condition: false, msg: "✱ only letters!" };
    return { condition: true };
}

export const maxAndMinLength = (string, min, max) => {
    if (string.length <= min) return { condition: false, msg: "✱ it's too short !" };
    if (string.length >= max) return { condition: false, msg: "✱ it's too large !" };
    return { condition: true };
}

// * NUBMERS :

export const OnlyIntNumber = (number) => {
    let bool = true;
    const listNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const array = number.split("");
    console.log((array))
    array.forEach(char => { if (!listNumbers.includes(char) || char === " ") bool = false });

    if (!bool) return { condition: false, msg: "✱ only numbers & no spacing!" };

    // //* debe ser entero.
    // if (parseFloat(number) !== Math.round(parseFloat(number))) return { condition: false, msg: "✱ only int numbers !" };

    // console.log(number.split(""))

    // //* realmente debe conterner n° y no letras.
    // let bool = true;
    // const array = number.replace(/ /g, "").split("");
    // array.forEach(char => { if (isNaN(char) || char === " ") bool = false });
    // if (!bool) return { condition: false, msg: "✱ only int numbers !" };


    return { condition: true };
}


export const minValue = (min) => {

    if (parseInt(min) <= 99) return { condition: false, msg: "✱ it's too small !" };
    return { condition: true };
}

export const maxValue = (max) => {
    if (parseInt(max) >= 9999) return { condition: false, msg: "✱ it's too big !" };
    return { condition: true };
}

export const maxAndMinValue = (min, max) => {
    if (parseInt(min) >= parseInt(max)) return { condition: false, msg: "✱ min >= max !" };

    return { condition: true };
}

const noNull = (prop) => {
    if (!prop) return { condition: false, msg: "Missing fields!" };
    else return { condition: true };
}

export const allValidate = (inputValue) => {
    const listErrors = [];

    const { country, state, address, street } = inputValue;

    if (!country || !state || !address || !street) { listErrors.push({ condition: false, msg: "Missing fields!" }) }

     listErrors.push({ ...noNull(country), type: "country" });
     listErrors.push({ ...noNull(state), type: "state" });
     listErrors.push({ ...noNull(address), type: "address" });
     listErrors.push({ ...noNull(street), type: "street" });

    country && listErrors.push({ ...noNumbersAndOnlyString(country), type: "country" });
    country && listErrors.push({ ...maxAndMinLength(country, 3, 15), type: "country" });
    state && listErrors.push({ ...noNumbersAndOnlyString(state), type: "state" });
    state && listErrors.push({ ...maxAndMinLength(state, 3, 15), type: "state" });
    address && listErrors.push({ ...noNumbersAndOnlyString(address), type: "address" });
    address && listErrors.push({ ...maxAndMinLength(address, 3, 15), type: "address" });

    street && listErrors.push({ ...OnlyIntNumber(street), type: "street" })
    street && listErrors.push({ ...maxAndMinLength(street, 2, 6), type: "street" })
    return listErrors;
}