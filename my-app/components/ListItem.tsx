import Link from "next/link";
import styled from "styled-components";

const Item = styled.div`
  margin-top: 16px;
`;

export const List = ({ list, children }: any) => {
  return (
    <>
      {list.map((item: any) => (
        <Item key={item._id}>
          <Link href={`/${item._id}`} target="__blank">
            <div className="title">{item.title}</div>
          </Link>
          {children}
        </Item>
      ))}
    </>
  );
};
