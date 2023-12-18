import { string } from "prop-types";
import { useFormContext } from "react-hook-form";
import { processInvalidation } from "../../persistence/sessionStorage";

export const Input = ({ label, name, type }) => {
  const {
    setValue,
    register,
    formState: { defaultValues },
  } = useFormContext();

  return (
    <label>
      {label}
      <input
        {...register(name, {
          shouldUnregister: true,
          onChange: ({ target }) => processInvalidation({ target, setValue }),
        })}
        defaultValue={defaultValues?.[name]}
        type={type}
      />
    </label>
  );
};

Input.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string,
};

Input.defaultProps = {
  type: "text",
};
