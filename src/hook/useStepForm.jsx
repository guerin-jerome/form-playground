import { useState } from "react"

const useStepForm = () => {
    const [formValided, setFormValid] = useState()

    console.log(formValided, "formValid")

    const addFormValid = (formName) => setFormValid(formName)

    return {
        formValided,
        addFormValid
    }
}

export default useStepForm