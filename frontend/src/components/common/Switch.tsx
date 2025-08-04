import React from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  color?: string;
};

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, color = "green" }) => {
  return (
    <label className="flex items-center cursor-pointer gap-2">
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors duration-300 ${
            checked ? "bg-"+color+"-600" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform duration-300 ${
            checked ? "translate-x-4" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
