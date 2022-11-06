import React from "react";
import styled, { keyframes } from "styled-components";
import { GreyHeart } from "./icon/Heart";

const loading = keyframes`
  0% {
    width: 60%;
  }
  50% {
    width: 100%;
  }
  to {
    width: 60%;
  }
`;

const Placeholder = styled.div`
  position: relative;
  padding: 15px 2px 0 0;
  margin-bottom: 50px;

  & > div:not(:last-child) {
    margin-bottom: 10px;
  }

  .content {
    padding-right: 165px;
  }

  .text {
    width: 100%;
    height: 16px;
    margin: 0 0 10px;
    background-color: #eaeaea;
    animation: ${loading} 1s ease-in-out infinite;
  }

  .animation-delay {
    animation: ${loading} 1s ease-in-out -0.5s infinite;
  }

  .title {
    width: 50%;
    height: 20px;
    margin: 0 0 15px !important;
    background-color: #eaeaea;
  }

  .img {
    width: 150px;
    position: absolute;
    bottom: 2px;
    right: 0;
    width: 125px;
    height: 100px;
    border-radius: 4px;
    background-color: #eaeaea;
    top: 15px;

    @media (max-width: 1080px) {
      height: 100px;
      width: 125px;
    }
  }

  .meta {
    div {
      display: inline-block;
      vertical-align: middle;
      background: #eaeaea;
    }
    .small {
      width: 30px;
      height: 16px;
    }
    .read {
      width: 50px;
      height: 16px;
    }

    svg {
      margin: 0 5px;
      vertical-align: middle;
    }
  }
`;

export const PostPlaceholder = () => {
  return (
    <Placeholder>
      <div className="img"></div>
      <div className="content">
        <div className="title"></div>
        <div className="text"></div>
        <div className="text animation-delay"></div>
        <div className="meta">
          <div className="read"></div>
          <GreyHeart size={12} title="article's likes count" color="#eaeaea" />
          <div className="small"></div>
        </div>
      </div>
    </Placeholder>
  );
};
