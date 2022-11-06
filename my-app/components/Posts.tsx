import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { PostPlaceholder } from "./PostPlaceholder";
import { GreyHeart } from "./icon/Heart";
import { readableNumber } from "../utils/readdableNumber";

export const ListItem = styled.div`
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #dcdcdc;
  .pic {
    width: 125px;
    height: 100px;
    display: block;
    float: right;
    border-radius: 10px;
  }
`;

export const ListInfo = styled.div`
  float: left;
  .title {
    line-height: 27px;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin: -7px 0 4px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .desc {
    line-height: 24px;
    font-size: 13px;
    color: #999;
    margin: 0 0 8px;
  }
  .meta {
    padding-right: 0 !important;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
      color: #b4b4b4;
    }
    .likeCount {
      padding-left: 3px;
    }
  }
`;

const LoadMoreButton = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  margin: 30px 0;
  background: #a5a5a5;
  color: #fff;
  cursor: pointer;
`;

const LoadMore = ({ fetchList }) => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      if (page > 1) {
        await fetchList(page);
        setIsLoading(false);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (!isLoading) {
    return (
      <LoadMoreButton
        onClick={() => {
          setIsLoading(true);
          setPage((page) => page + 1);
        }}
      >
        阅读更多
      </LoadMoreButton>
    );
  } else {
    return <PostPlaceholder />;
  }
};

const Posts = ({ articles }) => {
  const [posts, setPosts] = useState(articles.data);

  useEffect(() => {
    setPosts(articles.data);
  }, [articles.data]);

  const fetchList = useCallback(async (page: number) => {
    const res = await fetch(`/api/article/list?page=${page}&pageSize=10`, {
      method: "get",
    });
    const data = await res.json();
    setPosts((posts) => [...posts, ...data.result.article]);
  }, []);

  return (
    <section>
      {posts.map((post) => (
        <ListItem key={post._id}>
          <ListInfo>
            <Link href={`/${post._id}`}>
              <div className="title">{post.title}</div>
            </Link>
            <p className="desc">{post.summary}</p>
            <div className="meta">
              <span>{post.author[0].name}</span>
              <GreyHeart size={12} title="article's likes count" />
              {post.likes.length ? (
                <span className="likeCount">
                  {readableNumber(post.likes.length)}
                </span>
              ) : null}
            </div>
          </ListInfo>
        </ListItem>
      ))}
      {posts.length === articles.count ? (
        "到底了"
      ) : (
        <>
          <LoadMore fetchList={fetchList} />
        </>
      )}
    </section>
  );
};

export const MemoriedPosts = memo(Posts);
