import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import styled from "styled-components";
import { Header } from "../components/Header";
import { MemoriedPosts } from "../components/Posts";
import { MemoriedRecommendUser } from "../components/RecommendedUser";
import { MediaSetting } from "../components/styles/MediaSetting";
import { getArticles, listRecommendUsers } from "../lib/fetchDataFromDB";
import dbConnect from "../utils/connectDB";
export const CenterWrapper = styled.div`
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  color: #404040;
`;

const HomeWrapper = styled(CenterWrapper)`
  display: flex;
  justify-content: center;
  margin-top: 65px;

  ${MediaSetting}
`;

const HomeLeft = styled.div`
  flex: 2;
`;

const HomeRight = styled.div`
  flex: 1;
  margin-left: 4%;
`;

interface HomeProps {
  articles: {
    data: any[];
    count: number;
  };
  recommendedUsers: any[];
}

// FIXME: need to locate in why Home page render 4 times
const Home: NextPage<HomeProps> = (props) => {
  console.log("home", props);
  return (
    <div>
      <Head>
        <title>简书 - 创作你的创作</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <HomeWrapper>
          <HomeLeft>
            <MemoriedPosts {...props} />
          </HomeLeft>
          <HomeRight>
            <MemoriedRecommendUser {...props} />
          </HomeRight>
        </HomeWrapper>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("index", session);

  await dbConnect();
  const articles = await getArticles();
  const recommendedUsers = await listRecommendUsers(session);

  return {
    props: {
      session,
      articles,
      recommendedUsers,
    },
  };
};
