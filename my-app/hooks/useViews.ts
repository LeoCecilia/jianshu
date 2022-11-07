import { useEffect } from "react";

export const useViews = (articleId: string) => {
  useEffect(() => {
    fetch(`/api/article/${articleId}/view`, {
      method: "POST",
    });
  }, [articleId]);
};
