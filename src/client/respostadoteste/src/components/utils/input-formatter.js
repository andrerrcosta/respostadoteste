/**
 * Formata uma entrada em string de acordo com um scheme
 */

export default class InputFormatter {

    constructor() {

    }

    format(schema, input) {
        switch (schema) {
            case "cpf": {
                let cleanString = input.replace(/[^\d.-]/g, '');

                // console.log("Clean String", cleanString);

                if (cleanString.length >= 3) {
                    if (cleanString.charAt(3) !== ".")
                        cleanString = cleanString.substring(0, 3) + "." + cleanString.substring(3, cleanString.length);
                }
                if (cleanString.length >= 7) {
                    if (cleanString.charAt(7) !== ".")
                        cleanString = cleanString.substring(0, 7) + "." + cleanString.substring(7, cleanString.length);
                }
                if (cleanString.length >= 11) {
                    if (cleanString.charAt(11) !== "-")
                        cleanString = cleanString.substring(0, 11) + "-" + cleanString.substring(11, cleanString.length);
                }
                if (cleanString.length > 14) {
                    cleanString = cleanString.substring(0, 14);
                }

                return cleanString;
            }

            case "cep": {
                let cleanString = input.replace(/[^\d.-]/g, '');

                if (cleanString.length >= 2) {
                    if (cleanString.charAt(2) !== ".")
                        cleanString = cleanString.substring(0, 2) + "." + cleanString.substring(2, cleanString.length);
                }
                if (cleanString.length >= 6) {
                    if (cleanString.charAt(6) !== "-")
                        cleanString = cleanString.substring(0, 6) + "-" + cleanString.substring(6, cleanString.length);
                }
                if (cleanString.length > 10) {
                    cleanString = cleanString.substring(0, 10);
                }
                return cleanString;
            }

            case "cc": {
                let cleanString = input.replace(/[^\d.-]/g, '');

                if (cleanString.length >= 4) {
                    if (cleanString.charAt(4) !== " ")
                        cleanString = cleanString.substring(0, 4) + " " + cleanString.substring(4, cleanString.length);
                }
                if (cleanString.length >= 9) {
                    if (cleanString.charAt(9) !== " ")
                        cleanString = cleanString.substring(0, 9) + " " + cleanString.substring(9, cleanString.length);
                }
                if (cleanString.length >= 14) {
                    if (cleanString.charAt(14) !== " ")
                        cleanString = cleanString.substring(0, 14) + " " + cleanString.substring(14, cleanString.length);
                }
                if (cleanString.length > 19) {
                    cleanString = cleanString.substring(0, 19);
                }
                return cleanString;
            }

            default: { return input }
        }
    }
}