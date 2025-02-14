import React from "react";

const FormErrMsg = ({ errors, inputName }) => {
  return (
    errors[inputName] && (
      <p className="text-red-500 text-sm mt-1">{errors[inputName].message}</p>
    )
  );
};

export default FormErrMsg;
