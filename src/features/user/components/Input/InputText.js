

import React, { useState, useEffect } from "react";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  maxValue,
  minValue,
  disabled,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label text-black p-0">
        <span className={"label gap-1 " + labelStyle}>
          {labelTitle}  <span className="text-red-500">*</span>
        </span>
      </label>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className={`input input-bordered w-full ${
          labelTitle === "Password" ? "pr-8" : ""
        }`}
        disabled={disabled}
        max={maxValue}
        min={minValue}
      />
    </div>
  );
}

export default InputText;
