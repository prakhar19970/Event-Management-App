import { Button, DatePickerInput, ErrorMessage } from "@/components";
import { Tile } from "@/types/tile";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/contexts/ToastContext";

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
  editMessage?: string;
  editDate?: string;
  onSave: (newTile: Tile, type?: string) => void;
}

export const AddTileForm: React.FC<AddFormTitleProps> = ({
  onSave,
  editMessage,
  editDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Error>({});
  const { showToast } = useToast();

  useEffect(() => {
    if (editDate && editMessage) {
      setSelectedDate(new Date(editDate));
      setMessage(editMessage);
    }
  }, [editMessage, editDate]);

  const handleError = () => {
    showToast("Something went wrong!", "danger");
  };

  // Handle save and validate using Zod
  const handleSave = () => {
    // Validate using Zod
    const result = schema.safeParse({ message, selectedDate });
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
      handleError();
      return;
    }

    // If validation passes, send new tile to the main tiles-dataset
    const newTile: Tile = {
      message,
      date: String(selectedDate),
    };
    // Clear form fields
    setMessage("");
    setSelectedDate(null);

    // Send the Data to Parent where Form Component is Imported
    if (editDate && editMessage) {
      // Edit New Data
      onSave(newTile, "edited");
    } else {
      // Save New Data
      onSave(newTile);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center w-full text-black">
      <div className="flex w-full max-w-sm justify-start text-left text-base font-semibold">
        Add Tile
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="font-semibold">Message</div>
        <input
          type="text"
          value={message}
          className={`bg-transparent border p-2 rounded hover:bg-white focus-visible:bg-white ${
            errors.message ? "border-red-500" : ""
          }`}
          placeholder="Enter your Message"
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors({ ...errors, message: null });
          }}
        />
        <ErrorMessage message={errors.message} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="font-semibold">Date</div>
        <DatePickerInput
          selectedDate={selectedDate}
          onSetDate={(newDate) => {
            setErrors({ ...errors, selectedDate: undefined });
            setSelectedDate(newDate);
          }}
          className={`hover:bg-white focus-visible:bg-white ${
            errors.selectedDate ? "border-red-500" : ""
          }`}
        />
        <ErrorMessage message={errors.selectedDate} />
      </div>
      <Button
        label="Save"
        primary
        className="mt-1 flex justify-center w-1/2 items-center text-white"
        onClick={handleSave}
      />
    </div>
  );
};
