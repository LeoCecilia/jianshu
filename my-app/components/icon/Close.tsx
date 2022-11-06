import { Close } from "@styled-icons/evil";
import styled from "styled-components";
import { Grey } from "../../styles/variableCss";

export const GreyClose = styled(Close)`
  color: ${(props) => props.color ?? Grey};
`;
