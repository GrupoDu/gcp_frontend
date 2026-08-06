import { SelectOption } from "@/types/selectOption.interface";

export const getOptions = (valueKey?: string, labelKey?: string): SelectOption => {
  return {
    value: valueKey || "",
    label: labelKey || "",
  };
};
