import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  width: 100%;
  margin: 3rem auto;
  cursor: pointer;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  align-items: flex-start;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  border-radius: 50%;
  background-color: #3871e0;
  height: 100px;
  font-size: 25px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  color: white;
`;
export const Name = styled.h3`
  font-size: 1.8rem;
  margin: 0;
`;

export const Address = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

export const AvailableSpots = styled.p<{ hasAvailableSpots: boolean }>`
  font-size: 1.2rem;
  color: ${({ hasAvailableSpots }) => (hasAvailableSpots ? "#53d160" : "red")};
  margin: 0;
`;
