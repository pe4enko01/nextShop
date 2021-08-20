import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLParagraphElement>{
    isEditable?: boolean;
    rating: number;
    setRaring?: (rating: number) => void;
}