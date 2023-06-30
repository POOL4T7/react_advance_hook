import { useState, useEffect, useCallback } from 'react'
import useSchema from './useSchema'

export const useForm = (defaultFormValue, validationSchema, callback) => {
    const schema = useSchema(defaultFormValue)

    const [formState, setState] = useState(schema)
    const [disable, setDisable] = useState(false)
    const [isDirty, setIsDirty] = useState(false)

    // Disable button in initial render.
    useEffect(() => {
        setDisable(true)
    }, [])

    // reset state to current passed in value
    useEffect(() => {
        setState(schema)
        setIsDirty(false)
        setDisable(false)
    }, [schema])

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
        if (isDirty) {
            setDisable(!isValid(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState, isDirty])

    // Used to handle every change in every input
    const handleOnChange = useCallback(
        (property, value) => {
            setIsDirty(true)

            let error = ''
            if (validationSchema[property]) {
                if (validationSchema[property].required) {
                    if (!value) {
                        error = validationSchema[property].errorMessage || 'This is a required field.'
                    } else if (validationSchema[property].minValue) {
                        if (typeof value === 'number' && value < validationSchema[property].minValue) {
                            error = validationSchema[property].errorMessage || 'This is a required field.'
                        }
                    }
                } else if (validationSchema[property].matchValue) {
                    const matchValue = formState[validationSchema[property].matchValue]

                    if ((!matchValue || matchValue.value !== value) && validationSchema[property].errorMessage) {
                        error = validationSchema[property].errorMessage
                    }
                } else if (validationSchema[property].minValue) {
                    const minValue = validationSchema[property].minValue
                    if (value && value < minValue) {
                        error = validationSchema[property].errorMessage || `Please enter a value greater then ${minValue}.`
                    }
                } else if (validationSchema[property].maxValue) {
                    const maxValue = validationSchema[property].maxValue
                    if (value && value > maxValue) {
                        error = validationSchema[property].errorMessage || `Please enter a value smaller then ${maxValue}.`
                    }
                } else if (validationSchema[property].length) {
                    const length = validationSchema[property].length
                    if (value.length > length) {
                        error = validationSchema[property].errorMessage || `Please enter a value with no more then ${length} characters.`
                    }
                }

                if (validationSchema[property].requiredWhenDepValue) {
                    if (!value && formState[validationSchema[property].requiredWhenDepValue].value) {
                        error = validationSchema[property].errorMessage || 'This is a required field.'
                    }
                }

                if (validationSchema[property].validator && typeof validationSchema[property].validator === 'object') {
                    if (value && !validationSchema[property].validator.regEx.test(value)) {
                        error = validationSchema[property].validator.error
                    }
                }
            }

            setState((prevState) => ({
                ...prevState,
                [property]: { value, error },
            }))

            return { [property]: { value, error } }
        },
        [validationSchema, formState]
    )

    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const isValid = useCallback(
        (validateAll) => {
            let currentFormState = formState
            if (validateAll) {
                Object.keys(validationSchema).forEach((key) => {
                    currentFormState = { ...currentFormState, ...handleOnChange(key, formState[key].value) }
                })
            }

            const hasErrorInState = Object.keys(validationSchema).some((key) => {
                const isInputFieldRequired = validationSchema[key].required
                const stateValue = currentFormState[key].value // state value
                const stateError = currentFormState[key].error // state error

                return (isInputFieldRequired && !stateValue) || stateError
            })

            return !hasErrorInState
        },
        [formState, handleOnChange, validationSchema]
    )

    const handleOnSubmit = useCallback(
        (event) => {
            event.preventDefault()
            // Make sure that validateState returns true
            // Before calling the submit callback function
            if (isValid(true)) {
                const returnValue = {}

                for (const key in formState) {
                    if (formState.hasOwnProperty(key)) {
                        const element = formState[key].value
                        returnValue[key] = element
                    }
                }

                if (callback) callback(returnValue)
            }
        },
        [callback, formState, isValid]
    )

    return { formState, disable, handleOnChange, isValid, handleOnSubmit }
}

export default useForm
