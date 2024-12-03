import { ReactNode } from "react";
interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  onClick: () => void;
  className?: string;
  iconPosition?: "left" | "right";
  children?: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  iconPosition = "left",
  primary = false,
  secondary = false,
  onClick,
  className = "",
  children
}) => {
  return (
    <button
      className={`${
        primary && !secondary ? "bg-[#6699FF] bg-gradient-to-br from-white/60 to-white/10" : "bg-[#F40076] bg-gradient-to-br from-white/60 to-white/10"
      } p-2  md:p-3 rounded shadow-md text-white font-semibold text-xs md:text-sm lg:text-md ${className}`}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && (
        <span className="material-icons">{icon}</span>
      )}
      {label && <div>{label}</div>}
      {icon && iconPosition === "right" && (
        <span className="material-icons">{icon}</span>
      )}
      {children}
    </button>
  );
};
