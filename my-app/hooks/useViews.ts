import { useEffect } from "react";

export const useViews = (articleId) => {
  useEffect(() => {
    fetch(`/api/article/${articleId}/view`, {
      method: "POST",
    });
  }, [articleId]);
};
