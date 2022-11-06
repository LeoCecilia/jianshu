import { Plus } from "@styled-icons/octicons";
import styled from "styled-components";

export const GreenPlus = styled(Plus)`
  color: ${(props) => props.color ?? `#42c02e`};
`;
