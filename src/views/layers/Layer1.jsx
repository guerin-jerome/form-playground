import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const Layer1 = () => {
    const [isSumited, setIsSumited] = useState(false)
    const {register, trigger, watch} = useFormContext()

    const input = watch("layer1")

    useEffect(() => {
        if(input) {
            setIsSumited(true)
        }
    }, [])

    const handleClick = () => trigger("layer1").then(isValid => {
        setIsSumited(isValid)
    } )

    return (
        <>
           {((!isSumited && !input) || !isSumited )&& ( 
                <>
                Form 1 <br />
                    <input type="text" {...register("layer1.input1", {required: true })}/><br />
                    <input type="text" {...register("layer1.input2", {required: true })}/><br />
                    <input type="text" {...register("layer1.input3", {required: true })}/><br />
                    <input type="button" value="valider" onClick={handleClick}/>
                    <br />
                </>
            )}
        </>
    );
};
