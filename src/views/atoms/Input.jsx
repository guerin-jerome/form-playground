import { object, string } from "prop-types";
import { useFormContext } from "react-hook-form";

export const Input = ({ label, name, type, options }) => {
  const {
    register,
    formState: { defaultValues, errors },
  } = useFormContext();

  return (
    <>
      <label>
        {label}
        <input
          {...register(name, { ...options })}
          defaultValue={defaultValues?.[name]}
          type={type}
        />
      </label>
      {errors?.[name] && <p>{errors?.[name]?.message}</p>}
    </>
  );
};

Input.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string,
  options: object,
};

Input.defaultProps = {
  type: "text",
  options: {},
};
