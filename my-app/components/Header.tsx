import Link from "next/link";
import styled from "styled-components";
import { Login } from "./Login";
import { NavItem } from "./styles/Nav";
import ILogo from "../public/logo.svg";
import { CSSTransition } from "react-transition-group";
import { useContext } from "react";
import { DetailContext } from "../context/DetailContext";
import { MediaSetting } from "./styles/MediaSetting";
import { Author } from "./Author";
import { FollowButtonBox, FollowButtonComponent } from "./FollowButton";
import { Grey } from "../styles/variableCss";

interface HeaderProps {
  position: string;
  fromY: string;
  toY: string;
}

export const HeaderWrapper = styled.div<Partial<HeaderProps>>`
  height: 56px;
  position: relative;
  display: flex;
  background: #fff;
  width: 100%;
  padding: 0 28.5px;
  height: 56px;
  width: 100%;

  transition: 0.3s transform cubic-bezier(0.645, 0.045, 0.355, 1);

  &.flip {
    &-enter-active {
      transform: translateY(${(props) => props.fromY ?? "-100"}%);
    }

    &-enter-done,
    &-exit {
      transform: translateY(${(props) => props.fromY ?? "-100"}%);
    }

    &-enter,
    &-exit-done {
      transform: translateY(${(props) => props.toY ?? "0"}%);
    }

    &-exit-active {
      transform: translateY(${(props) => props.toY ?? "0"}%);
    }
  }

  & > .articleContainer {
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ${MediaSetting}

    h1 {
      margin-top: 0;
      margin-bottom: 0;
      flex: 1;
    }

    .authorName {
      color: ${Grey};
      font-size: 14px;
      margin: 0 10px;
    }
  }
`;

export const Nav = styled.div`
  padding-right: 70px;
  box-sizing: border-box;
  height: 100%;
  margin: 0 auto;
  flex: 6;
`;

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Logo = styled(ILogo)`
  fill: #ec7259;
  cursor: pointer;
  margin: 0 30px;
  &:hover {
    fill: #f08d79;
  }
`;

const HeaderContainer = styled.div`
  height: 56px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgb(0 0 0 / 5%);
  border-bottom: 1px solid #f0f0f0;
  top: 0;
  position: fixed;
  width: 100%;
`;

export function SubHeader() {
  return (
    <HeaderWrapper fromY="0" toY="-100">
      <ImageWrapper>
        <Link href={"/"}>
          <Logo />
        </Link>
      </ImageWrapper>
      <Nav>
        <NavItem className="left active">首页</NavItem>
        <NavItem className="left">下载APP</NavItem>
        <Login />
      </Nav>
    </HeaderWrapper>
  );
}

export function Header() {
  return (
    <HeaderContainer>
      <SubHeader />
    </HeaderContainer>
  );
}

interface TransitionHeaderProps {
  title: string;
  author: any;
}

export function TransitionHeader({ title, author }: TransitionHeaderProps) {
  const { showTitleContext } = useContext(DetailContext);
  const [showTitle] = showTitleContext;

  return (
    <HeaderContainer>
      <CSSTransition key="header" in={!showTitle} classNames="flip" timeout={0}>
        <SubHeader />
      </CSSTransition>
      <CSSTransition
        key="articleInfo"
        in={showTitle}
        classNames="flip"
        timeout={0}
      >
        <HeaderWrapper>
          <div className="articleContainer">
            <h1 title={title}>{title}</h1>
            <Author author={author} width={40} height={40} />
            <span className="authorName">{author.name}</span>
            <FollowButtonBox author={author}>
              <FollowButtonComponent padding="4px 12px" fontSize="14px" />
            </FollowButtonBox>
          </div>
        </HeaderWrapper>
      </CSSTransition>
    </HeaderContainer>
  );
}
