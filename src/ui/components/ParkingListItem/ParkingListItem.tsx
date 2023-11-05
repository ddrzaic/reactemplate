import React from "react";
import * as S from "./ParkingListItem.styled";

type ParkingListItemProps = {
  name: string;
  address: string;
  availableSpots: number;
  hourlyPrice: number;
  onClick: () => void;
};

export const ParkingListItem = ({
  name,
  address,
  availableSpots,
  hourlyPrice,
  onClick,
}: ParkingListItemProps) => (
  <S.Container onClick={onClick}>
    <S.Left>
      <S.Name>{name}</S.Name>
      <S.Address>{address}</S.Address>
      <S.AvailableSpots hasAvailableSpots={availableSpots > 0}>
        {availableSpots} spaces left
      </S.AvailableSpots>
    </S.Left>
    <S.Right>{hourlyPrice}€/hr</S.Right>
  </S.Container>
);
