import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "./common/Icon";
import { QRCodes } from "./QRCode";
import { IThumbsup } from "./icon/ThumbsUp";
import { Grey } from "../styles/variableCss";
import { useReducer } from "react";
import { likeReducer } from "../reducer/likeReducer";
import { likeAction } from "../reducer/actionType";
import { useDebounce } from "../hooks/useDebounce";

const SocialContainer = styled.div`
  position: fixed;
  z-index: 98;
  top: 216px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  left: calc((100vw - 1000px) / 2 - 78px);
  display: flex;
  flex-direction: column;

  & > .item {
    margin-bottom: 16px;
    text-align: center;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: ${Grey};
  }

  & .text {
    text-align: center;
    margin-top: 4px;
    font-size: 14px;
    color: ${Grey};
  }
`;

const LikeCount = styled.div`
  color: ${(props) => props.color ?? `#969696`} !important;
`;

const SocialSide = ({ article }: { article: any }) => {
  const [{ isLike, upCount }, dispatch] = useReducer(likeReducer, {
    upCount: article.likes.length,
    isLike: article.isLike,
  });

  useEffect(() => {
    dispatch({
      type: likeAction.reset,
      payload: {
        upCount: article.likes.length,
        isLike: article.isLike,
      },
    });
  }, [article.likes.length, article.isLike]);

  const handleArticleLiked = useDebounce(
    async () => {
      try {
        const res = await fetch(`/api/article/like`, {
          method: "post",
          body: JSON.stringify({
            isLike: !isLike,
            articleId: article._id,
            authorId: article.author[0]._id,
          }),
        });
        const data = await res.json();
        const action = data.result.isLike ? likeAction.like : likeAction.unlike;
        dispatch({ type: action });
      } catch (err) {
        console.error("点赞失败");
      }
    },
    100,
    [isLike]
  );

  return (
    <SocialContainer>
      <div className="item">
        <Icon onClick={handleArticleLiked}>
          <IThumbsup
            color={isLike ? `#ec7259` : `rgba(150,150,150)`}
            operable="true"
          />
        </Icon>
        <LikeCount className="text" color={isLike ? `#ec7259` : `#969696`}>
          {upCount}赞
        </LikeCount>
      </div>
      <div className="item">
        <Icon>赏</Icon>
        <span>赞赏</span>
      </div>
      <div className="item">
        <QRCodes />
      </div>
    </SocialContainer>
  );
};

export const MemorizedSocialSide = memo(SocialSide);
