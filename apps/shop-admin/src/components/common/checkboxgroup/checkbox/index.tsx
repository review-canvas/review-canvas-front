import type { CheckboxProps } from "@/types/components/checkboxgroup";

function Checkbox({ children, name, value, onChange, checked }: CheckboxProps) {
    return (
      <label>
        <input
          type="checkbox"
          checked={checked}
          name={name}
          value={value}
          onChange={onChange}
        />
        {children}
      </label>
    );
  };
  
  export default Checkbox;