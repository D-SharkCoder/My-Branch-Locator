import React from "react";

const Footer: React.FC = ({...props}) => (
  <footer className="bg-gray-800 text-white text-center py-4" {...props}>
    <p>&copy; {new Date().getFullYear()} This application is for the technical exam for Performativ.</p>
  </footer>
);

export default Footer;