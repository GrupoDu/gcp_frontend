import { CSSProperties } from "react";

export interface InputType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  label: string;
  readonly?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  required?: boolean;
}
