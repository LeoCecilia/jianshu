import { Tick } from "@styled-icons/typicons";
import styled from "styled-components";
import { Grey } from "../../styles/variableCss";

export const GreyTick = styled(Tick)`
  color: ${(props) => props.color ?? Grey};
`;
