import { createContext, Dispatch, SetStateAction, useState } from "react";

interface Props {
  children: React.ReactNode;
  article: any;
}

export interface IContext {
  author: any;
  isFollowedContext: [boolean, Dispatch<SetStateAction<boolean>>];
  showTitleContext: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const DetailContext = createContext<IContext>({} as any);

export const DetailContextProvider = ({ children, article }: Props) => {
  const isFollowedState = useState<boolean>(article.author[0].isFollowed);
  const showTitleState = useState(false);
  return (
    <DetailContext.Provider
      value={{
        author: article.author[0],
        isFollowedContext: isFollowedState,
        showTitleContext: showTitleState,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
