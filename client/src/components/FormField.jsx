import React from "react";

const FormField = ({
  LabelName,
  name,
  type,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  placeholder,
  value,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name}>
          <h4 className="block text-sm font-medium text-gray-900">
            {LabelName}
            {isSurpriseMe && (
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="font-semibold text-xs bg-wheat px-2 rounded-sm py-1 "
              >
                {" "}
                Surprise me
              </button>
            )}
          </h4>
        </label>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4949ff] outline-none block w-full p-3 border"
      />
    </div>
    
  );
};

export default FormField;
