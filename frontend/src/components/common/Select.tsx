import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  children?: React.OptionHTMLAttributes<HTMLOptGroupElement>;
};

const Select: React.FC<SelectProps> = ({ children, className = "", ...props }) => (
    <select className="w-full px-3 py-2 text-gray-200 placeholder-gray-500 transition-colors duration-200 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400" {...props}>
                        <option value="any">Any</option>
                        {children}
                    </select>
);

export default Select;