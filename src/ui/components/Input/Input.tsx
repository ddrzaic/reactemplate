import React from "react";
import * as S from "./Input.styled";

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label?: React.ReactNode;
  type?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  isReadOnly?: boolean;
}

export const Input = ({
  value,
  onChange,
  label,
  type,
  error,
  className,
  placeholder,
  suffix,
  isReadOnly,
}: InputProps) => (
  <S.Wrapper>
    {label}
    <div>
      <S.Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className={className}
        placeholder={placeholder}
        readOnly={isReadOnly}
      />
      {suffix}
    </div>
    {error && <S.InputError>{error}</S.InputError>}
  </S.Wrapper>
);
