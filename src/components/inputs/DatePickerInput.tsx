import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerInputProps } from "@/types/props";

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  onSetDate,
  selectedDate,
  className,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => onSetDate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="yyyy-MM-dd"
      className={`w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm ${className}`}
      popperClassName="react-datepicker-popper"
      calendarClassName="bg-white border rounded-md shadow-lg p-2"
      dayClassName={() => "hover:bg-blue-100 hover:text-blue-600 rounded-full"}
    />
  );
};
