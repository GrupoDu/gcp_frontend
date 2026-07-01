import styles from "./styles.module.scss";
import { InputType } from "@/types/input.type";
import { ChangeEvent } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectInputProps extends Omit<InputType, "onChange"> {
  options: SelectOption[] | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
}

/**
 * Componente com input select e label
 *
 * @param props
 * @param {string} props.options - Opções do select
 * @param {string} props.defaultValue - Valor padrão do select
 * @param {string} props.value - Valor do select
 * @param {function} props.onChange - Função de callback para o evento de mudança
 * @param {object} props.style - Estilização do select
 * @param {string} props.label - Texto do label
 */
const SelectInput = (props: SelectInputProps) => {
  const { options, defaultValue, value, onChange, style, label, required } = props;
  let isDisabled = false;

  if (!options) isDisabled = true;

  return (
    <div className={`${styles.selectInput} ${required && styles.isRequired}`}>
      <h4>{label}</h4>
      <select required={required} disabled={isDisabled} value={value} onChange={onChange} style={style}>
        <option value="">{defaultValue}</option>
        {displayOptions(options)}
      </select>
    </div>
  );
};

function displayOptions(options: SelectOption[] | undefined) {
  return options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
}

export default SelectInput;
