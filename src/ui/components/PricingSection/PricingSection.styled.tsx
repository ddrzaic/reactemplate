import styled from "styled-components";
import { Input } from "../Input/Input";
import { Button } from "..";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  user-select: none;
  gap: 1rem;
`;

export const Title = styled.h1`
  margin: 3rem 0 0 0;
`;

export const StyledInput = styled(Input)`
  width: 4rem;
  border-radius: 15px;
  border: 1px solid #6f7a70;
  padding: 0.5rem 1rem;
`;

export const InputSuffix = styled.span`
  font-size: 1.2rem;
  margin-left: 0.5rem;
  color: #6f7a70;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SubmitButton = styled(Button)`
  padding: 0.5rem 2rem;
  border-radius: 11.627px;
  min-width: 9rem;
`;

export const CancelButton = styled(SubmitButton)`
  background-color: transparent;
  color: #3871e0;
  border: 2px solid #3871e0;
  border-radius: 11.627px;
`;
