import { CONTAINER } from "@constants/layout";
import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: ${CONTAINER.MOBILE}px;
  gap: 16px;
`;
