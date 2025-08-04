import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div className={`rounded-2xl shadow-lg border border-[#0000001c] p-6 bg-white ${className}`} {...props}>
    {children}
  </div>
);

export default Card;