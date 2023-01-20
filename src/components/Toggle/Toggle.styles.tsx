import styled from "styled-components";

export const Form = styled.form`
  width: 60px;
  display: inline-block;
  padding: 0;
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label<{
  isLight: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 30px;
  border-radius: 20px;
  margin: 0;
  background-color: ${(props) => props.theme.colors.eerieBlack};
  border: 1px solid
    ${(props) =>
      props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};
`;

export const Inner = styled.div<{
  isChecked: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 6px;
`;

export const Switch = styled.div<{
  isChecked: boolean;
}>`
  display: flex;
  width: 25px;
  aspect-ratio: 1/1;
  margin: 3px;
  background: ${(props) => props.theme.colors.ivory};
  position: absolute;
  right: ${({ isChecked }) => (isChecked ? "0" : "1.7rem")};
  border-radius: 1.2rem;
  transition: all 0.3s ease-in 0s;
`;
