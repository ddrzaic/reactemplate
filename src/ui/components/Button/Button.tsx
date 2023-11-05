import React from "react";
import * as S from "./Button.styled";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) => (
  <S.Button type={type} onClick={onClick} className={className}>
    {children}
  </S.Button>
);
