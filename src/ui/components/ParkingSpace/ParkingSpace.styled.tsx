import styled from "styled-components";

export const Container = styled.div`
  border-radius: 17px;
  border: 2px solid #3e463f;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: min-content;
  white-space: nowrap;
  position: relative;
`;

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: rgba(209, 83, 83, 1);
  position: absolute;
  top: -0.7rem;
  right: -0.7rem;
  border-radius: 0.5rem;
  padding: 0.4rem;
  cursor: pointer;
`;
