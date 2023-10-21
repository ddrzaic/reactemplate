import styled from "styled-components";
import { ArrowDown } from "../Icons/ArrowDown";

export const Accordion = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const Title = styled.div`
  padding: 0.5rem 0.75rem;
  background-color: #eee;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

export const Content = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

type ArrowIconProps = {
  $isOpen: boolean;
};

export const ArrowIcon = styled(ArrowDown)<ArrowIconProps>`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.25s ease-in-out;
`;
