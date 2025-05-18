import Select from "react-select";
import css from "./Select.module.css";
import { useState } from "react";
import ArrowIconUp from "../../assets/chevron-up.svg";
import ArrowIconDown from "../../assets/chevron-down.svg";
export default function CustomSelect({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = `Choose a ${label.toLowerCase()}`,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedOption = options.find((opt) =>
    typeof opt === "object" ? opt.value === value : opt === value
  );

  const handleChange = (selected) => {
    onChange({ target: { name, value: selected?.value || "" } });
  };

  const formattedOptions = options.map((opt) =>
    typeof opt === "object" ? opt : { label: opt, value: opt }
  );

  return (
    <div className={css.selectWrapper}>
      <label className={css.label}>{label}</label>
      <div className={css.selectBox}>
        <Select
          classNamePrefix="custom-select"
          name={name}
          value={selectedOption || null}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          onChange={handleChange}
          options={formattedOptions}
          isClearable={false}
          placeholder={placeholder}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "var(--inputs)",
              fontSize: "14px",
              paddingLeft: "4px",
              cursor: "pointer",

              outline: "none",
              boxShadow: "none !important",
              border: `1px solid ${
                state.isFocused ? "var(--button-hover)" : "var(--gray-light)"
              }`,

              "&:hover": {
                borderColor: "var(--button-hover)",
                boxShadow: "none !important",
              },
              "&:focus": {
                borderColor: "var(--button-hover)",
                boxShadow: "none !important",
                outline: "none",
              },
              "&:active": {
                borderColor: "var(--button-hover)",
                boxShadow: "none !important",
              },
            }),

            placeholder: (base) => ({
              ...base,
              fontFamily: "var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "125%",
              color: "var(--main)",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: "transparent",
              color: state.isSelected ? "var(--main)" : "var(--gray)",
              fontFamily: "var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "125%",
              padding: "10px 12px",
              cursor: "pointer",
            }),
            menu: (base) => ({
              ...base,
              border: "1px solid var(--inputs)",
              borderRadius: "12px",
              width: "204px",
              maxHeight: "auto",
              overflowY: "auto",
              zIndex: 9999,
              backgroundColor: "#fff",
            }),
            singleValue: (base) => ({
              ...base,
              fontFamily: "var(--font-family)",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "125%",
              color: "var(--main)",
              backgroundColor: "transperent",
            }),
          }}
        />
        <img
          src={isMenuOpen ? ArrowIconUp : ArrowIconDown}
          alt="Arrow"
          className={css.arrowIcon}
        />
      </div>
    </div>
  );
}
