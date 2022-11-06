import styled from "styled-components";
import { Grey } from "../../styles/variableCss";

export const Icon = styled.div`
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 18px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  display: flex;
  align-items: center;
  position: relative;
  background: #fff;
  color: ${Grey};
  cursor: pointer;
`;
