import { X } from "lucide-react";
import { ModalProps } from "@/types/props";

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
        <div className="fixed inset-0 bg-black bg-opacity-20 p-4 items-center justify-center flex" />
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex 
            flex-col gap-3 justify-center items-center p-4 rounded-md 
            bg-white backdrop-blur-lg z-10  w-[80%] md:w-1/2
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
