import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerInputProps } from "@/types/props";

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  onSetDate,
  selectedDate,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "bg-transparent justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon />
          {selectedDate ? (
            format(selectedDate, "yyyy-MM-dd")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-md bg-transparent"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSetDate}
          // disabled={{ after: new Date() }} // Disable future dates
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
