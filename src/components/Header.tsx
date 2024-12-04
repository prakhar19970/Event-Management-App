import { HeaderProps } from "@/types/props";

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div className="flex justify-end p-3 gap-4">{children}</div>;
};
