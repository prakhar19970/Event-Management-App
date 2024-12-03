import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  className?: string;
  open: boolean;
  showClose?: boolean;
  close: () => void;
}
export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  open,
  showClose = true,
  close,
}) => {
  return (
    open && (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 p-4 items-center justify-center flex"
          // onClick={onClose}
        ></div>
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex 
            flex-col gap-3 justify-center items-center p-4 w-1/2 rounded-md 
            bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-md z-10
            ${className}`}
        >
          {showClose && (
            <div className="flex w-full justify-end" onClick={close}>
              <X
                size="20px"
                color="black"
                strokeWidth="3px"
                className="cursor-pointer"
              />
            </div>
          )}
          {children}
        </div>
      </>
    )
  );
};
