import styled from "styled-components";
import { Grey } from "../../styles/variableCss";

export const ProfileContainer = styled.div<{ marginTop?: string }>`
  display: flex;
  margin-top: ${(props) => props.marginTop ?? "0px"};

  .name {
    display: flex;
    align-items: center;
  }

  .authorSection {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`;

export const InfoContainer = styled.div<{ fontSize?: string }>`
  margin-left: 8px;
  flex: 4;

  & > .author {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .name {
    font-size: ${(props) => props.fontSize ?? "16px"};
    font-weight: 500;
  }

  & > .info {
    color: ${Grey};
    font-size: ${(props) => props.fontSize ?? "13px"};
    margin-top: 5px;

    & > * {
      margin-right: 10px;
    }
  }
`;
