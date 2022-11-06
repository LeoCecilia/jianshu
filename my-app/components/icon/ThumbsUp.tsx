import { Thumbsup } from "@styled-icons/octicons";
import styled from "styled-components";

export const IThumbsup = styled(Thumbsup)<{ operable?: boolean }>`
  color: ${(props) => props.color ?? `#b4b4b4`};
  width: 18px;
  height: 18px;
  ${(props) =>
    props.operable &&
    `
    &: hover {
      cursor: pointer;
    }
  `};
`;
