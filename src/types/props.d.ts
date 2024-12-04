import { ReactNode } from "react";
import { Tile } from "@/types/tile";

interface ButtonProps {
    label?: string;
    icon?: ReactNode;
    primary?: boolean;
    secondary?: boolean;
    onClick: () => void;
    className?: string;
    iconPosition?: "left" | "right";
    children?: ReactNode;
}

interface HeaderProps {
    children: ReactNode;
}


interface ModalProps {
    children: ReactNode;
    className?: string;
    open: boolean;
    showClose?: boolean;
    close: () => void;
}

interface DatePickerInputProps {
    onSetDate: (newDate: Date | undefined) => void;
    selectedDate: Date | undefined;
    className?: string
}

interface ErrorMessageProps {
    message: string | null | undefined;
}

interface TileProps {
  tileData: Tile;
  year: string;
  position: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, tileId: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    year: string,
    position: number
  ) => void;
  checkIfDraggedTile: (tileId: string) => boolean;
  color?: string;
}

export {ButtonProps, ModalProps, HeaderProps, DatePickerInputProps, ErrorMessageProps, TileProps};