import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "secondary" | "danger" | "success";
};

const colorClasses: Record<NonNullable<ButtonProps["color"]>, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
  danger:
    "bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600",
  success:
    "bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600",
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  className = "",
  ...props
}) => {
  const baseClasses = "py-2 px-4 rounded-xl transition disabled:opacity-50";
  const finalClass = `${baseClasses} ${colorClasses[color]} ${className}`;

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
