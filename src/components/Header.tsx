import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export const Header:React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className="flex justify-end p-2">
            {children}
        </div>
    )
}