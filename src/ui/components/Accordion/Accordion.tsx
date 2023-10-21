import React from "react";
import * as S from "./Accordion.styled";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <S.Accordion>
      <S.Title onClick={() => setIsOpen(!isOpen)}>
        {title}
        <S.ArrowIcon $isOpen={isOpen} />
      </S.Title>
      {isOpen && <S.Content>{children}</S.Content>}
    </S.Accordion>
  );
};
