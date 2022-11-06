import Link from "next/link";
import styled from "styled-components";

const Item = styled.div`
  margin-top: 16px;
`;

export const List = ({ list, children }) => {
  return (
    <>
      {list.map((item) => (
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
