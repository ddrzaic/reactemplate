import React from "react";
import * as S from "./Checkbox.styled";

const Rectangle = ({ isChecked }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 59">
        <rect
          id="Rectangle 20"
          x="1.06237"
          y="1.06237"
          width="38.2453"
          height="38.2453"
          rx="7.43658"
          fill={isChecked ? "#3871E0" : "white"}
          stroke={isChecked ? "#3871E0" : "#C4C4C4"}
          stroke-width="2.12474"
        />
        <path
          id="Vector"
          d="M29.7462 10.6237L16.3603 27.6215L10.6235 21.2473"
          stroke="white"
          stroke-width="4.67442"
          stroke-miterlimit="10"
          stroke-linecap="square"
        />
      </g>
    </svg>
  );
};

export interface CheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
}

export function Checkbox({ isChecked, onChange, label }: CheckboxProps) {
  return (
    <S.Container onClick={() => onChange(!isChecked)}>
      <Rectangle isChecked={isChecked} />
      <S.Label>{label}</S.Label>
    </S.Container>
  );
}
