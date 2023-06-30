import { useMemo } from 'react'

export const useSchema = (obj) => {
    const schema = useMemo(() => {
        const returnValue = {}
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key]
                returnValue[key] = { value: element, error: undefined }
            }
        }

        return returnValue
    }, [obj])

    return schema
}

export default useSchema;