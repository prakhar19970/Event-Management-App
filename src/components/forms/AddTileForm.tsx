import { Button, DatePickerInput } from "@/components";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

// Zod validation schema --> needed for validating the form fields
const schema = z.object({
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" })
    .min(1, { message: "Message cannot be empty" }),
  selectedDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date is required",
    }),
});

// interface for error
interface Error {
  message?: string | null;
  selectedDate?: string | null;
}

interface AddFormTitleProps {
  className?: string;
  onSave: (newTile: {
    message: string | null;
    date: string | undefined;
  }) => void;
}

export const AddTileForm: React.FC<AddFormTitleProps> = ({ onSave }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Error>({});

  // Handle save and validate using Zod
  const handleSave = () => {
    // Validate using Zod
    const result = schema.safeParse({ message, selectedDate });
    console.log(result);
    if (!result.success) {
      // If validation fails, set errors and return
      const newErrors: { message?: string; selectedDate?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "message") {
          newErrors.message = err.message;
        }
        if (err.path[0] === "selectedDate") {
          newErrors.selectedDate = "Date is required";
        }
      });
      setErrors(newErrors);
      return;
    }

    // If validation passes, send new tile to the main tiles-dataset
    const newTile: { message: string | null; date: string | undefined } = {
      message,
      date: selectedDate?.toString(),
    };
    // Clear form fields
    setMessage("");
    setSelectedDate(undefined);

    // Send the Date to Parent where Form Is being used
    onSave(newTile);
  };

  return (
    <div className="flex flex-col gap-3 w-full text-black">
      <div className=" text-left text-base font-semibold">Add Tile</div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Input
          type="text"
          className={`hover:bg-white focus-visible:bg-white ${
            errors.message ? "border-red-500" : ""
          }`}
          placeholder="Enter your Message"
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors({ ...errors, message: null });
          }}
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="date">Date</Label>
        <DatePickerInput
          selectedDate={selectedDate}
          onSetDate={(newDate) => {
            console.log(newDate);
            setErrors({ ...errors, selectedDate: undefined });
            setSelectedDate(newDate);
          }}
          className={`hover:bg-white focus-visible:bg-white ${
            errors.selectedDate ? "border-red-500" : ""
          }`}
        />
        {errors.selectedDate && (
          <p className="text-red-500 text-xs">{errors.selectedDate}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          label="Save"
          className="flex justify-center w-1/2 items-center"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};
