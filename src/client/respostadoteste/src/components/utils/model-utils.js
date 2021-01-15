class ModelUtils {
    
    constructor() {}

    static cast(obj) {
        let output = [];
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        for(let i = 0; i < keys.length; i++) {
            output.push({key: keys[i], value: values[i]});
        }
        return output;
    }
}

export default ModelUtils;