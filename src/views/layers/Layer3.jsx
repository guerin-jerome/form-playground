import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const Layer3 = () => {
    const [isSumited, setIsSumited] = useState(false)
    const {register, trigger, getValues} = useFormContext()

    const input = getValues("input3")

    useEffect(() => {
        if(input) {
            setIsSumited(true)
        }
    }, [])


    const handleClick = () => {
        trigger("input3").then(isValid => setIsSumited(isValid) )
    }

    return (
        <>
           {!isSumited && ( 
                <>
                Form 3<br />
                    <input type="text" {...register("layer3.input1", {required: true})}/><br />
                    <input type="text" {...register("layer3.input2", {required: true})}/><br />
                    <input type="text" {...register("layer3.input3", {required: true})}/><br />
                    <input type="button" value="valider" onClick={handleClick}/><br />
                </>
            )}
        </>
    );
  };
  