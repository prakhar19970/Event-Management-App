
// Define the types for the props
interface ButtonProps {
    label: string;
    onClick: () => void; // onClick is a function that doesn't return anything
}

export const Button:React.FC<ButtonProps> = ({ label,  onClick}) => {
    return (
        <button className="" onClick={onClick}>
          {label}
        </button>
      );
}