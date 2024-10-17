const validateFields = (fields : {[key : string] : any}) => {
    let errorFields = ''
    let isError = false

    for (let field in fields) {
        if (!fields[field]){
            errorFields += `${field}, `
            isError = true
        }
    }

    if (errorFields) {
        errorFields = errorFields.slice(0, -2);
    }
    
    return {errorFields, isError};
}

export {validateFields}