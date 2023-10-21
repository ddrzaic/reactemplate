import React from "react";
import * as S from "./Button.styled";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <S.Button onClick={onClick}>{children}</S.Button>
);
