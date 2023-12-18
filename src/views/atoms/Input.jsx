import { string } from "prop-types";
import { useFormContext } from "react-hook-form";

export const Input = ({ label, name, type }) => {
  const {
    register,
    formState: { defaultValues },
  } = useFormContext();

  return (
    <label>
      {label}
      <input
        {...register(name, { shouldUnregister: true })}
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
