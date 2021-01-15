import { IsValidObject } from "./formatters.module";

const REQUIRED = `Este campo é obrigatório`;
const MIN = (min) => { return `Este campo precisa ter ao menos "${min}" caracteres` };
const MAX = (max) => { return `Este campo não pode ter mais que "${max}" caracteres` };
const SIZE = (size) => { return `Este campo precisa ter exatamente "${size}" caracteres` };
const NO_PAST_DATE = `Precisa ser uma data futura`;
const EMAIL = `Este e-mail é inválido`;
const CPF = `Este cpf é inválido`;
const CEP = `Este cep é inválido`;
const EMAIL_RX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const CPF_RX = /(\d{3}).(\d{3}).(\d{3})-(\d{2})/;
const CEP_RX = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;


/**
 * 
 * @param {*} validation 
 * @param {*} value 
 * 
 * Executa a validação de um valor (value) de acordo com o objeto validation
 */

const Validate = (validation, value) => {

    if (validation.required) {

        if (!IsValidObject(value)) {
            return {
                error: true,
                errorMsg: REQUIRED
            };
        }

        let values = Object.values(value);


        if (values.length > 0) {
            let err = false;
            // console.warn("KEYS", values);

            for (let i = 0; i < values.length; i++) {

                err = values[i] === undefined ||
                    values[i] === null ||
                    values[i].length < 1
                if (err) i = values.length;
            }

            if (err) {
                return {
                    error: true,
                    errorMsg: REQUIRED
                };
            }
        } else {
            if (
                value === undefined ||
                value === null ||
                value.length < 1
            ) {
                return {
                    error: true,
                    errorMsg: REQUIRED
                };
            }
        }

    }

    if (validation.min) {

        if (value.length < validation.min) {

            return {
                error: true,
                errorMsg: MIN(validation.min)
            };
        }
    }
    if (validation.max) {
        if (value.length > validation.max) {
            return {
                error: true,
                errorMsg: MAX(validation.max)
            };
        }
    }

    if (validation.size) {
        if (value.length !== validation.size) {
            return {
                error: true,
                errorMsg: SIZE(validation.size)
            };
        }
    }

    if (validation.custom) {
        switch (validation.custom) {
            case "email": {

                if (!EMAIL_RX.test(String(value.trim()).toLowerCase())) {
                    return {
                        error: true,
                        errorMsg: EMAIL
                    };
                }
                break;
            }

            case "cpf": {
                if (!CPF_RX.test(String(value.trim()))) {
                    return {
                        error: true,
                        errorMsg: CPF
                    };
                }
                break;
            }

            case "cep": {
                if (!CEP_RX.test(value.trim())) {
                    return {
                        error: true,
                        errorMsg: CEP
                    };
                }
                break;
            }

            case "no-past-date": {
                let date = new Date();
                if (value.year >= date.getFullYear()) {
                    if (value.month >= date.getMonth()) {
                        break;
                    }

                }
                return {
                    error: true,
                    errorMsg: NO_PAST_DATE
                };
            }

            default: {
                break;
            }
        }
    }

    return {
        error: false,
        errorMsg: undefined
    };

}

export default Validate;