import { CSSProperties } from "react";

export interface InputType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  label: string;
  placeholder?: string;
  style?: CSSProperties;
}
