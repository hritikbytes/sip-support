import React from "react";

const InputPulseBorder = ({
  placeholder,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="relative">
      <div className="absolute top-0 flex w-full justify-center">
        <div className="h-px animate-border-width rounded-full bg-linear-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
      </div>
      {type === "textarea" ? (
        <textarea
          className={`block h-40 w-full rounded-xl border text-white placeholder:text-gray-400 border-gray-800 bg-gray-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50 resize-none ${className}`}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`block h-12 w-full rounded-md border text-white placeholder:text-gray-400 border-gray-800 bg-gray-950 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50 ${className}`}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
};

export default InputPulseBorder;
