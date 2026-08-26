import FilterDropdownBase from "@/components/ui/filterDropdown";
import { OptionType } from "@/types/optionType.interface";

type CustomDropdownProps = {
  label: string;
  readonly options: OptionType[];
  setOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export const CustomDropdown = ({ options, label, setOption, value }: CustomDropdownProps) => {
  return (
    <FilterDropdownBase label={label} placeholder={label} value={value} setValue={setOption}>
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FilterDropdownBase>
  );
};
