import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className? : string;
  onChange? :(e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({className = "", ...props }) => (
  <input className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" ${className}`} {...props}/>
);

export default Input;