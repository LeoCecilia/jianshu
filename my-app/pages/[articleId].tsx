import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import DOMPurify from "isomorphic-dompurify";
import Head from "next/head";
import styled from "styled-components";
import { TransitionHeader } from "../components/Header";
import { Articles, Fans, Likes } from "../models";
import dbConnect from "../utils/connectDB";
import { CenterWrapper } from ".";
import { useViews } from "../hooks/useViews";
import { readableNumber } from "../utils/readdableNumber";
import { articleQuery } from "../lib/fetchDataFromDB";
import { Types } from "mongoose";
import { MemorizedSocialSide } from "../components/SocialSide";
import { formatDate } from "../utils/formatDate";
import { Grey } from "../styles/variableCss";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  FollowButtonBox,
  FollowButtonComponent,
} from "../components/FollowButton";
import { DetailContext, DetailContextProvider } from "../context/DetailContext";
import { InfoContainer, ProfileContainer } from "../components/styles/Profile";
import { Author } from "../components/Author";
import Link from "next/link";

const Wrapper = styled(CenterWrapper)`
  width: 1000px;
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 65px;

  box-sizing: content-box;

  & > div {
    border-radius: 4px;
  }
`;

const DetailWrapper = styled.div`
  flex: 3;
  margin-right: 10px;
  background: #fff;
  padding-left: 32px;
  padding-right: 32px;
`;

const Sidebar = styled.aside`
  flex: 1.2;
  section {
    background: #fff;
    padding: 16px;
    margin-bottom: 10px;
  }
  .recommended {
    position: sticky;
    top: 61px;
  }
  h3 {
    font-size: 16px;
    padding-left: 6px;
    border-left: 4px solid #ec7259;
    margin: 0 0 16px 0;
    line-height: 18px;
  }
`;

const ListItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  & .readCount {
    color: ${Grey};
    font-size: 12px;
  }

  & > a {
    text-decoration: none;
    margin-bottom: 4px;
    display: block;
    color: #404040;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 16px 0;
  background-color: #eee;
`;

const Profile = ({ author, article }) => {
  return (
    <ProfileContainer>
      <div>
        <Author author={author} width={50} height={50} />
      </div>
      <InfoContainer>
        <div className="name">
          <span className="authorName">{author.name || author.email}</span>
          <FollowButtonBox author={author}>
            <FollowButtonComponent />
          </FollowButtonBox>
        </div>
        <div className="info">
          <time>{formatDate(article.created)}</time>
          <span>{`字数 ${article.word_count}`}</span>
          <span>{`阅读 ${readableNumber(article.view_count)}`}</span>
        </div>
      </InfoContainer>
    </ProfileContainer>
  );
};

const List = ({ list }) => {
  return list.map((item) => (
    <ListItem key={item._id}>
      <Link href={`/${item._id}`} className="title">
        {item.title}
      </Link>
      <div className="readCount">{`阅读 ${readableNumber(
        item.view_count
      )}`}</div>
    </ListItem>
  ));
};

const Title = ({ title }: { title: string }) => {
  const titleRef = useRef(null);
  const { showTitleContext } = useContext(DetailContext);
  const [, setShowTitle] = showTitleContext;

  const checkIfIntersecting: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      console.log("checkIfIntersecting isIntersecting", entry.isIntersecting);
      setShowTitle(!entry.isIntersecting);
    },
    [setShowTitle]
  );

  useEffect(() => {
    let refValue: MutableRefObject<HTMLHeadingElement | null>["current"] = null;

    const observer = new IntersectionObserver(checkIfIntersecting, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (titleRef.current) {
      observer.observe(titleRef.current);
      refValue = titleRef.current;
    }

    return () => {
      if (refValue) observer.unobserve(refValue);
    };
  }, [titleRef, checkIfIntersecting]);

  return <h1 ref={titleRef}>{title}</h1>;
};

const Detail: NextPage = ({ article, userOwnArticles, hotArticles }) => {
  useViews(article._id);

  return (
    <DetailContextProvider article={article}>
      <div>
        <Head>
          <title>{`简书 - ${article.title}`}</title>
          <meta name="description" content={article.summary} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <TransitionHeader title={article.title} author={article.author[0]} />
          <Wrapper>
            <MemorizedSocialSide article={article} />
            <DetailWrapper>
              <Title title={article.title} />
              <Profile article={article} author={article.author[0]} />
              <article
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.content),
                }}
              ></article>
            </DetailWrapper>
            <Sidebar>
              <section>
                <ProfileContainer>
                  <div className="authorImage">
                    <Author author={article.author[0]} width={45} height={45} />
                  </div>
                  <InfoContainer fontSize="14px">
                    <div className="author">
                      <span className="name">
                        {article.author[0].name || article.author[0].email}
                      </span>
                      <FollowButtonBox author={article.author[0]}>
                        <FollowButtonComponent />
                      </FollowButtonBox>
                    </div>
                    <div className="info">
                      <span>{`总资产 xxx`}</span>
                    </div>
                  </InfoContainer>
                </ProfileContainer>
                {userOwnArticles.length ? (
                  <>
                    <Line />
                    <List list={userOwnArticles} />
                  </>
                ) : null}
              </section>
              <section className="recommended">
                <h3>推荐阅读</h3>
                <List list={hotArticles} />
              </section>
            </Sidebar>
          </Wrapper>
        </main>
      </div>
    </DetailContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const {
    query: { articleId },
    res,
  } = context;
  let article;
  let userOwnArticles = [];
  let hotArticles;
  let isSameUser = false;

  try {
    await dbConnect();
    const articleObjectId = new Types.ObjectId(articleId as string);
    article = await Articles.aggregate([
      { $match: { _id: articleObjectId } },
      ...articleQuery,
    ]);

    if (session) {
      const isLike = await Likes.findOne({
        article: articleId,
        user: session?.user?.id,
      });
      article[0].isLike = !!isLike;
      const authorId = JSON.parse(JSON.stringify(article[0].author[0]._id));
      isSameUser = session?.user?.id === authorId;
    }

    if (!isSameUser) {
      userOwnArticles = await Articles.find({
        author: article[0].author[0]._id,
        _id: { $ne: new Types.ObjectId(article[0]._id) },
      }).limit(3);

      const isFollowed = await Fans.findOne({
        user: session?.user?.id,
        follows: article[0].author[0]._id,
      });

      article[0].author[0].isFollowed = !!isFollowed;
    }

    hotArticles = await Articles.aggregate([
      { $match: { _id: { $ne: new Types.ObjectId(article[0]._id) } } },
      { $sample: { size: 5 } },
    ]);
  } catch (err) {
    console.error("can not find articles");
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {
      session,
      userOwnArticles: JSON.parse(JSON.stringify(userOwnArticles)),
      article: JSON.parse(JSON.stringify(article[0])),
      hotArticles: JSON.parse(JSON.stringify(hotArticles)),
    },
  };
};

export default Detail;
