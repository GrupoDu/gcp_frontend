export const getSlug = () => {
  if (document !== undefined) {
    return document.location.pathname.split("/");
  }

  return "";
};
