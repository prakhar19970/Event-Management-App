import { ButtonProps } from "@/types/props";

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  iconPosition = "left",
  primary = false,
  secondary = false,
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      className={`${
        primary
          ? "bg-gradient-to-r from-[#D07985] to-[#6A3FE5]"
          : secondary
          ? "bg-gradient-to-br from-[#6A3FE5] to-[#D07985]"
          : ""
      } p-2  md:p-3 rounded shadow-md font-semibold text-xs md:text-sm lg:text-md ${className}`}
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
