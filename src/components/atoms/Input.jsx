import { func, string } from "prop-types";
import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, name, onChange, type, errorMessage },
  ref
) {
  return (
    <>
      <label>
        {label}
        <br />
        <input
          ref={ref}
          name={name}
          onChange={onChange}
          type={type}
          style={{ marginBottom: errorMessage ? 0 : "10px" }}
        />
      </label>
      <br />
      {errorMessage && (
        <p
          style={{
            marginTop: "2px",
            color: "red",
            fontSize: "0.9em",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
          <br />
        </p>
      )}
    </>
  );
});

Input.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  errorMessage: string,
  type: string,
  onChange: func.isRequired,
};

Input.defaultProps = {
  type: "text",
  errorMessage: undefined,
};
