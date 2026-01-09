
export const trimData = (obj) => {
    let finalObj = {};
    for(let key in obj){
        const value = obj[key];
        if(typeof value === 'string'){
            finalObj[key] = value.trim();
        }
        else if (typeof value === 'number' || value === 'boolean'){
            finalObj[key] = value;
        }
    }
    return finalObj;
} 