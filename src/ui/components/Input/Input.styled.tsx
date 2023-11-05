import styled from "styled-components";

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 31.505px;
  border: 1.969px solid #6f7a70;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;

  &:focus {
    outline: 1px solid #3871e0;
    border: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

export const InputError = styled.span`
  color: red;
  font-size: 0.8rem;
`;
