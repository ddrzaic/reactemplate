import styled, { css } from "styled-components";
import { ArrowDown } from "../Icons/ArrowDown";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 1;
`;

type DropdownOptionProps = {
  $isSelected: boolean;
};
export const DropdownOption = styled.a<DropdownOptionProps>(
  ({ $isSelected }) => css`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }

    ${$isSelected &&
    css`
      background-color: #4caf50;
      color: white;

      &:hover {
        background-color: #4caf50;
      }
    `}
  `
);

type ArrowIconProps = {
  $isOpen: boolean;
};

export const ArrowIcon = styled(ArrowDown)<ArrowIconProps>(
  ({ $isOpen }) => css`
    transform: ${$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.25s ease-in-out;
  `
);
