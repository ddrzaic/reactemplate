import React from "react";
import * as S from "./Dropdown.styled";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onChange: (option: DropdownOption) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOptionClick = (option: DropdownOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer>
      <S.DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.label}
        <S.ArrowIcon $isOpen={isOpen} />
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownContent>
          {options.map((option) => (
            <S.DropdownOption
              key={option.value}
              onClick={() => handleOptionClick(option)}
              $isSelected={option.value === selectedOption.value}
            >
              {option.label}
            </S.DropdownOption>
          ))}
        </S.DropdownContent>
      )}
    </S.DropdownContainer>
  );
};
