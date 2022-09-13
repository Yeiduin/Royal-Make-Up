import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.name !== "orderBy" && target.name !== "image" ? target.value.toLowerCase() : target.value,
            
            // [target.name]: parseInt(target.value)
        });
    }

    return [values, handleInputChange, reset];

}
