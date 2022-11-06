import { Refresh } from "@styled-icons/typicons";
import styled from "styled-components";
export const GreyRefresh = styled(Refresh)`
  color: ${(props) => props.color ?? `#b4b4b4`};
`;
