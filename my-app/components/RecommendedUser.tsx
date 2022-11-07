import { memo, useState } from "react";
import styled from "styled-components";
import { formatNumber } from "../utils/readdableNumber";
import { Author } from "./Author";
import { FollowButtonBox, FollowTextButtonComponent } from "./FollowButton";
import { GreyRefresh } from "./icon/Refresh";
import { InfoContainer, ProfileContainer } from "./styles/Profile";

export const WriterTitle = styled.div`
  text-align: left;
  font-size: 14px;
  color: #969696;

  &.operate {
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      color: #787878;
    }
  }
`;
export const RecommendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const WriterItem = styled.div`
  margin-top: 15px;
  overflow: hidden;
  .pic {
    float: left;
    width: 48px;
    height: 48px;
    margin-right: 10px;
    display: block;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .nickname {
    padding: 5px;
    margin-right: 60px;
    font-size: 14px;
  }
  .total {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
  }
  .follow {
    float: right;
    margin-top: 5px;
    padding: 0;
    font-size: 13px;
    color: #42c02e;
  }
`;

const RecommendedUser = ({ recommendedUsers }: { recommendedUsers: any }) => {
  console.log("recommendedUser", recommendedUsers);
  const [users, setUsers] = useState(recommendedUsers);

  const changeUsers = async () => {
    const res = await fetch(`/api/user/list`, {
      method: "get",
    });
    const data = await res.json();
    setUsers(data.result.users);
  };

  if (recommendedUsers.length) {
    return (
      <div>
        <RecommendHeader>
          <WriterTitle>推荐作者</WriterTitle>
          <WriterTitle onClick={changeUsers} className="operate">
            <GreyRefresh width={24} />
            换一批
          </WriterTitle>
        </RecommendHeader>
        {users.map((user: any) => {
          const wordCount = user.articles.reduce(
            (result: number, article: any) => result + article.word_count,
            0
          );
          return (
            <ProfileContainer key={user._id} marginTop="15px">
              <div className="authorImage">
                <Author author={user} width={45} height={45} />
              </div>
              <InfoContainer fontSize="12px">
                <div className="authorSection">
                  <span className="authorName">{user.name || user.email}</span>
                  <FollowButtonBox author={user}>
                    <FollowTextButtonComponent author={user} />
                  </FollowButtonBox>
                </div>
                <div className="info">
                  {`写了${formatNumber(wordCount)}字 · ${formatNumber(
                    user.liked.length
                  )} 喜欢`}
                </div>
              </InfoContainer>
            </ProfileContainer>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};
export const MemoriedRecommendUser = memo(RecommendedUser);
