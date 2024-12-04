import { ErrorMessageProps } from "@/types/props";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? <p className="text-red-500 text-xs">{message}</p> : null;
};
