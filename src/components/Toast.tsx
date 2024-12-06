type ToastProps = {
  message: string;
  type: "success" | "danger";
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white shadow-lg
                  ${type === "success" ? "bg-gradient-to-r from-green-500/50 to-green-500/30 backdrop-blur-md" : "bg-gradient-to-r from-red-500/50 to-red-500/30 backdrop-blur-md"}
                  transition-transform duration-300 ease-in-out"}
                `}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <span className="font-bold">&times;</span>
        </button>
      </div>
    </div>
  );
};
