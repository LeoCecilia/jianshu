import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DetailContext, IContext } from "../context/DetailContext";
import { useDebounce } from "../hooks/useDebounce";
import { Grey } from "../styles/variableCss";
import { GreyClose } from "./icon/Close";
import { GreenPlus } from "./icon/Plus";
import { GreyTick } from "./icon/Tick";

type FollowButtonProps = {
  isFollowed: boolean;
  padding?: string;
  fontSize?: string;
};

const FollowButton = styled.button<FollowButtonProps>`
  border: 1px solid #ec7259;
  color: #ec7259;
  padding: ${(props) => props.padding ?? "2px 9px"};
  border-radius: 50px;
  background: ${(props) => (props.isFollowed ? "#ffebeb" : "inherit")};
  cursor: pointer;
  margin-left: 8px;
  font-size: ${(props) => props.fontSize ?? "12px"};

  &:hover {
    background: ${(props) => (props.isFollowed ? "#ffebeb" : "#fef8f7")};
  }
`;

const FollowTextButton = styled.span<FollowButtonProps>`
  color: ${(props) => (props.isFollowed ? Grey : "#42c02e")};
  font-size: 13px;
  cursor: pointer;
  display: flex;
`;

const buttonTextKey = {
  followed: "followed",
  follow: "follow",
  cancelFollowed: "cancelFollowed",
} as const;

type TextType = typeof buttonTextKey[keyof typeof buttonTextKey];

const buttonText: Record<TextType, string> = {
  followed: "已关注",
  follow: "关注",
  cancelFollowed: "取消关注",
} as const;

export const useFollowUser = ({
  author,
  isFollowedContext: [isFollowed, setIsFollowed],
}: Omit<IContext, "showTitleContext">) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const [followTextKey, setFollowTextKey] = useState<TextType>(
    isFollowed ? buttonTextKey.followed : buttonTextKey.follow
  );

  useEffect(() => {
    setIsFollowed(author.isFollowed);
  }, [author.isFollowed, setIsFollowed]);

  useEffect(() => {
    const key = isMouseEnter
      ? buttonTextKey.cancelFollowed
      : buttonTextKey.followed;
    setFollowTextKey(isFollowed ? key : buttonTextKey.follow);
  }, [isFollowed, isMouseEnter]);

  const handleFollowButtonClick = useDebounce(
    async () => {
      const data = await fetch(`/api/user/follow`, {
        method: "POST",
        body: JSON.stringify({
          userId: author._id,
          isFollow: !isFollowed,
        }),
      });
      const { result } = await data.json();
      console.log("handleFollowButtonClick", result);
      if (result.isFollow !== undefined) {
        setIsFollowed(result.isFollow);
      }
    },
    100,
    [isFollowed, author._id, setIsFollowed]
  );

  return {
    isFollowed,
    followTextKey,
    onMouseEnter: () => {
      setIsMouseEnter(true);
    },
    onMouseLeave: () => {
      setIsMouseEnter(false);
    },
    onClick: handleFollowButtonClick,
  };
};

export const FollowButtonComponent = (
  props: Omit<FollowButtonProps, "isFollowed">
) => {
  const context = useContext(DetailContext);
  const { followTextKey, ...rest } = useFollowUser(context);

  return (
    <FollowButton {...props} {...rest}>
      {buttonText[followTextKey]}
    </FollowButton>
  );
};

export const FollowTextButtonComponent = ({
  author,
}: Pick<IContext, "author">) => {
  const { followTextKey, ...props } = useFollowUser({
    author,
    isFollowedContext: useState(false),
  });

  const elementProps = {
    width: 15,
  };

  const prefixElement = {
    follow: <GreenPlus {...elementProps} />,
    followed: <GreyTick {...elementProps} />,
    cancelFollowed: <GreyClose {...elementProps} />,
  };

  return (
    <FollowTextButton {...props}>
      {prefixElement[followTextKey]}
      {buttonText[followTextKey]}
    </FollowTextButton>
  );
};

interface Props {
  children: React.ReactNode;
  author: any;
}

export const FollowButtonBox = ({ author, children }: Props) => {
  const { data: session } = useSession();
  const isSameUser = session?.user?.id === author._id;
  return <>{isSameUser ? null : children}</>;
};
