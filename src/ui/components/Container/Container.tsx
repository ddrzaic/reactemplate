import React from "react";
import * as S from "./Container.styled";

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <S.Container>{children}</S.Container>;
}
