import { useState } from "react";
import css from "./CustomSelect.module.css";
import arrowIcon from "../../assets/chevron-down.svg";
import arrowUpIcon from "../../assets/chevron-up.svg";

export default function CustomSelect({
  label,
  name,
  value,
  options,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.selectWrapper}>
      <label className={css.label}>{label}</label>
      <div className={css.customSelect}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          className={css.select}
        >
          <option value="">Choose a {label.toLowerCase()}</option>
          {options.map((option) => (
            <option
              key={typeof option === "object" ? option.value : option}
              value={typeof option === "object" ? option.value : option}
            >
              {typeof option === "object" ? option.label : option}
            </option>
          ))}
        </select>
        <img
          src={isOpen ? arrowUpIcon : arrowIcon}
          alt="Arrow"
          className={css.arrowIcon}
        />
      </div>
    </div>
  );
}
