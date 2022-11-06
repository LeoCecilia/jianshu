import { signIn, signOut, useSession } from "next-auth/react";
import { NavItem } from "./styles/Nav";

export const Login = () => {
  const { data: session } = useSession();
  let signInOps = {
    handler: session
      ? () => signOut()
      : () => signIn("email", { callbackUrl: "/user/setting" }),
    text: session ? "Sign out" : "Sign in",
  };

  return (
    <NavItem className="right" onClick={signInOps.handler}>
      {session ? <span>{session.user?.email}</span> : null}
      {signInOps.text}
    </NavItem>
  );
};
