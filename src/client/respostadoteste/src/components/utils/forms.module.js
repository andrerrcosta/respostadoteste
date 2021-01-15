import Validate from "./validators";

function PostScripts(scripts, value) {
    switch (scripts) {
        case "no-white-spaces": {
            return String(value).replaceAll(" ", "");
        }

        default: {
            return value;
        }
    }
}

function Skipper(rules, items, item) {
    for (let k = 0; k < rules.length; k++) {
        let ruleItem = items.find(i => i.name === rules[k].name);
        if (ruleItem.model === rules[k].value && rules[k].validate.find(name => name === item.name)) {
            return true;
        }
    }
    return false;
}

export class Validator {
    required = undefined;
    min = undefined;
    max = undefined;
    size = undefined;
    custom = undefined;
    type = undefined;

    constructor() { }

}

export class FormItem {
    name = undefined;
    model = undefined;
    validator = {
        required: undefined,
        min: undefined,
        max: undefined,
        size: undefined,
        custom: undefined,
        type: undefined
    };
    errors = {
        error: false,
        errorMsg: undefined
    };

    constructor(name, model, validator, errors) {
        this.name = name;
        this.model = model;
        this.validator = validator;
        this.errors = errors;
    }
}

export class FormGroup {
    items = [];
    errors = 0;
    validationRules = [];
    scripts = []

    constructor(items) {
        this.items = items;
    }

    isValid() {
        let errors = 0;
        this.items.forEach(item => {
            if (!Skipper(this.validationRules, this.items, item)) {
                item.errors = Validate(item.validator, item.model);
                if (item.errors.error) errors++;
            }
        });

        this.errors = errors;

        if (this.errors > 0) {
            console.error("Validation", this.errors, "Errors", this.items.filter(item => item.errors.error));
            return false;
        }
        return true;
    }

    get(name) {
        return this.items.find(item => item.name === name);
    }

    toModel() {

        let jsonData = {};


        // console.log("scripts", scripts);


        this.items.forEach((item) => {

            let scriptValue = undefined;
            let postScripts = false;

            if (this.scripts) {
                let found = this.scripts.find(script => script.name === item.name)
                if (found) {
                    postScripts = true;
                    scriptValue = found.script;
                }
            }

            var key = item["name"];
            var value = item["model"];

            if (this.validationRules.length === 0 || !Skipper(this.validationRules, this.items, item)) {
                if (item.validator) {
                    switch (item.validator.type) {

                        case "String":
                            jsonData[key] = postScripts ? PostScripts(scriptValue, value) : String(value);
                            break;

                        case "Number":
                            jsonData[key] = postScripts ? Number(PostScripts(scriptValue, value)) : String(value);
                            break;

                        default: {
                            jsonData[key] = postScripts ? PostScripts(scriptValue, value) : value;
                            break;
                        }
                    }
                } else {
                    jsonData[key] = value
                }
            }
        });

        return jsonData;
    }
}
