import styles from "./styles.module.scss";
import { InputType } from "@/types/input.type";

interface TextInputProps extends InputType {
  type: "text" | "email" | "password" | "number";
  max?: number;
  min?: number;
  name?: string;
}

const TextInput = (props: TextInputProps) => {
  const { placeholder, label, name, value, type, style, onChange, max, min, required } = props;

  return (
    <div className={`${styles.textInput} ${required && styles.isRequired}`}>
      <h4>{label}</h4>
      <input
        type={type}
        max={max}
        min={min}
        name={name}
        style={style}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextInput;
