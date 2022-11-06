import { NextPage, GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

const Setting: NextPage = () => {
  const { data: session } = useSession();
  const { value, bind, reset } = useInput(session?.user?.name);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const promise = await fetch(`/api/user/update`, {
      method: "post",
      body: JSON.stringify({ name: value }),
    });
    const data = await promise.json();
    if (data) {
      Router.push("/");
    } else {
    }
  };

  return (
    <div>
      <div>
        <div>{`Hi - ${session?.user?.email}，欢迎来到简书`}</div>
        {value ? <Link href="/">前往首页浏览</Link> : null}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Name: 请设置你的简书账户姓名
          <input type="text" {...bind} placeholder="请输入你的账户姓名" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Setting;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return { props: { session } };
};
