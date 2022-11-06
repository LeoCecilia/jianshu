import { HeartFill } from "@styled-icons/octicons";
import styled from "styled-components";

export const GreyHeart = styled(HeartFill)`
  color: ${(props) => props.color ?? `#b4b4b4`};
`;
