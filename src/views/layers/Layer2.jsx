import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const Layer2 = () => {
    const [isSumited, setIsSumited] = useState(false)
    const {register, trigger, getValues} = useFormContext()

    const input = getValues("input2")

    useEffect(() => {
        if(input) {
            setIsSumited(true)
        }
    }, [])

    const handleClick = () => {
        trigger("input2").then(isValid => setIsSumited(isValid) )
    }

  return (
    <>
        {((!isSumited && !input) || !isSumited )&& ( 
            <>
            Form 2<br />
                <input type="text" {...register("layer2.input1", {required: true})}/><br />
                <input type="text" {...register("layer2.input2", {required: true})}/><br />
                <input type="text" {...register("layer2.input3", {required: true})}/><br />
                <input type="button" value="valider" onClick={handleClick}/>
                <br />
            </>
        )}
    </>
  );
  };
  