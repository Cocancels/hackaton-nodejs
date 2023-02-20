import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  label: string;
}

function Button(props: ButtonProps) {
  const { onClick, className, label } = props;

  return (
    <button onClick={onClick} className={`button ${className}`}>
      {label}
    </button>
  );
}

export default Button;
