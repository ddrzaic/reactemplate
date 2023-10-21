import React from "react";
import * as S from "./Input.styled";

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ value, onChange }: InputProps) => (
  <S.Input value={value} onChange={(e) => onChange(e.target.value)} />
);
