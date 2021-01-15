import ModelUtils from "./model-utils";

export const Px = (a) => {
    return `${a}px`;
}

export const ValidString = (...values) => {
    for (let i = 0; i < values.length; i++) {
        if (values[i] === undefined || values[i] === null || values[i].length < 1) {
            return false;
        }
    }
    return true;
}

export const IsValid = (...values) => {
    for (let i = 0; i < values.length; i++) {
        if (values[i] === undefined || values[i] === null) {
            return false;
        }
    }
    return true;
}

export const IsValidObject = (...objects) => {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i] === undefined || objects[i] === null) {
            return false;
        } else {
            let arr = ModelUtils.cast(objects[i]);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].value === undefined || arr[i].value === null || arr[i] === "") {
                    return false;
                }
            }
        }
    }
    return true;
}

export const Undefined = (valueA, valueB) => {
    return IsValid(valueA) ? valueA : valueB;
}

export const DateFormat = (date) => {
    let d = new Date(Date.parse(date));
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    return `${year}-${month}-${day}`
}

export const Percent = (total, part, integer) => {
    return integer ? Math.floor(part * 100 / total) : part * 100 / total;
}