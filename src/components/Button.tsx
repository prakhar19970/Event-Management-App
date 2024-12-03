
// Define the types for the props
interface ButtonProps {
    label: string;
    primary?: boolean;
    secondary?: boolean;
    onClick: () => void; // onClick is a function that doesn't return anything
}

export const Button:React.FC<ButtonProps> = ({ label, primary = false, secondary = false, onClick}) => {
    return (
        <button 
        className={`${primary && !secondary ? 'bg-[#6699FF]': 'bg-[#F40076]'} p-2  md:p-3 rounded shadow-md text-white font-semibold text-xs md:text-sm lg:text-md`} 
        onClick={onClick} >
          {label}
        </button>
      );
}