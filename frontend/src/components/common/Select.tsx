import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  children?: React.OptionHTMLAttributes<HTMLOptGroupElement>;
};

const Select: React.FC<SelectProps> = ({ children, className = "", ...props }) => (
    <select className="w-full px-3 py-2 rounded-md border border-gray-600 
             bg-gray-800 text-gray-200 placeholder-gray-500 
             focus:outline-none focus:ring-1 focus:ring-blue-400 
             transition-colors duration-200" {...props}>
                        <option value="">Any</option>
                        {children}
                    </select>
);

export default Select;