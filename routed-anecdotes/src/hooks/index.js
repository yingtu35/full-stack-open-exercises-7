import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState("")
    
    const onChange = (e) => {
        if (!e) {
            setValue("")
        }else {
            setValue(e.target.value)
        }
    }

    return {
        type,
        value,
        onChange
    }
}