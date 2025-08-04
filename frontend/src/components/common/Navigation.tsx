import React from "react";
import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  path: string;
};

type NavigationProps = {
  logo?: string;
  items?: NavItem[];
};

const Navigation: React.FC<NavigationProps> = ({ logo, items, ...props }) => (
  <nav className="bg-white shadow px-6 py-4 flex justify-center items-center" {...props}>
    <div className="flex items-center gap-2 text-xl font-bold">
      {logo && <img src={logo} alt="Logo" className="h-8" />}
      <span>My Branch Locator</span>
    </div>
    <ul className="flex gap-6">
      {items?.map(({ label, path }) => (
        <li key={path}>
          <Link to={path} className="text-gray-700 hover:text-blue-500">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
