import React from "react";
import * as S from "./ParkingSpace.styled";
import { DeleteIcon, Input } from "..";

const GreenDot = ({ occupied }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="13.227"
      cy="13.0296"
      r="12.4231"
      fill={occupied ? "red" : "#53D160"}
    />
  </svg>
);

type ParkingSpaceProps = {
  children?: React.ReactNode;
  onDelete?: () => void;
  occupied?: boolean;
};

export const ParkingSpace = ({
  children,
  onDelete,
  occupied,
}: ParkingSpaceProps) => {
  return (
    <S.Container>
      <GreenDot occupied={occupied} />
      {children}
      <S.DeleteButton onClick={onDelete}>
        <DeleteIcon />
      </S.DeleteButton>
    </S.Container>
  );
};
